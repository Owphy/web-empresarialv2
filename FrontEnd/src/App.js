import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import MiNavbar from './components/Navbar';
import LoginSample from './pages/Login';
import './App.css';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios');

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
        <Route path="/" element={<main>Contenido principal</main>} />
        <Route path="/login" element={<LoginSample />}/>
      </Routes>
    </BrowserRouter>

  );

}


export default App;

