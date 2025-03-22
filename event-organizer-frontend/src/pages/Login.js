import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import InputField from '../components/reuseable/InputField';  
import ReusableButton from '../components/reuseable/Button'; 
import '../styles/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    const formData = {
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      const { token, user } = response.data;

      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('user_id', user.id);
      localStorage.setItem('user_name', user.name);
      localStorage.setItem('role_id', user.role_id);


      setLoading(false);

      if (user.role_id === 1) {
        navigate('/admin-dashboard');
      } else if (user.role_id === 2) {
        navigate('/manager-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <Layout title="Login">
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <p>Welcome back, please enter your credentials to login.</p>
          {loading && <div className="loading-message">Logging in...</div>}
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
              autoComplete="off"
            />
            <InputField
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your Password"
              required
              autoComplete="new-password"
            />
            <ReusableButton 
              type="submit" 
              className="submit-btn" 
              text={loading ? 'Logging in...' : 'Login'} 
              disabled={loading}
            />
            <div className="col-lg-12 text-center mt-3">
              <p>No account? <a href="/reg" style={{ color: '#002347', fontWeight: 'bolder' }}>Sign Up</a></p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;