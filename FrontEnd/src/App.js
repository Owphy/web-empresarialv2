import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import MiNavbar from './components/Navbar';
import LoginSample from './pages/Login';
import NuevoRegistro from'./pages/Register';
import Inicio from './pages/Home';
import './App.css';


function App() {
  const [data, setData] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/usuarios`);


      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
    }
  };

  fetchData();
}, []);


  return (
    <BrowserRouter>
      <MiNavbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<LoginSample />}/>
        <Route path="/register" element={<NuevoRegistro/>} />
      </Routes>
    </BrowserRouter>

  );

}


export default App;

