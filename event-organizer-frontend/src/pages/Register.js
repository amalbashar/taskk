import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../components/Layout';
import InputField from '../components/reuseable/InputField';  
import ReusableButton from '../components/reuseable/Button';  
import '../styles/Login.css'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const formData = {
      name,
      email,
      password,
      password_confirmation: confirmPassword, 
    };

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      const { token, user } = response.data;

      localStorage.setItem('auth_token', token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      if (user.role_id === 1) {
        navigate('/admin-dashboard');
      } else if (user.role_id === 2) {
        navigate('/manager-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Layout title="Sign Up">
      <div className="login-container">
        <div className="login-box">
          <h2>Sign Up</h2>
          <p>Create a new account</p>
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <InputField
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
              autoComplete="off"
            />
            <InputField
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
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
            <InputField
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
              autoComplete="new-password"
            />
            <ReusableButton type="submit" className="submit-btn" text="Sign Up" />
            <div className="col-lg-12 text-center mt-3">
              <p>Already have an account? <a href="/" style={{ color: '#002347', fontWeight: 'bolder' }}>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
