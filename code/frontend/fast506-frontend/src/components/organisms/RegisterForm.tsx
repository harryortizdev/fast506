import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Client } from "../../models/Client";
import WhatsAppButton from "../atoms/WhatsAppButton";
import AlertWarning from "../atoms/AlertWarning";
import AlertSuccess from "../atoms/AlertSuccess";
import { create } from "../../services/ClientService";
import FormField from "../molecules/FormField";
import Button from "../atoms/Button";
import * as RoleService from "../../services/RoleService";


type RegisterForm = Partial<Client> & { confirmPassword?: string };

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<RegisterForm>({ isActive: true });
  const [errors, setErrors] = useState<
    Partial<Record<keyof Client | "confirmPassword", string>>
  >({});
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [clientRoleId, setClientRoleId] = useState<number | null>(null);

  useEffect(() => {
    RoleService.getAll()
      .then((roles) => {
        const clientRole = roles.find(
          (r: { name: string }) => r.name?.toLowerCase() === "cliente"
        );
        if (clientRole) setClientRoleId(clientRole.idRole);
      })
      .catch(() => {});
  }, []);

  const commInterestOptions = [
    "Sedán",
    "SUV",
    "Camioneta",
    "Deportivo",
    "Híbrido",
    "Eléctrico",
    "Convertible",
    "Todoterreno",
  ];

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const parsedValue =
      name === "dateBirth"
        ? new Date(value)
        : name === "id"
          ? value === ""
            ? ""
            : Number(value)
          : value;
    setForm({ ...form, [name]: parsedValue });
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Client | "confirmPassword", string>> =
      {};
    const lettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericOnly = /^[0-9]+$/;
    const today = new Date();

    if (!form.name || !lettersOnly.test(form.name) || form.name.length > 50)
      newErrors.name =
        "Nombre inválido: solo letras y espacios, máximo 50 caracteres.";

    if (
      form.id === undefined ||
      form.id === null ||
      !numericOnly.test(form.id.toString()) ||
      form.id.toString().length !== 9
    )
      newErrors.id =
        "Cédula inválida: debe ser numérica y tener exactamente 9 dígitos.";

    if (!form.email || !emailRegex.test(form.email) || form.email.length > 100)
      newErrors.email =
        "Email inválido: ingrese un email válido, máximo 100 caracteres.";

    if (
      !form.password ||
      form.password.length < 8 ||
      form.password.length > 100 ||
      !/[A-Z]/.test(form.password) ||
      !/[a-z]/.test(form.password) ||
      !/[0-9]/.test(form.password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(form.password)
    )
      newErrors.password =
        "Contraseña inválida: debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.";

    if (form.confirmPassword !== form.password)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    if (
      !form.phoneNumber ||
      !numericOnly.test(form.phoneNumber.toString()) ||
      form.phoneNumber.toString().length !== 8
    )
      newErrors.phoneNumber =
        "El número de teléfono debe ser numérico y tener exactamente 8 dígitos.";

    if (
      !form.dateBirth ||
      !(form.dateBirth instanceof Date) ||
      isNaN(form.dateBirth.valueOf()) ||
      form.dateBirth > today
    )
      newErrors.dateBirth = "Fecha de nacimiento inválida.";


    if (
      !form.commInterest ||
      !commInterestOptions.includes(form.commInterest.toString())
    )
      newErrors.commInterest = "Seleccione un interés válido.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name || "");
      formData.append("id", form.id?.toString() || "");
      formData.append("email", form.email || "");
      formData.append("password", form.password || "");
      formData.append("phoneNumber", form.phoneNumber?.toString() || "");
      formData.append(
        "dateBirth",
        form.dateBirth instanceof Date
          ? form.dateBirth.toISOString().split("T")[0]
          : ""
      );
      formData.append("isActive", "true");
      if (clientRoleId) formData.append("idRole", clientRoleId.toString());
      if (form.commInterest) formData.append("commInterest", form.commInterest);
      if (form.physicalAddress) formData.append("physicalAddress", form.physicalAddress);
      if (form.occupation) formData.append("occupation", form.occupation);
      if (image) formData.append("profileImage", image);

      await create(formData);
      AlertSuccess("Cuenta creada correctamente");
      navigate("/login");
    } catch (error) {
      const msg = error instanceof Error ? error.message : "";
      if (msg.includes("cédula ya está")) {
        AlertWarning("La cédula ingresada ya está registrada. Use una cédula diferente.");
      } else if (msg.includes("correo") && msg.includes("ya está")) {
        AlertWarning("El correo electrónico ya está en uso. Use un correo diferente.");
      } else {
        AlertWarning("Error al crear la cuenta. Verifique los datos e intente de nuevo.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#EEF1EF",
      }}
    >
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-header" style={{ backgroundColor: "#2C3E50" }}>
              <h5 className="mb-0 text-center" style={{ color: "#EEF1EF" }}>
                Crear Cuenta
              </h5>
            </div>

            <div
              className="card-body p-3 p-md-5"
              style={{ backgroundColor: "#EEF1EF" }}
            >
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      
                      <FormField
                        label="Nombre:"
                        name="name"
                        placeholder="Tu nombre completo"
                        value={form.name || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      
                      {errors.name && (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <FormField
                        label="Cédula:"
                        name="id"
                        placeholder="Número de cédula"
                        value={form.id?.toString() || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.id && (
                        <div className="invalid-feedback d-block">
                          {errors.id}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <FormField
                        label="Correo electrónico:"
                        name="email"
                        placeholder="tucorreo@ejemplo.com"
                        type="email"
                        value={form.email || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <FormField
                        label="Contraseña:"
                        name="password"
                        placeholder="Mínimo 8 caracteres"
                        type="password"
                        value={form.password || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.password && (
                        <div className="invalid-feedback d-block">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <FormField
                        label="Confirmar contraseña:"
                        name="confirmPassword"
                        placeholder="Repite tu contraseña"
                        type="password"
                        value={form.confirmPassword || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.confirmPassword && (
                        <div className="invalid-feedback d-block">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <FormField
                        label="Número de teléfono:"
                        name="phoneNumber"
                        placeholder="Número de teléfono"
                        type="tel"
                        value={form.phoneNumber || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.phoneNumber && (
                        <div className="invalid-feedback d-block">
                          {errors.phoneNumber}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="mb-2">
                      <label className="form-label fw-semibold" style={{ color: "#2C3E50" }}>
                        Fecha de nacimiento:
                      </label>
                      <DatePicker
                        wrapperClassName="w-100"
                        className={`form-control w-100 ${errors.dateBirth ? "is-invalid" : ""}`}
                        placeholderText="Seleccione una fecha"
                        dateFormat="dd/MM/yyyy"
                        selected={form.dateBirth instanceof Date && !isNaN(form.dateBirth.valueOf()) ? form.dateBirth : null}
                        onChange={(date: Date | null) => {
                          setForm({ ...form, dateBirth: date ?? undefined });
                          setErrors({ ...errors, dateBirth: "" });
                        }}
                        maxDate={new Date()}
                        disabled={isSubmitting}
                      />
                      {errors.dateBirth && (
                        <div className="invalid-feedback d-block">
                          {errors.dateBirth}
                        </div>
                      )}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" style={{ color: "#2C3E50" }}>
                        Foto de perfil:
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleImage}
                        disabled={isSubmitting}
                      />
                      {imagePreview && (
                        <img
                          src={imagePreview}
                          alt="preview"
                          className="mt-2 rounded"
                          style={{ width: "100%", maxHeight: "150px", objectFit: "cover" }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label
                      className="form-label fw-semibold"
                      style={{ color: "#2C3E50" }}
                    >
                      Interés de autos<span className="text-danger">*</span>
                    </label>
                    <select
                      name="commInterest"
                      className={`form-select ${errors.commInterest ? "is-invalid" : ""}`}
                      value={form.commInterest || ""}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    >
                      <option value="">Selecciona una opción</option>
                      {commInterestOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    {errors.commInterest && (
                      <div className="invalid-feedback">
                        {errors.commInterest}
                      </div>
                    )}
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <FormField
                        label="Dirección física:"
                        name="physicalAddress"
                        placeholder="Tu dirección"
                        value={form.physicalAddress || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="col-md-6">
                      <FormField
                        label="Ocupación:"
                        name="occupation"
                        placeholder="Tu ocupación"
                        value={form.occupation || ""}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="mt-2 mb-3">
                    <small style={{ color: "#5E6572" }}>
                      <span className="text-danger">*</span> Campos obligatorios
                    </small>
                  </div>

                  <Button
                    label={isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
                    onClick={handleSubmit}
                    backgroundColor="#2C3E50"
                    hoverColor="#1a252f"
                    color="#EEF1EF"
                    className="btn w-100 mb-3"
                    disabled={isSubmitting}
                  />

                  <div className="text-center">
                    <span style={{ color: "#2C3E50" }}>
                      ¿Ya tienes una cuenta?{" "}
                      <a
                        href="/login"
                        style={{
                          color: "#5E6572",
                          textDecoration: "underline",
                        }}
                      >
                        Inicia sesión aquí
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <WhatsAppButton />
      <Footer />
    </div>
  );
};

export default RegisterForm;
