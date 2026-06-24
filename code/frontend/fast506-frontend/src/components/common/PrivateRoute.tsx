import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface Props {
  children: React.ReactNode;
  allowedModules?: string[]; // si se omite, solo requiere estar autenticado
}

const PrivateRoute = ({ children, allowedModules }: Props) => {
  const { user, loading, hasPermission } = useAuth();

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedModules && !allowedModules.some(module => hasPermission(module, 'read'))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
