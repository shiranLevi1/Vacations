import { styled } from '@material-ui/core';
import axios from 'axios';
import { MDBInput } from 'mdb-react-ui-kit';
import { ChangeEvent, useState } from 'react'
import { InputGroup, Button, Modal, FormControl } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AppState } from '../../redux/AppState';
import './updateUser.css';
export default function UpdateUser() {
    const userToUpdate = useSelector((state: AppState) => state.currentlyUpdatedUser);

    const history = useHistory();
    const [userName, setUserName] = useState(userToUpdate.userName);
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState(userToUpdate.firstName);
    const [lastName, setLastName] = useState(userToUpdate.lastName);
    const [address, setAddress] = useState(userToUpdate.address);
    const [modal, setModal] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");
    const [markAsRedUserNameFeild, setMarkAsRedUserNameFeild] = useState({});
    const [markAsRedPasswordFeild, setMarkAsRedPasswordFeild] = useState({});
    const [userNameErrorMessage, setUserNameErrorMessage] = useState("");

    const style = {border: "1px solid red"};

    const onUserNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setMarkAsRedUserNameFeild({});
        setUserNameErrorMessage("");
        setUserName(event.target.value);
    }

    const onPasswordChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setErrorMessage("");
        setMarkAsRedPasswordFeild({});
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


    // const validateUserName = async () => {
    //     if(errorMessage == "User name allready exist"){
    //         setMarkAsRedUserNameFeild({border: "1px solid red"})
    //     }
    //     return;
    // }

    const onUpdateDetailsClicked = async () => {
        try {
            await axios.post(`http://localhost:3001/users/validateUserNameInput`, { userName, password });
            setModal(true);
        }
        catch (e) {
            setMarkAsRedUserNameFeild(style);
            setUserNameErrorMessage(e.response.data.error);
            console.log(e.response.data.error);
        }
    }

    const onSaveDetailsClicked = async () => {
        try {
            setModal(true);
            await axios.post(`http://localhost:3001/users/checkPassword`, { userName, password });
            await axios.put(`http://localhost:3001/users/`, { userName, firstName, lastName, address });
            history.push("/home");
            Swal.fire({
                icon: 'success',
                title: `Your details has been successfully updated`,
                showConfirmButton: false,
                timer: 1200
            })
        }
        catch (e) {
            setMarkAsRedPasswordFeild(style)
            setErrorMessage(e.response.data.error);
            console.log(e.response.data.error);
        }
    }

    return (
        <div className="updateUser">

            <FormControl onChange={onUserNameChanged} style={markAsRedUserNameFeild} className="input" placeholder="User Name *" defaultValue={userToUpdate.userName} />
            <div className="errorsDiv">{userNameErrorMessage}</div>
            <FormControl onChange={onFirstNameChanged} className="input" placeholder="First Name" defaultValue={userToUpdate.firstName} /><br />
            <FormControl onChange={onLastNameChanged} className="input" placeholder="Last Name" defaultValue={userToUpdate.lastName} /><br />
            <FormControl onChange={onAddressChanged} className="input" placeholder="Address" defaultValue={userToUpdate.address} /><br />
            <Button onClick={onUpdateDetailsClicked}>Update Details</Button>

            <Modal show={modal} className="modal">
                <Modal.Body>
                    <p>Please enter your password to save the changes</p>
                    <input className="passwordInput" onChange={onPasswordChanged} style={markAsRedPasswordFeild} type="password" />
                    <div>{errorMessage}</div>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => setModal(false)} variant="secondary">cancel</Button>
                    <Button onClick={onSaveDetailsClicked} variant="primary">Save changes</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}