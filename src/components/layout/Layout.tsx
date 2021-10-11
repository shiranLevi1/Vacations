import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AddVacation from '../admin/addVacation/AddVacation';
import UpdateVacation from '../admin/updateVacation/UpdateVacation';
import Login from '../login/Login';
import Register from '../register/Register';
import './layout.css';
import Navbar from '../navbar/Navbar';
import UpdateUser from '../updateUser/UpdateUser';
import VacationContainer from '../vacationContainer/VacationContainer';
import ChangePassword from '../changePassword/ChangePassword';
import SingleVacation from '../singleVacation/SingleVacation';
import Chart from '../admin/chart/Chart';

export default function Layout() {
    return (
        <BrowserRouter>
            <section className="layout">

                <main>
                    <Switch>
                        <Route path="/register">
                            <Register />
                        </Route>

                        <Route path="/login">
                            <Login />
                        </Route>

                        <Route path="/home">
                            <Navbar />
                            <VacationContainer />
                        </Route>

                        <Route path="/singleVacation">
                            <Navbar />
                            <SingleVacation />
                        </Route>

                        <Route path="/addVacation">
                            <Navbar />
                            <AddVacation />
                        </Route>

                        <Route path="/chart">
                            <Navbar />
                            <Chart />
                        </Route>

                        <Route path="/updateVacation">
                            <Navbar />
                            <UpdateVacation />
                        </Route>

                        <Route path="/editProfile">
                            <Navbar />
                            <UpdateUser />
                        </Route>

                        <Route path="/updatePassword">
                            <Navbar />
                            <ChangePassword />
                        </Route>

                        <Redirect from="/" to="/login" exact />

                    </Switch>
                </main>

            </section>
        </BrowserRouter>
    )
}