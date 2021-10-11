import { Typography } from '@material-ui/core';
import axios from 'axios';
import { MDBContainer, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { useState, ChangeEvent } from 'react';
import { FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import './changePassword.css';


export default function ChangePassword() {
    const history = useHistory();

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const token = localStorage.getItem("token");

    const [errorMessage, setErrorMessage] = useState("");
    const [markAsRedPasswordFeild, setMarkAsRedPasswordFeild] = useState({});
    const [markAsRedNewPasswordFeild, setMarkAsRedNewPasswordFeild] = useState({});

    const style = { border: "1px solid red" }

    const onOldPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setErrorMessage("");
        setMarkAsRedPasswordFeild({});
    }

    const onNewPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
        setErrorMessage("");
        setMarkAsRedNewPasswordFeild({});
    }

    const validateEmptyFeilds = async () => {
        if (!password) {
            setMarkAsRedPasswordFeild(style);
        }
        if (!newPassword) {
            setMarkAsRedNewPasswordFeild(style);
        }

        return;
    }

    const validateCurrentPassword = async (errorMessage: any) => {
        if (errorMessage == "Incorrect password") {
            setMarkAsRedPasswordFeild(style);
        }

        return;
    }

    const onChangePasswordClicked = async () => {
        try {
            if (token) {
                await validateEmptyFeilds();
                await axios.post("http://localhost:3001/users/checkPassword", { password });
                await axios.put("http://localhost:3001/users/changePassword", { newPassword });
                history.push("/home");

                Swal.fire({
                    icon: 'success',
                    title: `Your password has been successfully changed`,
                    showConfirmButton: false,
                    timer: 1200
                })
            }
        }
        catch (e) {
            setErrorMessage(e.response.data.error);
            await validateCurrentPassword(e.response.data.error);
            console.log(e.response.data.error);
        }
    }


    return (
        <div className="changePassword">
            <div className="changePasswordBody">

                <Typography component="h1" variant="h5">
                    Change password
                </Typography>
                <br />

                <FormControl type="password" className="input" onChange={onOldPasswordChanged} style={markAsRedPasswordFeild} placeholder="Current password" />
                <br />
                <FormControl type="password" className="input" onChange={onNewPasswordChanged} style={markAsRedNewPasswordFeild} placeholder="New password" />
                <br />
                <div>{errorMessage}</div>
                <br />
                <MDBBtn color="primary" className="btn" onClick={onChangePasswordClicked}>Change password</MDBBtn>
                <br />

            </div>
        </div>
    )
}