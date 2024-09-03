import './App.css';

// import Locations from './Locations';
import PageLogin from './PageLogin'
import PageRegister from './PageRegister'
import ForgottenPassword from './ForgottenPassword'
import MenuPage from './MenuPage'
//const baseUrl = "http://localhost:5000";


function App() {
  const path = window.location.pathname;

  return(
 <div>
    {path === '/' && <PageLogin/>}
    {path === '/register' && <PageRegister/>}
    {path === '/forgotten-password' && <ForgottenPassword/>}
    {path === '/main-page' && <MenuPage/>}
    {/* <PageLogin/> */}
    {/* <h1>Countries</h1> */}
    {/* <Countries/> */}
    {/* <h1>ZEMLJE</h1> */}
    {/* <Locations/> */}
 </div>

  )
}
export default App;
 
// function App() {
//   return(
//  <div>
//      {/* <h1>Studenti</h1> */}
//      <Studenti/>
//      <h1>Studentske grupe</h1>
//      <StudentskeGrupe/>
//  </div>

//   )
// }
// export default App;
