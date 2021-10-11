import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../redux/ActionType';
import { AppState } from '../../redux/AppState';
import { IVacation } from '../interface/IVacation/IVacation';
import VacationCard from '../vacationCard/VacationCard';
import './vacationContainer.css';

export default function VacationContainer() {
  const dispatch = useDispatch();
  const vacationsArray = useSelector((state: AppState) => state.vacations);

  let userType = localStorage.getItem("userType");
  
  // const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    localStorage.setItem("vacation", "");
    
    let token = localStorage.getItem("token");

      if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  
      axios
        .get<IVacation[]>("http://localhost:3001/vacations/")
        .then((response) => {
          let vacationsArray = response.data;
          console.log(vacationsArray);
          dispatch({ type: ActionType.ShowAllVacations, payload: vacationsArray });
        })
        .catch((e) => {
          alert(e.response.data.error);
          console.log(e.response.data.error);
        });
    }
  }, []);

  return (
    <div className="vacationContainer">
      {
        vacationsArray.map((vacation, index) => (
          <VacationCard
            id={vacation.id}
            key={index}
            location={vacation.location}
            image={vacation.image}
            description={vacation.description}
            price={vacation.price}
            dateFrom={vacation.dateFrom}
            dateTo={vacation.dateTo}
            amountOfFollowers={vacation.amountOfFollowers}
             isFollowed={vacation.isFollowed}
          />))
      }
    </div>
  )
}
