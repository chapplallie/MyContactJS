import logo from './img/logo.png';
import './App.css';
import Button from './components/button';
import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from './pages/Signup';
import Auth from './pages/Auth';
import UserPage from './pages/[userId]/contacts/page';
import AddContactPage from './pages/[userId]/contacts/add/page';
import EditContactPage from './pages/[userId]/contacts/edit/page';

function App() {
    const navigate = useNavigate();

    return (
        <div className="App w-full">
            <header>
                <img src={logo} alt="logo" />
                <p>
                    Bienvenue sur l'application MyContacts
                </p>
                <div className='flex gap-10 w-full justify-center mb-5'>
                    <Button onClick={() => navigate('/signup')}>s'inscrire</Button>
                    <Button onClick={() => navigate('/auth')}>se connecter</Button>
                </div>
            </header>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/auth' element={<Auth />} />
                <Route path="/:userId/contacts" element={<UserPage email={localStorage.getItem('userEmail') || ''} />} />
                <Route path="/:userId/contacts/add" element={<AddContactPage />} />
                <Route path="/:userId/contacts/edit/:contactId" element={<EditContactPage />} />
            </Routes>
        </div>
    );
}

export default App;