import { useState } from 'react';
import './App.css';

const PageRegister = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [logged] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email, logged }),
      });
  
      if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }

      if (response.status === 401) {
        const errorData = await response.json();
        alert(errorData.error);
        return;
      }
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('User created:', data);
      window.location.href = '/'
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <div className="page-login">
      <div className="container">
      <div className="left-side">
          <h1 className="heading">RestaurantAPI</h1>
          <p className="description">A simple restaurant API for managing different restaurants around the globe.</p>
        </div>
        <div className="right-side">
          <div className="text-center">
            <a href="/" className="go-back" >Go back to login</a>
          </div>
          <form onSubmit={handleRegister}>
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
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                className="input"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button className="button login-button" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageRegister;
