import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from 'react-router-dom';

export function Navigation() {
  return (
    <Navbar expand="lg" className="bg-dark bg-gradient" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link><Link to = "/" style = {{textDecoration: 'none', color: '#ffff'}}>Home</Link></Nav.Link>
            <Nav.Link><Link to = '/show' style = {{textDecoration: 'none', color: '#ffff'}}>Show User</Link></Nav.Link>
            <Nav.Link href="#link">Edit User</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
