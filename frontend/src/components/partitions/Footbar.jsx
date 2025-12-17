import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';

export default function Footbar() {
    return (
        <div className="d-block d-md-none">
            <div className="position-fixed bottom-0 bg-primary w-100">
                <div className="row">
                    <Nav.Link as={Link} to="/" className="col-3 text-center pt-3">
                        <div>
                            <i className="bi bi-person-circle h3"></i>
                            <p className="py-1">Home</p>
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/students" className="col-3 text-center pt-3">
                        <div>
                            <i className="bi bi-people h3"></i>
                            <p className="py-1">Students</p>
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/courses" className="col-3 text-center pt-3">
                        <div>
                            <i className="bi bi-book h3"></i>
                            <p className="py-1">Courses</p>
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/students-logout"  className="col-3 text-center pt-3" >
                        <div>
                            <i className="bi bi-person-circle h3"></i>
                            <p className="py-1">Logout</p>
                        </div>
                    </Nav.Link>
                </div>
            </div>
        </div>

    )
}
