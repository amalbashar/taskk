import axios from 'axios';

// Create an axios instance with a base URL and default headers
const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login function to authenticate user and store the token
export const login = async (formData) => {
  try {
    const res = await api.post('/login', formData);
    const token = res.data.token; // Assuming the token is in res.data.token
    // Store the token in localStorage for persistence across page reloads
    localStorage.setItem('auth_token', token);

    // Set the Authorization header for future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};

// Optionally: A function to check if the user is authenticated (for persisting login state)
const setAuthHeaderFromLocalStorage = () => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Set the Authorization header on app load (if there's a token in localStorage)
setAuthHeaderFromLocalStorage();

export default api;
