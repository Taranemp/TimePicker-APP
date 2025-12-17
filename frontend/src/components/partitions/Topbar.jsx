import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { isStudentLoggedIn, handleStudentLogout } from "@/services/StudentAuthService.js";
import {Button} from "react-bootstrap";
import AlertModal from '@/components/partitions/AlertModal.jsx'

async function handleLogout(){
    const result = await handleStudentLogout();

    if (!result.ok) {
        return;
    }

    window.location.reload()
}
export default function Topbar() {
    const isLoggedIn = isStudentLoggedIn();
    return (
        <div className="">
            <Navbar className="bg-body-tertiary px-4">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <div className={'d-flex flex-row justify-content-between align-items-center'}>
                        <Nav.Link as={Link} to="/">
                            <Navbar.Brand>Time Picker</Navbar.Brand>
                        </Nav.Link>
                        <div className="d-none d-md-block">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/students">Students</Nav.Link>
                                <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                                {!isLoggedIn && (
                                    <Nav.Link as={Link} to="/students-login">Login</Nav.Link>
                                )}
                            </Nav>
                        </div>
                    </div>
                    {isLoggedIn && (
                        <AlertModal
                            message="Are you sure you want to logout?"
                            onConfirm={() => {
                                handleLogout();
                            }}
                            confirmText="Logout"
                            cancelText="Cancel"
                        >
                            <Button className={'btn btn-warning'}>
                                <i className="bi bi-person-slash"></i>
                                <span className="ps-2">logout</span>
                            </Button>
                        </AlertModal>
                    )}
                </div>
            </Navbar>
        </div>
    )
}
