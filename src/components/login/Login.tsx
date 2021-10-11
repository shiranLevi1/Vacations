import axios from 'axios';
import { ChangeEvent, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { MDBInput, MDBBtn, MDBContainer } from "mdb-react-ui-kit";
import './login.css';
import Typography from "@material-ui/core/Typography";
import Swal from 'sweetalert2';


export default function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

    const style = { border: "1px solid red" };

    const history = useHistory();

    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setUserNameErrorMessage("");
        setUserName(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordErrorMessage("");
        setPassword(event.target.value);
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

    const validateCurrentPassword = async (errorMessage: any) => {
        if (errorMessage == "Login failed, invalid user name or password") {
            setPasswordErrorMessage(errorMessage);
        }
        return;
    }


    const onLoginClicked = async () => {
        try {
            const response = await axios.post("http://localhost:3001/users/login", { userName, password });
            let userData = response.data;

            axios.defaults.headers.common["Authorization"] = "Bearer " + userData.token;

            localStorage.setItem("token", userData.token);
            localStorage.setItem("userType", userData.userType);

            history.push("/home");
            
            Swal.fire({
                icon: 'success',
                title: `Welcome ${userName}`,
                showConfirmButton: false,
                timer: 1200
            })

        }
        catch (e) {
            await validateEmptyFeilds(e.response.data.error);
            await validateCurrentPassword(e.response.data.error);
            console.log(e.response.data.error);

        }
    }

    return (
        <div className="login">

            <div className="loginBody">

                <MDBContainer breakpoint="sm">

                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <br />

                    <MDBInput type="text" onChange={onUserNameChanged} label="User Name" outline size="sm" />
                    <div className="errors">{userNameErrorMessage}</div>
                    <br />
                    <MDBInput type="password" onChange={onPasswordChanged} label="password" outline size="sm" />
                    <div className="errors">{passwordErrorMessage}</div>
                    <br/>
                    <MDBBtn color="primary" className="btn" onClick={onLoginClicked}>Login</MDBBtn>
                    <br />
                    <NavLink className="navbarLink" to="/register">
                        <span>Not a member yet?</span>
                    </NavLink>

                </MDBContainer>
            </div>
        </div>

    )
}
