import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import FormField from "../components/molecules/FormField";
import Button from "../components/atoms/Button";
import AlertSuccess from "../components/atoms/AlertSuccess";
import AlertWarning from "../components/atoms/AlertWarning";
import { useAuth } from "../context/AuthContext";
import { getAll as getAllClients, updateClient } from "../services/ClientService";
import { getAll as getAllAdmins, updateAdministrator } from "../services/AdministratorService";
import { getAll as getAllMechanics, updateMechanic } from "../services/MechanicService";
import { Client } from "../models/Client";
import { Administrator } from "../models/Administrator";
import { Mechanic } from "../models/Mechanic";

type UserType = "client" | "admin" | "mechanic";

interface ProfileForm {
  name: string;
  email: string;
  phoneNumber: string;
  dateBirth: string;
  commInterest: string;
  physicalAddress: string;
  occupation: string;
  corporateEmail: string;
  specialty: string;
  certLevel: string;
}

const commInterestOptions = ["Sedán", "SUV", "Camioneta", "Deportivo", "Híbrido", "Eléctrico", "Convertible", "Todoterreno"];
const specialtyOptions = ["Motor", "Transmisión", "Electricidad", "Suspensión", "Frenos"];
const certLevelOptions = ["Básico", "Intermedio", "Avanzado", "Experto"];

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const [userType, setUserType] = useState<UserType | null>(null);
  const [rawData, setRawData] = useState<Client | Administrator | Mechanic | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileForm, string>>>({});

  const [form, setForm] = useState<ProfileForm>({
    name: "",
    email: "",
    phoneNumber: "",
    dateBirth: "",
    commInterest: "",
    physicalAddress: "",
    occupation: "",
    corporateEmail: "",
    specialty: "",
    certLevel: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    loadProfile();
  }, [user]);

  const loadProfile = async (): Promise<Client | Administrator | Mechanic | null> => {
    if (!user) return null;
    setLoading(true);
    try {
      const [admins, clients, mechanics] = await Promise.all([
        getAllAdmins(),
        getAllClients(),
        getAllMechanics(),
      ]);

      const admin = admins.find((a: Administrator) => a.idUser === user.userId);
      if (admin) {
        setUserType("admin");
        setRawData(admin);
        populateForm(admin, "admin");
        return admin;
      }

      const client = clients.find((c: Client) => c.idUser === user.userId);
      if (client) {
        setUserType("client");
        setRawData(client);
        populateForm(client, "client");
        return client;
      }

      const mechanic = mechanics.find((m: Mechanic) => m.idUser === user.userId);
      if (mechanic) {
        setUserType("mechanic");
        setRawData(mechanic);
        populateForm(mechanic, "mechanic");
        return mechanic;
      }

      AlertWarning("No se encontró el perfil de usuario.");
      return null;
    } catch {
      AlertWarning("Error al cargar el perfil.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const populateForm = (data: Client | Administrator | Mechanic, type: UserType) => {
    const dateStr = data.dateBirth
      ? new Date(data.dateBirth).toISOString().split("T")[0]
      : "";

    setForm({
      name: data.name || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      dateBirth: dateStr,
      commInterest: type === "client" ? (data as Client).commInterest || "" : "",
      physicalAddress: type === "client" ? (data as Client).physicalAddress || "" : "",
      occupation: type === "client" ? (data as Client).occupation || "" : "",
      corporateEmail:
        type === "admin"
          ? (data as Administrator).corporateEmail || ""
          : type === "mechanic"
          ? (data as Mechanic).corporateEmail || ""
          : "",
      specialty: type === "mechanic" ? (data as Mechanic).specialty || "" : "",
      certLevel: type === "mechanic" ? (data as Mechanic).certLevel || "" : "",
    });

    if (data.profileImage) {
      setImagePreview(
        data.profileImage.startsWith("http")
          ? data.profileImage
          : `http://localhost:8080/${data.profileImage}`
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ProfileForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileForm, string>> = {};
    const lettersOnly = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numericOnly = /^[0-9]{8}$/;
    const today = new Date();
    const birth = form.dateBirth ? new Date(form.dateBirth) : null;

    if (!form.name || !lettersOnly.test(form.name) || form.name.length > 50) {
      newErrors.name = "Nombre inválido: solo letras y espacios, máximo 50 caracteres.";
    }
    if (!form.email || !emailRegex.test(form.email) || form.email.length > 100) {
      newErrors.email = "Correo electrónico inválido.";
    }
    if (!form.phoneNumber || !numericOnly.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Teléfono inválido: debe tener exactamente 8 dígitos.";
    }
    if (!birth || isNaN(birth.valueOf()) || birth > today) {
      newErrors.dateBirth = "Fecha de nacimiento inválida.";
    }

    if (userType === "client") {
      if (!form.commInterest || !commInterestOptions.includes(form.commInterest)) {
        newErrors.commInterest = "Seleccione un interés de auto válido.";
      }
    }

    if (userType === "admin" || userType === "mechanic") {
      if (form.corporateEmail) {
        const corpEmailRegex = /^[^\s@]+@agenciafast\.cr$/;
        if (!corpEmailRegex.test(form.corporateEmail)) {
          newErrors.corporateEmail = "El correo corporativo debe terminar en @agenciafast.cr";
        }
      }
    }

    if (userType === "mechanic") {
      if (!form.specialty || !specialtyOptions.includes(form.specialty)) {
        newErrors.specialty = "Seleccione una especialidad válida.";
      }
      if (!form.certLevel || !certLevelOptions.includes(form.certLevel)) {
        newErrors.certLevel = "Seleccione un nivel de certificación válido.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildCommonFormData = (): FormData => {
    const fd = new FormData();
    if (!rawData) return fd;
    fd.append("idUser", (rawData as any).idUser.toString());
    fd.append("name", form.name);
    fd.append("id", (rawData as any).id.toString());
    fd.append("email", form.email);
    fd.append("password", (rawData as any).password || "");
    fd.append("phoneNumber", form.phoneNumber);
    fd.append("dateBirth", form.dateBirth);
    fd.append("isActive", (rawData as any).isActive ? "true" : "false");
    if ((rawData as any).role?.idRole) {
      fd.append("idRole", (rawData as any).role.idRole.toString());
    }
    if (image) fd.append("profileImage", image);
    return fd;
  };

  const handleSubmit = async () => {
    if (!validate() || !rawData || !userType) return;
    setSaving(true);
    try {
      const fd = buildCommonFormData();

      if (userType === "client") {
        fd.append("commInterest", form.commInterest);
        if (form.physicalAddress) fd.append("physicalAddress", form.physicalAddress);
        if (form.occupation) fd.append("occupation", form.occupation);
        await updateClient(fd);
      } else if (userType === "admin") {
        fd.append("employeeId", (rawData as Administrator).employeeId || "");
        if (form.corporateEmail) fd.append("corporateEmail", form.corporateEmail);
        await updateAdministrator(fd);
      } else if (userType === "mechanic") {
        fd.append("employeeId", (rawData as Mechanic).employeeId || "");
        if (form.corporateEmail) fd.append("corporateEmail", form.corporateEmail);
        if (form.specialty) fd.append("specialty", form.specialty);
        if (form.certLevel) fd.append("certLevel", form.certLevel);
        await updateMechanic(fd);
      }

      AlertSuccess("Perfil actualizado correctamente");
      const updated = await loadProfile();
      updateUser({
        name: form.name,
        email: form.email,
        profileImage: updated?.profileImage ?? null,
      });
    } catch {
      AlertWarning("Error al actualizar el perfil.");
    } finally {
      setSaving(false);
    }
  };

  const userTypeLabel: Record<UserType, string> = {
    admin: "Administrador",
    client: "Cliente",
    mechanic: "Mecánico",
  };

  const userTypeBadgeColor: Record<UserType, string> = {
    admin: "#dc3545",
    client: "#0d6efd",
    mechanic: "#198754",
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container py-5" style={{ maxWidth: "700px" }}>
        <h2 className="mb-4 fw-bold text-center">Mi Perfil</h2>

        {/* Cabecera de perfil */}
        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex flex-column flex-sm-row align-items-center gap-4 py-4">
            <div className="flex-shrink-0">
              <img
                src={
                  imagePreview ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Foto de perfil"
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #dee2e6",
                }}
              />
            </div>
            <div className="flex-grow-1 text-center text-sm-start">
              <h4 className="mb-1 fw-semibold">{form.name || user?.name}</h4>
              <p className="text-muted mb-2">{form.email || user?.email}</p>
              {userType && (
                <span
                  className="badge"
                  style={{ backgroundColor: userTypeBadgeColor[userType], fontSize: "0.85rem" }}
                >
                  {userTypeLabel[userType]}
                </span>
              )}
              {user?.roleName && (
                <span className="badge bg-secondary ms-2" style={{ fontSize: "0.85rem" }}>
                  {user.roleName}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="card shadow-sm">
          <div className="card-body p-4">

            {/* Campos de solo lectura */}
            <h6 className="text-muted text-uppercase mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
              Información no editable
            </h6>
            <div className="row g-3 mb-4">
              <div className="col-sm-6">
                <label className="form-label fw-semibold">Cédula</label>
                <input
                  type="text"
                  className="form-control bg-light"
                  value={(rawData as any)?.id || ""}
                  disabled
                />
              </div>
              {(userType === "admin" || userType === "mechanic") && (
                <div className="col-sm-6">
                  <label className="form-label fw-semibold">ID de Empleado</label>
                  <input
                    type="text"
                    className="form-control bg-light"
                    value={(rawData as Administrator | Mechanic)?.employeeId || ""}
                    disabled
                  />
                </div>
              )}
            </div>

            <hr className="mb-4" />

            {/* Campos editables comunes */}
            <h6 className="text-muted text-uppercase mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
              Datos personales
            </h6>

            <div className="mb-3">
              <FormField
                label="Nombre completo:"
                name="name"
                placeholder="Nombre completo"
                value={form.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback d-block">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <FormField
                label="Correo electrónico:"
                name="email"
                placeholder="tucorreo@ejemplo.com"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <FormField
                label="Número de teléfono:"
                name="phoneNumber"
                placeholder="8 dígitos"
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && <div className="invalid-feedback d-block">{errors.phoneNumber}</div>}
            </div>

            <div className="mb-3">
              <FormField
                label="Fecha de nacimiento:"
                name="dateBirth"
                placeholder=""
                type="date"
                value={form.dateBirth}
                onChange={handleChange}
              />
              {errors.dateBirth && <div className="invalid-feedback d-block">{errors.dateBirth}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Foto de perfil</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImage}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="mt-2 rounded"
                  style={{ width: "100%", maxHeight: "180px", objectFit: "cover" }}
                />
              )}
            </div>

            {/* Campos específicos de Cliente */}
            {userType === "client" && (
              <>
                <hr className="mb-4" />
                <h6 className="text-muted text-uppercase mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                  Preferencias
                </h6>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Interés en tipo de auto:</label>
                  <select
                    className={`form-control ${errors.commInterest ? "is-invalid" : ""}`}
                    name="commInterest"
                    value={form.commInterest}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un tipo</option>
                    {commInterestOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.commInterest && <div className="invalid-feedback">{errors.commInterest}</div>}
                </div>

                <div className="mb-3">
                  <FormField
                    label="Dirección física:"
                    name="physicalAddress"
                    placeholder="Dirección"
                    value={form.physicalAddress}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <FormField
                    label="Ocupación:"
                    name="occupation"
                    placeholder="Ocupación"
                    value={form.occupation}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {/* Campos específicos de Administrador */}
            {userType === "admin" && (
              <>
                <hr className="mb-4" />
                <h6 className="text-muted text-uppercase mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                  Datos corporativos
                </h6>

                <div className="mb-3">
                  <FormField
                    label="Correo corporativo:"
                    name="corporateEmail"
                    placeholder="tucorreo@agenciafast.cr"
                    type="email"
                    value={form.corporateEmail}
                    onChange={handleChange}
                  />
                  {errors.corporateEmail && (
                    <div className="invalid-feedback d-block">{errors.corporateEmail}</div>
                  )}
                </div>
              </>
            )}

            {/* Campos específicos de Mecánico */}
            {userType === "mechanic" && (
              <>
                <hr className="mb-4" />
                <h6 className="text-muted text-uppercase mb-3" style={{ fontSize: "0.75rem", letterSpacing: "0.08em" }}>
                  Datos profesionales
                </h6>

                <div className="mb-3">
                  <FormField
                    label="Correo corporativo:"
                    name="corporateEmail"
                    placeholder="tucorreo@agenciafast.cr"
                    type="email"
                    value={form.corporateEmail}
                    onChange={handleChange}
                  />
                  {errors.corporateEmail && (
                    <div className="invalid-feedback d-block">{errors.corporateEmail}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Especialidad:</label>
                  <select
                    className={`form-control ${errors.specialty ? "is-invalid" : ""}`}
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione una especialidad</option>
                    {specialtyOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.specialty && <div className="invalid-feedback">{errors.specialty}</div>}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Nivel de certificación:</label>
                  <select
                    className={`form-control ${errors.certLevel ? "is-invalid" : ""}`}
                    name="certLevel"
                    value={form.certLevel}
                    onChange={handleChange}
                  >
                    <option value="">Seleccione un nivel</option>
                    {certLevelOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.certLevel && <div className="invalid-feedback">{errors.certLevel}</div>}
                </div>
              </>
            )}

            <div className="d-flex gap-2 mt-4">
              <Button
                label={saving ? "Guardando..." : "Guardar cambios"}
                onClick={handleSubmit}
                backgroundColor="#198754"
                hoverColor="#145c32"
                color="#fff"
                className="btn btn-success flex-grow-1"
                disabled={saving}
              />
              <Button
                label="Cancelar"
                onClick={() => navigate(-1)}
                backgroundColor="#6c757d"
                hoverColor="#495057"
                color="#fff"
                className="btn btn-secondary"
              />
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
