import { useEffect, useState } from "react";
import { Ad } from "../../models/Ad";
import { Administrator } from "../../models/Administrator";
import { getAll } from "../../services/AdministratorService";
import { create, update } from "../../services/AdService";
import AlertSuccess from "../atoms/AlertSuccess";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import AlertWarning from "../atoms/AlertWarning";

interface AdFormProps {
    onClose: () => void;
    onRefresh: () => void;
    adToEdit?: Ad;
}

const AdForm = ({ onClose, onRefresh, adToEdit }: AdFormProps) => {

    const [form, setForm] = useState<Partial<Ad>>(adToEdit || {});
    const [administrator, setAdministrator] = useState<Administrator[]>([]);
    const [errors, setErrors] = useState<Partial<Record<keyof Ad, string>>>({});
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    const fechaMinima = `${anio}-${mes}-${dia}`;

    useEffect(() => {
        getAll().then(setAdministrator);
    }, []);

    useEffect(() => {
        if (adToEdit) {
            if (adToEdit?.image) {
                setImagePreview(
                    adToEdit.image.startsWith("http")
                        ? adToEdit.image
                        : `http://localhost:8080/${adToEdit.image}`
                );
            }
        } else {
            setForm({});
            setImage(null);
            setImagePreview("");
        }
    }, [adToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: name === "idUser" ? Number(value) : value
        });
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof Ad, string>> = {};

        if (!form.title || form.title.length > 50) {
            newErrors.title = "El título puede tener un máximo de 50 caracteres.";
        }

        if (!form.category) {
            newErrors.category = "Seleccione una categoría.";
        }

        if (!form.idUser) {
            newErrors.idUser = "Debe seleccionar un usuario.";
        }

        if (!adToEdit && !image) {
            newErrors.image = "Seleccione una imagen obligatoriamente.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const formData = new FormData();

            formData.append("title", form.title || "");
            formData.append("category", form.category || "");
            formData.append("isActive", "true");
            formData.append("idUser", form.idUser !== undefined && form.idUser !== null ? String(form.idUser) : "");

            if (form.expirationDate && String(form.expirationDate).trim() !== "") {
                formData.append("expirationDate", String(form.expirationDate));
            }

            if (image) {
                formData.append("image", image);
            }

            if (adToEdit?.idAd) {
                formData.append("idAd", String(adToEdit.idAd));
                formData.append("publicationStatus", String(form.publicationStatus ?? true));
                await update(adToEdit.idAd, formData);
                AlertSuccess("Anuncio actualizado correctamente.");
            } else {
                await create(formData);
                AlertSuccess("Anuncio creado correctamente.");
            }

            onRefresh();
            onClose();

        } catch (error) {
            console.error("Error al guardar:", error);
            AlertWarning("Error al guardar el anuncio.");
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                <h3>{adToEdit ? "Editar Anuncio" : "Nuevo Anuncio"}</h3>

                <div className="mb-2">
                    <FormField
                        label="Título"
                        name="title"
                        value={form.title || ""}
                        onChange={handleChange}
                    />
                    {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                </div>

                <div className="mb-2">
                    <label className="form-label">Fecha de expiración (Opcional)</label>
                    <input
                        type="date"
                        className={`form-control ${errors.expirationDate ? "is-invalid" : ""}`}
                        name="expirationDate"
                        value={form.expirationDate || ""}
                        onChange={handleChange}
                        min={fechaMinima}

                    />
                    {errors.expirationDate && <div className="invalid-feedback d-block">{errors.expirationDate}</div>}
                </div>

                <div className="mb-2">
                    <label>Categoría del anuncio</label>
                    <select
                        className={`form-select ${errors.category ? "is-invalid" : ""}`}
                        name="category"
                        value={form.category ?? ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione la categoría</option>
                        <option value="Carrusel-Anuncios">Carrusel Anuncios</option>
                        <option value="Marcas">Carrusel Marcas</option>
                    </select>
                    {errors.category && <div className="invalid-feedback d-block">{errors.category}</div>}
                </div>

                {adToEdit && (
                    <div className="mb-2">
                        <label>¿Anuncio Publicado?</label>
                        <select className="form-select" name="publicationStatus"
                            value={form.publicationStatus ? "true" : "false"}
                            onChange={(e) => setForm({ ...form, publicationStatus: e.target.value === "true" })}>
                            <option value="true">Sí</option>
                            <option value="false">No</option>
                        </select>
                        {errors.publicationStatus && <div className="invalid-feedback">{errors.publicationStatus}</div>}
                    </div>
                )}

                <div className="mb-2">
                    <label>Usuario Encargado del registro</label>
                    <select
                        className={`form-select ${errors.idUser ? "is-invalid" : ""}`}
                        name="idUser"
                        value={form.idUser ?? ""}
                        onChange={handleChange}
                    >
                        <option value="">Seleccione un encargado</option>
                        {administrator.map((s) => (
                            <option key={s.idUser} value={s.idUser}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                    {errors.idUser && <div className="invalid-feedback d-block">{errors.idUser}</div>}
                </div>

                <div className="mb-2">
                    <label>Imagen</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImage} />
                    {errors.image && <div className="text-danger mt-1">{errors.image}</div>}

                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="mt-2 rounded"
                            style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
                        />
                    )}
                </div>

                <div className="mt-3">
                    <Button
                        label="Guardar"
                        onClick={handleSubmit}
                        backgroundColor="#198754"
                        hoverColor="#145c32"
                        color="#fff"
                        className="btn btn-success me-2"
                    />
                    <Button
                        label="Cancelar"
                        onClick={onClose}
                        backgroundColor="#6c757d"
                        hoverColor="#495057"
                        color="#fff"
                        className="btn btn-secondary"
                    />
                </div>
            </div>
        </div>
    );
};

export default AdForm;