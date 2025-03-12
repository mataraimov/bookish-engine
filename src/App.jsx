import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Routers from './app/Routers.jsx';
import {createContext, useState} from 'react';
import Topbar from "./pages/navbar/TopBar.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

function App() {
    const [user, setUser] = useState(false);

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
