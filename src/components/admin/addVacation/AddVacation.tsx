import axios from 'axios';
import Swal from 'sweetalert2';
import { ChangeEvent, useState } from 'react'
import { Button, FormControl } from 'react-bootstrap';
import './addVacation.css';
import { useHistory } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";

export default function AddVacation() {
    const history = useHistory();

    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [dateFrom, setFromDate] = useState("");
    const [dateTo, setToDate] = useState("");
    const [price, setPrice] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");
    const [markAsRedLocationFeild, setMarkAsRedLocationFeild] = useState({});
    const [markAsRedImageFeild, setMarkAsRedImageFeild] = useState({});
    const [markAsRedDescriptionFeild, setMarkAsRedDescriptionFeild] = useState({});
    const [markAsRedFromDateFeild, setMarkAsRedFromDateFeild] = useState({});
    const [markAsRedToDateFeild, setMarkAsRedToDateFeild] = useState({});
    const [markAsRedPriceFeild, setMarkAsRedPriceFeild] = useState({});

    const style = { border: "1px solid red" }

    const onLocationChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setLocation(event.target.value);
        setErrorMessage("");
        setMarkAsRedLocationFeild({});
    }

    const onImageChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.value);
        setErrorMessage("");
        setMarkAsRedImageFeild({});
    }

    const onDescriptionChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
        setErrorMessage("");
        setMarkAsRedDescriptionFeild({});
    }

    const onFromDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setFromDate(event.target.value);
        setErrorMessage("");
        setMarkAsRedFromDateFeild({});
    }

    const onToDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setToDate(event.target.value);
        setErrorMessage("");
        setMarkAsRedToDateFeild({});
    }

    const onPriceChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setPrice(+event.target.value);
        setErrorMessage("");
        setMarkAsRedPriceFeild({});
    }

    const onAddVacationClicked = async () => {
        let token = localStorage.getItem("token");
        let userType = localStorage.getItem("userType");

        try {
            if (userType == "ADMIN") {
                if (token) {
                    axios.defaults.headers.common["Authorization"] = "Bearer " + token;

                    await validateVacation();
                    await axios.post("http://localhost:3001/vacations/", { location, image, description, dateFrom, dateTo, price });
                    Swal.fire({
                        icon: 'success',
                        title: `${location} has been successfully added`,
                        showConfirmButton: false,
                        timer: 1200
                    })
                    history.push("/home");
                }
            }
        }
        catch (e) {
            setErrorMessage(e.response.data.error);
            console.log(e.response.data.error);
        }
    }

    const validateVacationFeilds = async () => {

        if (!location.trim()) {
            setMarkAsRedLocationFeild(style);
        }
        if (!image.trim()) {
            setMarkAsRedImageFeild(style);
        }
        if (!description) {
            setMarkAsRedDescriptionFeild(style);
        }
        if (!dateFrom.trim()) {
            setMarkAsRedFromDateFeild(style);
        }
        if (!dateTo.trim()) {
            setMarkAsRedToDateFeild(style);
        }
        if (!price) {
            setMarkAsRedPriceFeild(style);
        }

        return;
    }

    const getToday = async () => {
        let getToday = new Date();
        let dd = String(getToday.getDate()).padStart(2, '0');
        let mm = String(getToday.getMonth() + 1).padStart(2, '0');
        let yyyy = getToday.getFullYear();

        let today: string = yyyy + '-' + mm + '-' + dd;

        return today;
    }

    const validateDateInput = async () => {
        let today = await getToday()

        if (today > dateFrom) {
            setMarkAsRedFromDateFeild(style);
            return;
        }

        if (dateFrom > dateTo) {
            setMarkAsRedFromDateFeild(style);
            setMarkAsRedToDateFeild(style);
            return;
        }

        return;
    }

    const validateDescriptionInput = async () => {
        if (description.length > 600) {
            setMarkAsRedDescriptionFeild(style);
        }

        return;
    }

    const validateVacation = async () => {
        await validateVacationFeilds();
        await validateDateInput();
        await validateDescriptionInput();
    }

    return (
        <div className="addVacation">
            <div className="addVacationBody">

                <Typography component="h1" variant="h5">
                    Add Vacation
                </Typography>
                <br />

                <FormControl onChange={onLocationChanged} style={markAsRedLocationFeild} className="input" placeholder="Location" /><br/>
                <FormControl onChange={onImageChanged} style={markAsRedImageFeild} className="input" placeholder="Image" /><br/>
                <FormControl onChange={onDescriptionChanged} style={markAsRedDescriptionFeild} className="input" placeholder="Description" /><br/>
                <FormControl onChange={onFromDateChanged} style={markAsRedFromDateFeild} type="date" className="input" placeholder="Date From" /><br/>
                <FormControl onChange={onToDateChanged} style={markAsRedToDateFeild} type="date" className="input" placeholder="Date To" /><br/>
                <FormControl onChange={onPriceChanged} style={markAsRedPriceFeild} type="number" className="input priceInput" placeholder="Price" /> $<br/>
                <div>{errorMessage}</div>
                <Button onClick={onAddVacationClicked}>Add vacation</Button>

            </div>
        </div>
    )
}
