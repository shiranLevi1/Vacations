import axios from 'axios';
import './navbar.css'
import { useHistory } from 'react-router-dom';
import { Container, NavbarBrand } from 'reactstrap';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { Button, Modal, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../redux/ActionType';
import { AppState } from '../../redux/AppState';
import { ChangeEvent } from 'react';
import Swal from 'sweetalert2';
import { MDBIcon } from 'mdb-react-ui-kit';

export default function Navbar() {
    const dispatch = useDispatch()
    const history = useHistory();
    let token = localStorage.getItem("token");
    let userType = localStorage.getItem("userType");
    const userData = useSelector((state: AppState) => state.currentlyUpdatedUser);
    const [deleteAccountModal, setDeleteAccountModal] = useState(false);
    const [confirmPasswordToDeleteAccountModal, setConfirmPasswordToDeleteAccountModal] = useState(false);
    const [password, setPassword] = useState("");
    const [isAdmin, setIsAdmin] = useState(Boolean);

    const userName = userData.userName;

    useEffect(() => {

        if (userType == "ADMIN") {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false);
        }

    }, [])

    const onEditProfileClicked = async () => {
        try {
            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                let response = await axios.get(`http://localhost:3001/users/`);
                let userData = response.data;
                dispatch({ type: ActionType.GetUserDetails, payload: userData });

                history.push("/editProfile");
            }
        }
        catch (e) {
            alert(e.response.data.error);
            console.log(e.response.data.error);
        }
    }

    const onDeleteAccountClicked = async () => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            setDeleteAccountModal(true);
        }
    }

    const onYesClicked = async () => {
        try {
            setDeleteAccountModal(false);
            setConfirmPasswordToDeleteAccountModal(true);
        }
        catch (e) {
            console.error(e);
            alert(e);
        }
    }

    const onDeleteAccountButtonClicked = async () => {
        try {
            await axios.post(`http://localhost:3001/users/checkPassword`, { userName, password });
            await axios.delete(`http://localhost:3001/users/`);
            Swal.fire({
                icon: 'success',
                title: 'Account has been successfully deleted',
                showConfirmButton: false,
                timer: 1200,
            });

            history.push("/login");
        }
        catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: e.response.data.error,
            })
        }

    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onChangePasswordClicked = async () => {
        if (token) {
            history.push("/updatePassword")
        }
    }

    const onChartClicked = async () => {

        if (isAdmin) {
            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            }
            history.push("/chart")
        }

    }

    const onAddVacationClicked = async () => {

        if (isAdmin) {
            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            }
            history.push("/addVacation")
        }

    }

    const onLogoClicked = async () => {
        history.push("/home");
    }

    const onLogoutClicked = async () => {
        if (token) {
            await Swal.fire({
                title: 'Are you sure you want to exit?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push("/login");
                    Swal.fire({
                        icon: 'success',
                        title: `Goodbye`,
                        showConfirmButton: false,
                        timer: 1200
                    });
                    localStorage.clear();
                }
                else {
                    return;
                }
            });
        }
    }

    return (
        <div className="navbar variant-light">
            <Container>
                <NavbarBrand onClick={onLogoClicked}>
                    MyVacay
                </NavbarBrand>
                <Nav className="me-auto">


                    {isAdmin && <Nav.Link onClick={onAddVacationClicked} className="addVacationBtn">Add Vacation</Nav.Link>}
                    {isAdmin && <Nav.Link onClick={onChartClicked} className="chartBtn">Chart</Nav.Link>}
                </Nav>
        <Nav className="justify-content-end">
                                <NavDropdown title={<FaUserAlt />} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1" onClick={onEditProfileClicked}>Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2" onClick={onChangePasswordClicked} >Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={onDeleteAccountClicked} href="#action/3.4">Delete Profile</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link  onClick={onLogoutClicked}><AiOutlineLogout className="logout"/></Nav.Link>
        </Nav>

            </Container>
            {/* delete account modal */}
            <Modal show={deleteAccountModal}>
                <Modal.Body>
                    <p>Are you sure you want to delete your Account?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setDeleteAccountModal(false)} variant="secondary">No</Button>
                    <Button onClick={onYesClicked} variant="primary">Yes</Button>
                </Modal.Footer>
            </Modal>
            {/* confirm password to delete account modal */}
            <Modal show={confirmPasswordToDeleteAccountModal}>
                <Modal.Body>
                    <p>Please enter your password to delete this account:</p>
                    <input onChange={onPasswordChanged} type="password" />
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setConfirmPasswordToDeleteAccountModal(false)} variant="secondary">cancel</Button>
                    <Button onClick={onDeleteAccountButtonClicked} variant="primary">Delete Account</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}