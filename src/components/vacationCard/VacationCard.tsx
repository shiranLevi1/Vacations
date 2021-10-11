import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ActionType } from '../../redux/ActionType';
import { IVacation } from '../interface/IVacation/IVacation'
import './vacationCard.css';
import { FaDollarSign } from "react-icons/fa";
import { BiCalendar } from "react-icons/bi";
import { useHistory } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function VacationCard(props: IVacation) {
    // const [follow, setfollow] = useState(props.isFollowed);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [isAdmin, setIsAdmin] = useState(Boolean);
    let token = localStorage.getItem("token");
    let userType = localStorage.getItem("userType");

    let id = props.id;

    useEffect(() => {

        if(userType == "ADMIN"){
            setIsAdmin(true);
        }
        else{
            setIsAdmin(false);
        }
        
    }, [])


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

    const onEditVacationClick = async () => {
        localStorage.setItem("vacation", JSON.stringify(props));

        history.push("/updateVacation");
    }

    const onFollowClicked = async () => {
                try {
            if (props.isFollowed) {
                await axios.delete(`http://localhost:3001/followers/${props.id}`, {});
            }
            else {
                await axios.post(`http://localhost:3001/followers/`, { id });
            }
            
            let response = await axios.get<IVacation[]>("http://localhost:3001/vacations/");
            let vacationsArray = response.data;
            
            dispatch({ type: ActionType.ShowAllVacations, payload: vacationsArray });
        }
        catch (e) {
            // setErrorMessage(e.response.data.error);
            console.log(e.response.data.error);
        }
    }

    const onCardClicked = async () => {
        localStorage.setItem("vacation", JSON.stringify(props));
        history.push("/singleVacation");
    }

    return (
        <div className="vacationCard">

            <div className="vacationContainer">
                <img src={props.image} alt="none" className="img" />
                {isAdmin &&<div><span className="thumbs-up"><MDBIcon far icon="thumbs-up" /> {props.amountOfFollowers}</span> </div>}
                <h3 onClick={onCardClicked}>{props.location}</h3>
                <div><span className="boldText"><BiCalendar className="calendarIcon" /> {props.dateFrom} </span>
                    <span className="dateText">To:</span> <span className="boldText">{props.dateTo}</span> </div>
                <div className="priceDiv"><span className="price"><FaDollarSign className="dolarSign" />{props.price}</span> </div>
                {isAdmin && <span className="deleteVacation" onClick={onDeleteVacationClicked}><MDBIcon icon="trash-alt" /></span>}
                {isAdmin && <span className="editVacation" onClick={onEditVacationClick}><MDBIcon icon="pencil-alt" /></span>}
            <span >
                {!isAdmin && !props.isFollowed && <MdFavoriteBorder className="followBtn" onClick={onFollowClicked}/>}
                {!isAdmin && props.isFollowed && <MdFavorite className="followBtn" onClick={onFollowClicked}/>}
                {!isAdmin &&<span>{props.amountOfFollowers}</span>}
            </span>
            </div>
        </div>
    )
}