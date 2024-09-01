// import { useState } from 'react';
// import './App.css';

// const ConfirmPassword= () => {
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const checkPassword = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//         alert("Passwords do not match!");
//         return;
//     }
//   };

//   return (
//     <div className="page-login">
//       <div className="container-forgotten-password">
//         {/* Registration Form */}
//         <div className="center-forgotten-password">
//           <div className="right-side-confirm-password">
//             <a href="/forgotten-password" className="go-back" >Go back to forgotten password</a>
//             <div className="for-pas">
//             <h5>Type in your new password</h5>
//             </div>
//           <form onSubmit={checkPassword}>
//             <div className="form-group-forgotten-password">
//               <input
//                 className="input"
//                 type="text"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group-forgotten-password">
//               <input
//                 className="input"
//                 type="text"
//                 placeholder="Confirm password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="form-group-forgotten-password">
//               <button className="button login-button" type="submit">
//                 Reset password
//               </button>
//             </div>
//           </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmPassword;
