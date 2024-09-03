import { useState } from 'react';
import './App.css';

const ForgottenPassword = () => {
  const [username, setUsername] = useState('');
  const [password, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const resetPassword = async () => {
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    try {
      const response = await fetch(`http://localhost:5000/user/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ new_password: password }),
      });

      if (response.ok) {
        alert('Password reset successful!');
        window.location.href = '/';
      } else if (response.status === 404) {
        alert('Username not found!');
      } else {
        alert('Failed to reset password.')
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      alert('An error occurred while resetting the password.');
    }
  };

  return (
    <div className="page-login">
      <div className="container-forgotten-password">
        <div className="center-forgotten-password">
          <div className="right-side-forgotten-password">
            <a href="/" className="go-back" >Go back to login</a>
            <div className="for-pas">
            <h5>Type in your username and your new password to reset it</h5>
            </div>

            <div className="form-group-forgotten-password">
              <input
                className="input"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group-forgotten-password">
              <input
                className="input"
                type="text"
                placeholder="New Password"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group-forgotten-password">
              <input
                className="input"
                type="text"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group-forgotten-password">
              <button className="button login-button" type="submit" onClick={resetPassword}>
                Reset password
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgottenPassword;
