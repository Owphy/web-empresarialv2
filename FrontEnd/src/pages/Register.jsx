import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NuevoRegistro(){
    const [formulario, setFormulario] = useState({
        nombre:'',
        email:'',
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
                const response = await fetch(`${API_URL}/api/usuarios`, {
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
                    nombre:'',
                    email:'',
                    password:'',
                    confirmPassword:'',
                });

            }catch(error){
                console.error('Error al registrar usuario:', error);
                alert('No se pudo registrar al usuario');
            }
        }

    

    return(
    <div>
        <h2>Registro usuario</h2>

        <Form onSubmit={handleSubmit}>
            <Form.Group clasname="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control 
                name="nombre"
                type="text" 
                placeholder="Ingresa tu nombre"
                value={formulario.nombre}
                onChange={handleChange}
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                name="email"
                type="email" 
                value={formulario.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
                />
            </Form.Group>
            
            <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                name="password"
                type="password" 
                value={formulario.password}
                onChange={handleChange}
                placeholder="Contraseña" 
                required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control 
                name="confirmPassword"
                type="password" 
                value={formulario.password}
                onChange={handleChange}
                placeholder="Contraseña" 
                required
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Registrarse
            </Button>

        </Form>
    </div>
    );
}

export default NuevoRegistro;