import { useState, useEffect } from "react";
import { Catalog } from "../../models/Catalog";
import { UnitGroup } from "../../models/UnitGroup";
import { getAvailable, create, update } from "../../services/CatalogService";
import AlertSuccess from "../atoms/AlertSuccess";
import AlertWarning from "../atoms/AlertWarning";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import Image from "../atoms/Image";

interface CatalogFormProps {
    onClose: () => void;
    onRefresh: () => void;
    catalogToEdit?: Catalog | null;
}

const CatalogForm = ({ onClose, onRefresh, catalogToEdit }: CatalogFormProps) => {
    const [form, setForm] = useState<Partial<Catalog>>({});
    const [units, setUnits] = useState<UnitGroup[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<Partial<Record<keyof Catalog, string>>>({});
    const [imagePreview, setImagePreview] = useState<string>("");

    useEffect(() => {
        getAvailable().then(setUnits);

        if (catalogToEdit) {
            setForm(catalogToEdit);

            if (catalogToEdit?.image) {
                setImagePreview(
                    catalogToEdit.image.startsWith("http")
                        ? catalogToEdit.image
                        : `http://localhost:8080/${catalogToEdit.image}`
                );
            }
        } else {
            setForm({});
            setImage(null);
            setImagePreview("");
        }
    }, [catalogToEdit]);

    const handleUnitSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = e.target.value;

        if (index === "") {
            setForm({});
            return;
        }

        const u = units[parseInt(index)];

        setForm({
            brandName: u.carBrand,
            carName: u.carName,
            yearManufacture: u.yearManufacture,
            bodyWork: u.bodyWork,
            transmission: u.transmissionGroup,
            fuelType: u.fuelGroup,
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]:
                name === "basePrice"
                    ? Number(value)
                    : value,
        });
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof Catalog, string>> = {};

        if (!form.brandName) newErrors.brandName = "Marca requerida.";
        if (!form.carName) newErrors.carName = "Modelo requerido.";
        if (!form.yearManufacture) newErrors.yearManufacture = "Año requerido.";
        if (!form.bodyWork) newErrors.bodyWork = "Carrocería requerida.";
        if (!form.transmission) newErrors.transmission = "Transmisión requerida.";
        if (!form.fuelType) newErrors.fuelType = "Combustible requerido.";
        if (!form.engineSize) newErrors.engineSize = "Motor requerido.";
        if (!form.basePrice || form.basePrice <= 0)
            newErrors.basePrice = "Precio inválido.";
        if (!form.technicalDescription)
            newErrors.technicalDescription = "Descripción requerida.";
        if (!image && !catalogToEdit)
            newErrors.image = "Debe seleccionar una imagen.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validate()) return;

        try {
            const formData = new FormData();

            formData.append("brandName", form.brandName || "");
            formData.append("carName", form.carName || "");
            formData.append("yearManufacture", String(form.yearManufacture || ""));
            formData.append("bodyWork", form.bodyWork || "");
            formData.append("transmission", form.transmission || "");
            formData.append("fuelType", form.fuelType || "");
            formData.append("engineSize", form.engineSize || "");
            formData.append("basePrice", String(form.basePrice || 0));
            formData.append("technicalDescription", form.technicalDescription || "");
            formData.append("isActive", "true");

            if (image) {
                formData.append("image", image);
            }

            if (catalogToEdit?.idCatalog) {
                await update(catalogToEdit.idCatalog, formData);
                AlertSuccess("Catálogo actualizado correctamente.");
            } else {
                await create(formData);
                AlertSuccess("Catálogo creado correctamente.");
            }

            onRefresh();
            onClose();

        } catch (error) {
            AlertWarning("Error al guardar el catálogo.");
        }
    };

    return (
        <div className="container d-flex justify-content-center">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>

                <h3>{catalogToEdit ? "Editar Catálogo" : "Nuevo Catálogo"}</h3>

                <div className="mb-2">
                    <label>Unidad existente</label>
                    <select className="form-select" onChange={handleUnitSelect} defaultValue="">
                        <option value="">— elegir unidad —</option>
                        {units.map((u, i) => (
                            <option key={i} value={i}>
                                {u.carBrand} {u.carName} {u.yearManufacture}
                            </option>
                        ))}
                    </select>
                </div>

                <FormField label="Marca" name="brandName" value={form.brandName || ""} onChange={handleChange} disabled />
                {errors.brandName && <div className="text-danger">{errors.brandName}</div>}

                <FormField label="Modelo" name="carName" value={form.carName || ""} onChange={handleChange} disabled />
                {errors.carName && <div className="text-danger">{errors.carName}</div>}

                <FormField label="Año" name="yearManufacture" value={form.yearManufacture?.toString() || ""} onChange={handleChange} disabled />

                <FormField label="Carrocería" name="bodyWork" value={form.bodyWork || ""} onChange={handleChange} disabled />

                <FormField label="Transmisión" name="transmission" value={form.transmission || ""} onChange={handleChange} disabled />

                <FormField label="Combustible" name="fuelType" value={form.fuelType || ""} onChange={handleChange} disabled />

                <FormField label="Motor" name="engineSize" value={form.engineSize || ""} onChange={handleChange} />

                <FormField label="Precio base" name="basePrice" value={form.basePrice?.toString() || ""} onChange={handleChange} />

                <FormField
                    label="Descripción técnica"
                    name="technicalDescription"
                    value={form.technicalDescription || ""}
                    onChange={handleChange}
                />

                <div className="mb-2">
                    <label>Imagen</label>
                    <input type="file" className="form-control" accept="image/*" onChange={handleImage} />

                    {errors.image && <div className="text-danger">{errors.image}</div>}

                    {imagePreview && (
                        <Image
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

export default CatalogForm;