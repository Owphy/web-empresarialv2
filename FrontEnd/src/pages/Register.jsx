import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './Register.css';

function NuevoRegistro(){
    const API_URL = process.env.REACT_APP_API_URL;

    const [formulario, setFormulario] = useState({
        nickname:'',
        nombreCompleto:'',
        correo:'',
        password:'',
        confirmPassword:'',
    });

    const handleChange = (event) =>{
        const {name, value} = event.target;
        setFormulario((actual) =>({
            ...actual,
            [name]:value
        }));
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(formulario.password !== formulario.confirmPassword){
            alert('Las contraseñas no coinciden');
            return;
        }
            try{
                const response = await fetch(`${API_URL}/api/auth/registrar`, {
                    method:'POST',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    body: JSON.stringify(formulario),
                });

                if(!response.ok){
                    throw new Error(`HTTP ${response.status}`);
                }
                alert('Usuario registrado correctamente');

                setFormulario({
                    nickname:'',
                    nombreCompleto:'',
                    correo:'',
                    password:'',
                    confirmPassword:'',
                });

            
            }catch(error){
                console.error('Error al registrar usuario:', error);
                alert('No se pudo registrar al usuario');
            }
        }
    

    return(
    /* ===== INICIO: Fondo de la página de registro ===== */
    <div className="registro-fondo">

        {/* ===== INICIO: Contenedor central del formulario ===== */}
        <div className="registro-contenedor">

            {/* ===== INICIO: Encabezado del registro ===== */}
            <div className="registro-encabezado">
                <h2 className="registro-titulo">Registro de usuario</h2>
                <p className="registro-subtitulo">Completa los datos para crear tu cuenta</p>
            </div>
            {/* ===== FIN: Encabezado del registro ===== */}

            {/* ===== INICIO: Formulario de registro ===== */}
            <Form onSubmit={handleSubmit} className="registro-formulario">

                {/* ===== INICIO: Campo Nickname ===== */}
                <Form.Group className="mb-3" controlId="registroNickname">
                    <Form.Label className="registro-label">Nickname</Form.Label>
                    <Form.Control
                    className="registro-input"
                    name="nickname"
                    type="text"
                    placeholder="Ingresa tu nickname"
                    value={formulario.nickname}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                {/* ===== FIN: Campo Nickname ===== */}

                {/* ===== INICIO: Campo Nombre completo ===== */}
                <Form.Group className="mb-3" controlId="registroNombreCompleto">
                    <Form.Label className="registro-label">Nombre completo</Form.Label>
                    <Form.Control
                    className="registro-input"
                    name="nombreCompleto"
                    type="text"
                    placeholder="Ingresa tu nombre completo"
                    value={formulario.nombreCompleto}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                {/* ===== FIN: Campo Nombre completo ===== */}

                {/* ===== INICIO: Campo Correo ===== */}
                <Form.Group className="mb-3" controlId="registroCorreo">
                    <Form.Label className="registro-label">Correo electrónico</Form.Label>
                    <Form.Control
                    className="registro-input"
                    name="correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formulario.correo}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
                {/* ===== FIN: Campo Correo ===== */}

                {/* ===== INICIO: Campos de contraseña (en dos columnas) ===== */}
                <div className="registro-fila">

                    {/* ===== INICIO: Campo Contraseña ===== */}
                    <Form.Group className="mb-3" controlId="registroPassword">
                        <Form.Label className="registro-label">Contraseña</Form.Label>
                        <Form.Control
                        className="registro-input"
                        name="password"
                        type="password"
                        placeholder="Contraseña"
                        value={formulario.password}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    {/* ===== FIN: Campo Contraseña ===== */}

                    {/* ===== INICIO: Campo Confirmar contraseña ===== */}
                    <Form.Group className="mb-3" controlId="registroConfirmPassword">
                        <Form.Label className="registro-label">Confirmar contraseña</Form.Label>
                        <Form.Control
                        className="registro-input"
                        name="confirmPassword"
                        type="password"
                        placeholder="Repite la contraseña"
                        value={formulario.confirmPassword}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    {/* ===== FIN: Campo Confirmar contraseña ===== */}

                </div>
                {/* ===== FIN: Campos de contraseña ===== */}

                {/* ===== INICIO: Botón de envío ===== */}
                <Button type="submit" className="registro-boton">
                    Registrarse
                </Button>
                {/* ===== FIN: Botón de envío ===== */}

            </Form>
            {/* ===== FIN: Formulario de registro ===== */}

            {/* ===== INICIO: Enlace a inicio de sesión ===== */}
            <p className="registro-pie">
                ¿Ya tienes una cuenta? <Link to="/login" className="registro-enlace">Inicia sesión</Link>
            </p>
            {/* ===== FIN: Enlace a inicio de sesión ===== */}

        </div>
        {/* ===== FIN: Contenedor central del formulario ===== */}

    </div>
    /* ===== FIN: Fondo de la página de registro ===== */
    );
}

export default NuevoRegistro;