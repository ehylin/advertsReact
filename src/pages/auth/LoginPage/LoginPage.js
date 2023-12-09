import { useState } from 'react';
import Button from '../../../components/shared/Button';
import FormField from '../../../components/shared/FormField';
import { login } from '../service';
import { useAuthHandlers } from '../context';

import './LoginPage.css';
import { useLocation, useNavigate } from 'react-router';

function LoginPage() {
  const { onLogin } = useAuthHandlers();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false, // Nuevo estado para el checkbox
  });
  const [error, setError] = useState(null);
  const [isFetching, setIsFeching] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsFeching(true);
      await login(credentials);
      setIsFeching(false);
      onLogin();

      // Si la casilla de "Recordar contraseña" está marcada, guardar en el localStorage
      if (credentials.rememberMe) {
        localStorage.setItem('rememberMe', true);
        // Puedes guardar más información relevante si es necesario
      }

      const to = location?.state?.from?.pathname || '/';
      navigate(to);
    } catch (error) {
      setIsFeching(false);
      setError(error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setCredentials((currentCredentials) => ({
      ...currentCredentials,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetError = () => {
    setError(null);
  };

  const { username, password, rememberMe } = credentials;
  const buttonDisabled = !(username && password) || isFetching;

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Twitter</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="username"
          label="phone, email or username"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.username}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.password}
        />
        <label>
          <input
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            onChange={handleChange}
          />
          Remember password
        </label>
        <Button
          type="submit"
          $variant="primary"
          disabled={buttonDisabled}
          className="loginForm-submit"
        >
          {isFetching ? 'Connecting...' : 'Log in'}
        </Button>
        {error && (
          <div className="loginPage-error" onClick={resetError}>
            {error.message}
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
