import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* صفحات لا تتطلب تسجيل دخول (Login و Register) */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthPage={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reg"
          element={
            <ProtectedRoute isAuthPage={true}>
              <Register />
            </ProtectedRoute>
          }
        />

        {/* صفحات تتطلب تسجيل دخول وأدوار محددة */}
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute requiredRole={1}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manager-dashboard"
          element={
            <ProtectedRoute requiredRole={2}>
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole={3}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;