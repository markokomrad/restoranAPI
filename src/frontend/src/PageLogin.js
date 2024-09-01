import { useState } from 'react';
import './App.css';

const PageLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Prebacivac na localhost:3000/register za registraciju
  const registerAccount = () => {
    window.location.href = '/register';
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // POST zahtev na backend za proveru username i password-a
    const response = await fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      // Ako je verifikacija uspešna, preusmeravanje na main page
      window.location.href = '/main-page';
    } else {
      // Ako nije, možeš prikazati poruku o grešci
      alert('Invalid username or password');
    }
  };

  // Prikaz na stranici PageLogin koja se nalazi na localhost:3000
  return (
    <div className="page-login">
      <div className="container">
        {/* Left side */}
        <div className="left-side">
          <h1 className="heading">RestaurantAPI</h1>
          <p className="description">A simple restaurant API for managing different restaurants around the globe.</p>
        </div>
        {/* Right side */}
        <div className="right-side">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                className="input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button className="button login-button" type="submit">
                Log in
              </button>
            </div>
            <div className="text-center">
              <a href="/forgotten-password" className="forgot-password" >Forgotten password?</a>
            </div>
            <hr className="divider" />
            <div className="text-center">
            <button className="button create-account-button" type="button" onClick={registerAccount}>
                Create new account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
