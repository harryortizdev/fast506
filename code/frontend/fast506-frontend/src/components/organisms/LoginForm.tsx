import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../atoms/WhatsAppButton';
import AlertWarning from '../atoms/AlertWarning';
import AlertSuccess from '../atoms/AlertSuccess';
import { useAuth } from '../../context/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    if (!email.trim()) {
      AlertWarning('El email es requerido');
      return false;
    }
    if (!password.trim()) {
      AlertWarning('La contraseña es requerida');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await login(email, password);
      AlertSuccess('Sesión iniciada correctamente');
      navigate('/');
    } catch {
      AlertWarning('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#EEF1EF' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container-fluid container-md mt-3 mt-md-4 mb-4 px-2 px-md-4">
          <div className="card shadow-sm border-0">

            <div className="card-header" style={{ backgroundColor: '#2C3E50' }}>
              <h5 className="mb-0 text-center" style={{ color: '#EEF1EF' }}>
                Iniciar Sesión
              </h5>
            </div>

            <div className="card-body p-3 p-md-5" style={{ backgroundColor: '#EEF1EF' }}>
              <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                  <form onSubmit={handleSubmit} noValidate>

                    <div className="mb-3">
                      <label className="form-label fw-semibold" style={{ color: '#2C3E50' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="form-label fw-semibold" style={{ color: '#2C3E50' }}>
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" />
                          Verificando...
                        </>
                      ) : (
                        'Iniciar sesión'
                      )}
                    </button>

                    <div className="mt-3 text-center">
                      <span style={{ color: '#2C3E50' }}>
                        ¿No tienes una cuenta?{' '}
                        <br />
                        <a href="/register" style={{ color: '#5E6572', textDecoration: 'underline' }}>
                          Regístrate aquí
                        </a>
                      </span>
                    </div>

                  </form>
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

export default LoginForm;
