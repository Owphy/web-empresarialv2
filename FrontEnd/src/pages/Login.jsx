import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginSample() {
    const API_URL = process.env.REACT_APP_API_URL;

    /* Estado del formulario */
    const [formulario, setFormulario] = useState({
        correo: '',
        password: '',
    });
    const [mostrarPassword, setMostrarPassword] = useState(false);
    /* FIN: Estado del formulario */

    /* Manejo de cambios en los campos */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormulario((actual) => ({
            ...actual,
            [name]: value
        }));
    }
    /* FIN: Manejo de cambios en los campos */

    /* Envío del formulario */
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formulario),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            alert('Inicio de sesión correcto');

        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Correo o contraseña incorrectos');
        }
    }
    /* FIN: Envío del formulario */

    return (

    /* ===== INICIO: Fondo de la página de login ===== */
    <div className="login-fondo">

        {/* ===== INICIO: Contenedor central del formulario ===== */}
        <div className="login-contenedor">

            {/* ===== INICIO: Encabezado del login ===== */}
            <div className="login-encabezado">
                <h2 className="login-titulo">Iniciar sesión</h2>
                <p className="login-subtitulo">Ingresa tus credenciales para continuar</p>
            </div>
            {/* ===== FIN: Encabezado del login ===== */}

            {/* ===== INICIO: Formulario de login ===== */}
            <Form onSubmit={handleSubmit}>

                {/* ===== INICIO: Campo Correo ===== */}
                <Form.Group className="mb-3" controlId="loginCorreo">
                    <Form.Label className="login-label">Correo electrónico</Form.Label>
                    <Form.Control
                    className="login-input"
                    name="correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formulario.correo}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                    />
                </Form.Group>
                {/* ===== FIN: Campo Correo ===== */}

                {/* ===== INICIO: Campo Contraseña (con botón mostrar/ocultar) ===== */}
                <Form.Group className="mb-3" controlId="loginPassword">
                    <Form.Label className="login-label">Contraseña</Form.Label>
                    <div className="login-password">
                        <Form.Control
                        className="login-input"
                        name="password"
                        type={mostrarPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        value={formulario.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                        />
                        <button
                            type="button"
                            className="login-ver"
                            onClick={() => setMostrarPassword((actual) => !actual)}
                            aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        >
                            {mostrarPassword ? 'Ocultar' : 'Ver'}
                        </button>
                    </div>
                </Form.Group>
                {/* ===== FIN: Campo Contraseña ===== */}

                {/* ===== INICIO: Botón de envío ===== */}
                <Button type="submit" className="login-boton">
                    Ingresar
                </Button>
                {/* ===== FIN: Botón de envío ===== */}

            </Form>
            {/* ===== FIN: Formulario de login ===== */}

            {/* ===== INICIO: Enlace a registro ===== */}
            <p className="login-pie">
                ¿No tienes una cuenta? <Link to="/register" className="login-enlace">Regístrate</Link>
            </p>
            {/* ===== FIN: Enlace a registro ===== */}

        </div>
        {/* ===== FIN: Contenedor central del formulario ===== */}

    </div>
    /* ===== FIN: Fondo de la página de login ===== */
    );
}

export default LoginSample;
