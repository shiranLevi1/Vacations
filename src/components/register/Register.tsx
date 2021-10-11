import axios from 'axios';
import { ChangeEvent, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import './register.css';
import Swal from 'sweetalert2';
import { MDBInput, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import './register.css';
import Typography from "@material-ui/core/Typography";

export default function Register() {
    const history = useHistory();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");


    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setUserNameErrorMessage("");
        setUserName(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordErrorMessage("");
        setPassword(event.target.value);
    }

    const onFirstNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const onLastNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const onAddressChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }

    const validateEmptyFeilds = async (errorMessage: any) => {
        if (!userName.trim()) {
            setUserNameErrorMessage(errorMessage);
        }
        if (!password.trim()) {
            setPasswordErrorMessage(errorMessage);
        }

        return;
    }

    const validateUserName = async (errorMessage: any) => {
        if (errorMessage == "User name already exist") {
            setUserNameErrorMessage(errorMessage);
        }

        return;
    }

    const onRegisterClicked = async () => {
        try {
            await axios.post("http://localhost:3001/users/", { userName, password, firstName, lastName, address });
            
            history.push("/login");

            Swal.fire({
                icon: 'success',
                title: 'User registered success',
                showConfirmButton: false,
                timer: 1500
            })
        }
        catch (e) {
            await validateEmptyFeilds(e.response.data.error);
            await validateUserName(e.response.data.error);
            console.log(e.response.data.error);
        }
    }

    return (
        <div className="register">
            <div className="registerBody">


                <MDBContainer breakpoint="sm">

                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <br />

                    <MDBInput type="text" onChange={onUserNameChanged} label="User Name *" outline size="sm" />
                    <div className="errors">{userNameErrorMessage}</div>
                    <br />
                    <MDBInput type="password" onChange={onPasswordChanged} label="Password *" outline size="sm" />
                    <div className="errors">{passwordErrorMessage}</div>
                    <br/>
                    <MDBInput onChange={onFirstNameChanged} label="First Name" outline size="sm" />
                    <br />
                    <MDBInput type="text" onChange={onLastNameChanged} label="Last name" outline size="sm" />
                    <br />
                    <MDBInput onChange={onAddressChanged} label="Address" outline size="sm" />
                    <br />
                    <MDBBtn color="primary" className="registerBtn" onClick={onRegisterClicked}>Register</MDBBtn>
                    <br />
                    <NavLink className="navbarLink" to="/login">
                        <span>Have an account?</span>
                    </NavLink>

                </MDBContainer>

            </div>
        </div>
    )
}
