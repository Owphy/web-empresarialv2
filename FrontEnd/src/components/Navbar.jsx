import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function MiNavbar({ usuario }){
    return(
      <Navbar expand="lg" className="bg-body-tertiary" usuario={usuario}>
        <Container>
          
            <Navbar.Brand as={Link} to="/">
              Inicio
            </Navbar.Brand>

          {usuario ? (
            <>
              <Nav.Link as={Link} to="/perfil">
                {usuario.nickname}
              </Nav.Link>
              <Nav.Link as={Link} to="/perfil">
                Perfil
              </Nav.Link>
              <Nav.Link as={Link} to="/logout">
                Cerrar sesión
              </Nav.Link>
            </>
          ):(
            <>
            <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
            </>
          )}

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Inicio
                </Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    );
}

export default MiNavbar;

