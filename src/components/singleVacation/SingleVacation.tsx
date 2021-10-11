import axios from 'axios';
import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { Fragment, useEffect, useState } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { FaDollarSign } from 'react-icons/fa';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ActionType } from '../../redux/ActionType';
import { IVacation } from '../interface/IVacation/IVacation';
import './singleVacation.css';

export default function SingleVacation() {
    useEffect(() => {

        if(userType == "ADMIN"){
            setIsAdmin(true);
        }
        else{
            setIsAdmin(false);
        }
        
    }, [])
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [isAdmin, setIsAdmin] = useState(Boolean);

    let token = localStorage.getItem("token");
    let userType = localStorage.getItem("userType");

    let vacationObj: any = localStorage.getItem("vacation");
    let vacation = JSON.parse(vacationObj);

    const [isFollowed, setIsFollowed] = useState(vacation.isFollowed);
    const [amountOfFollowers, setAmountOfFollowers] = useState(vacation.amountOfFollowers);

    let id = vacation.id;

    const onDeleteVacationClicked = async () => {
        try {
            if (userType == "ADMIN") {
                if (token) {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                }
                await Swal.fire({
                    title: 'Are you sure you want to delete this vacation?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`http://localhost:3001/vacations/${id}`)
                        dispatch({ type: ActionType.DeleteVacation, payload: { id } });
                        Swal.fire({
                            icon: 'success',
                            title: 'Vacation has been successfully deleted',
                            showConfirmButton: false,
                            timer: 1200
                        });
                        history.push("/home");
                    }
                    else{
                        return;
                    }
                });
            }
        }
        catch (e) {
            alert(e.response.data.error);
            console.log(e.response.data.error);
        }
    }

    const onFollowClicked = async () => {
        try {
            if (userType == "CUSTOMER") {
                if (token) {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                }
    if (isFollowed) {
        await axios.delete(`http://localhost:3001/followers/${id}`, {});
        setIsFollowed(false);
        setAmountOfFollowers((amountOfFollowers) - 1);
    }
    else {
        await axios.post(`http://localhost:3001/followers/`, { id });
        setIsFollowed(true);
        setAmountOfFollowers(amountOfFollowers + 1);
    }

}
}
catch (e) {
    // setErrorMessage(e.response.data.error);
    console.log(e.response.data.error);
}
}

    const onEditVacationClicked = async () => {
        history.push("/updateVacation");
    }

    const onBackClicked = async () => {

        history.push("/home");
    }


    return (
        <div className="singleVacation">
            <div className="card mb-3 cardContainer">
                <div className="row g-0">
                    <div className="col-md-5 .img">
                        <img
                            src={vacation.image}
                            alt="..."
                            className="img-fluid"
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body">
                            <h5 className="card-title">{vacation.location}</h5>
                            <p className="card-text description">
                                {vacation.description}
                            </p>
                            <p className="card-text">
                                <small className="text-muted"><span className="boldDateText"><BiCalendar className="calendarIcon" /> {vacation.dateFrom} </span>
                                    <span className="dateText">To:</span> <span className="boldDateText">{vacation.dateTo}</span></small>
                            </p>
                            <span className="price"><FaDollarSign className="dolarSign" />{vacation.price}</span>
                            <span className="followBtn">
                            {!isAdmin && !isFollowed && <MdFavoriteBorder onClick={onFollowClicked}/>}
                            {!isAdmin && isFollowed && <MdFavorite onClick={onFollowClicked}/>}
                            {!isAdmin && <small className="amountOfFollowersText">{amountOfFollowers}</small>}
                            </span>
                            {isAdmin &&<span className="thumbs-up"><MDBIcon far icon="thumbs-up" /> {vacation.amountOfFollowers}</span>}
                            {isAdmin && <span className="deleteVacation" onClick={() => onDeleteVacationClicked()}><MDBIcon icon="trash-alt" className="delete" /></span>}
                            {isAdmin && <span className="editVacation" onClick={() => onEditVacationClicked()}><MDBIcon icon="pencil-alt" /></span>}
                        </div>
                    </div>
                </div>
            </div>

            <span className="backBtn">
                    <MDBIcon icon="angle-double-right" className="backSign" onClick={onBackClicked}/>
            </span>

        </div>
    )
}