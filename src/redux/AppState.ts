import { IUser } from "../components/interface/IUser/IUser";
import { IVacation } from "../components/interface/IVacation/IVacation";

export class AppState{
  vacations: IVacation[] = [];

  currentlyUpdatedVacation: IVacation = {
    id: 0,
    description: "",
    image: "",
    location: "",
    dateFrom: "",
    dateTo: "",
    price: 0,
  };

  currentlyUpdatedUser: IUser = {
    firstName: "",
    lastName: "",
    address: "",
    userName: "",
    password: ""
  }
}