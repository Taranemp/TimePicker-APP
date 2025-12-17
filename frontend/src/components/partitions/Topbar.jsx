import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom';


export default function Topbar() {
    return (
        <div className="d-none d-md-block">
            <Navbar className="bg-body-tertiary px-4">
                <div className="d-flex flex-row justify-content-start align-items-center">
                    <Nav.Link as={Link} to="/">
                        <Navbar.Brand>Time Picker</Navbar.Brand>
                    </Nav.Link>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/students">Students</Nav.Link>
                        <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                    </Nav>
                </div>
            </Navbar>
        </div>
    )
}
