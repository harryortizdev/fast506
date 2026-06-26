import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import WhatsAppButton from '../components/atoms/WhatsAppButton';
import AlertWarning from '../components/atoms/AlertWarning';
import AlertSuccess from '../components/atoms/AlertSuccess';
import { forgotPassword, verifyCode, resetPassword } from '../services/AuthService';

type Step = 1 | 2 | 3;

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      AlertWarning('Ingresa tu correo electrónico');
      return;
    }
    setLoading(true);
    try {
      await forgotPassword(email);
      AlertSuccess('Si el correo existe, recibirás el código en tu bandeja');
      setStep(2);
    } catch {
      AlertWarning('Ocurrió un error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      AlertWarning('Ingresa el código recibido');
      return;
    }
    setLoading(true);
    try {
      const res = await verifyCode(code);
      if (res.verified) {
        setStep(3);
      } else {
        AlertWarning('Código incorrecto o expirado');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        AlertWarning('Código incorrecto o expirado');
      } else {
        AlertWarning('Ocurrió un error al validar el código');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) {
      AlertWarning('Ingresa la nueva contraseña');
      return;
    }
    if (newPassword !== confirmPassword) {
      AlertWarning('Las contraseñas no coinciden');
      return;
    }
    setLoading(true);
    try {
      await resetPassword(newPassword);
      AlertSuccess('Contraseña actualizada correctamente');
      navigate('/login');
    } catch {
      AlertWarning('Ocurrió un error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  const stepLabels = ['Correo', 'Código', 'Nueva contraseña'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#EEF1EF' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
          <div className="card shadow-sm border-0">

            <div className="card-header" style={{ backgroundColor: '#2C3E50' }}>
              <h5 className="mb-0 text-center" style={{ color: '#EEF1EF' }}>
                Recuperar contraseña
              </h5>
            </div>

            <div className="card-body p-3 p-md-5" style={{ backgroundColor: '#EEF1EF' }}>

              {/* Indicador de pasos */}
              <div className="d-flex justify-content-center align-items-center mb-4 gap-2">
                {stepLabels.map((label, i) => {
                  const num = (i + 1) as Step;
                  const active = step === num;
                  const done = step > num;
                  return (
                    <div key={num} className="d-flex align-items-center gap-2">
                      <div
                        className="d-flex align-items-center justify-content-center rounded-circle"
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: done ? '#5E6572' : active ? '#2C3E50' : '#ccc',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: 14,
                        }}
                      >
                        {done ? '✓' : num}
                      </div>
                      <span style={{ color: active ? '#2C3E50' : '#777', fontSize: 13 }}>{label}</span>
                      {i < stepLabels.length - 1 && (
                        <div style={{ width: 24, height: 2, backgroundColor: done ? '#5E6572' : '#ccc' }} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">

                  {/* Paso 1: Correo */}
                  {step === 1 && (
                    <form onSubmit={handleSendCode} noValidate>
                      <p className="text-center mb-3" style={{ color: '#2C3E50', fontSize: 14 }}>
                        Ingresa tu correo y te enviaremos un código de 6 dígitos.
                      </p>
                      <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: '#2C3E50' }}>
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="tu@correo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn w-100 mb-3"
                        style={{ backgroundColor: '#2C3E50', color: '#EEF1EF', border: 'none' }}
                        disabled={loading}
                      >
                        {loading ? (
                          <><span className="spinner-border spinner-border-sm me-2" role="status" />Enviando...</>
                        ) : 'Enviar código'}
                      </button>
                      <div className="text-center">
                        <a href="/login" style={{ color: '#5E6572', fontSize: 13 }}>Volver al inicio de sesión</a>
                      </div>
                    </form>
                  )}

                  {/* Paso 2: Código */}
                  {step === 2 && (
                    <form onSubmit={handleVerifyCode} noValidate>
                      <p className="text-center mb-3" style={{ color: '#2C3E50', fontSize: 14 }}>
                        Revisa tu bandeja de entrada y escribe el código de 6 dígitos.
                      </p>
                      <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: '#2C3E50' }}>
                          Código de verificación
                        </label>
                        <input
                          type="text"
                          className="form-control text-center"
                          placeholder="000000"
                          maxLength={6}
                          value={code}
                          onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                          disabled={loading}
                          style={{ letterSpacing: 6, fontSize: 22 }}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn w-100 mb-3"
                        style={{ backgroundColor: '#2C3E50', color: '#EEF1EF', border: 'none' }}
                        disabled={loading}
                      >
                        {loading ? (
                          <><span className="spinner-border spinner-border-sm me-2" role="status" />Verificando...</>
                        ) : 'Verificar código'}
                      </button>
                      <div className="text-center">
                        <button
                          type="button"
                          className="btn btn-link p-0"
                          style={{ color: '#5E6572', fontSize: 13 }}
                          onClick={() => setStep(1)}
                        >
                          Reenviar código
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Paso 3: Nueva contraseña */}
                  {step === 3 && (
                    <form onSubmit={handleResetPassword} noValidate>
                      <p className="text-center mb-3" style={{ color: '#2C3E50', fontSize: 14 }}>
                        Ingresa tu nueva contraseña.
                      </p>
                      <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: '#2C3E50' }}>
                          Nueva contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Nueva contraseña"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      <div className="mb-4">
                        <label className="form-label fw-semibold" style={{ color: '#2C3E50' }}>
                          Confirmar contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Repite la contraseña"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn w-100"
                        style={{ backgroundColor: '#2C3E50', color: '#EEF1EF', border: 'none' }}
                        disabled={loading}
                      >
                        {loading ? (
                          <><span className="spinner-border spinner-border-sm me-2" role="status" />Guardando...</>
                        ) : 'Guardar contraseña'}
                      </button>
                    </form>
                  )}

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

export default ForgotPasswordPage;
