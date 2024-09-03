import './App.css';

import PageLogin from './PageLogin'
import PageRegister from './PageRegister'
import ForgottenPassword from './ForgottenPassword'
import MenuPage from './MenuPage'


function App() {
  const path = window.location.pathname;

  return(
 <div>
    {path === '/' && <PageLogin/>}
    {path === '/register' && <PageRegister/>}
    {path === '/forgotten-password' && <ForgottenPassword/>}
    {path === '/main-page' && <MenuPage/>}
 </div>

  )
}
export default App;
