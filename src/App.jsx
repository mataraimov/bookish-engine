import './App.css';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import Routers from './app/Routers.jsx';
import { createContext, useEffect, useState } from 'react';
import { getUser } from "./app/api.js";
import Topbar from "./pages/navbar/TopBar.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

function App() {
    const [user, setUser] = useState(false);
    const navigate = useNavigate(); // Use navigate inside the component

    useEffect(() => {
        const access = localStorage.getItem('access_token');
        if (access) {
            getUser(access)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Ошибка:', error.message);
                    localStorage.removeItem('access_token'); // Remove invalid token
                    // navigate('/'); // Redirect to home
                });
        } else {
            // navigate('/'); // Redirect if no token
        }
    }, [navigate]);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <Topbar/>
            <Routers />
        </UserContext.Provider>
    );
}

export default function WrappedApp() {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
}
