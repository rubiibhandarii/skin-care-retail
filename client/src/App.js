import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

import UserContext from './context/UserContext';
import Header from './components/customer/layout/Header/Header';
import Home from './components/customer/pages/Home/Home';
import Signup from './components/customer/auth/Signup';
import Login from './components/customer/auth/Login';
import CustomerVerifyEmail from './components/customer/auth/VerifyEmail';
import CustomerForgotPassword from './components/customer/auth/ForgotPassword';
import CustomerResetPassword from './components/customer/auth/ResetPassword';

// Retailers
import RetailerSignup from './components/retailer/auth/Signup';
import RetailerLogin from './components/retailer/auth/Login';
import RetailerVerifyEmail from './components/retailer/auth/VerifyEmail';
import RetailerForgotPassword from './components/retailer/auth/ForgotPassword';
import RetailerResetPassword from './components/retailer/auth/ResetPassword';
import Dashboard from './components/retailer/pages/Dashboard/Dashboard';

import { useEffect, useState } from 'react';
import axios from 'axios';

toast.configure();
function App() {
    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    useEffect(() => {
        const checkLoggedIn = async () => {

            let token = localStorage.getItem('auth-token');
            if (token === null) {
                localStorage.setItem('auth-token', '');
                token = '';
            }

            const userTokenResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/tokenIsValid`,
                null,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            const retailerTokenResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/retailers/tokenIsValid`,
                null,
                { headers: { Authorization: 'Bearer ' + token } }
            );

            if (userTokenResponse.data) {
                const userResponse = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/users`,
                    { headers: { Authorization: 'Bearer ' + token } }
                );
                setUserData({
                    token,
                    user: userResponse.data,
                });
            }

            if (retailerTokenResponse.data) {
                const retailerResponse = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/retailers`,
                    { headers: { Authorization: 'Bearer ' + token } }
                );
                setUserData({
                    token,
                    user: retailerResponse.data,
                });
            }
        };
        checkLoggedIn();
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <Header />

                    <div className="container mt-4">
                        <Route exact path="/" component={Home} />
                        <Route exact path="/customer/login" component={Login} />
                        <Route exact path="/customer/signup" component={Signup} />
                        <Route exact path="/customer/verify-email/:token" component={CustomerVerifyEmail} />
                        <Route exact path="/customer/forgot-password" component={CustomerForgotPassword} />
                        <Route exact path="/customer/reset-password/:token" component={CustomerResetPassword} />

                        {/* Retailers */}
                        <Route exact path="/retailer/dashboard" component={Dashboard} />
                        <Route exact path="/retailer/login" component={RetailerLogin} />
                        <Route exact path="/retailer/signup" component={RetailerSignup} />  
                        <Route exact path="/retailer/verify-email/:token" component={RetailerVerifyEmail} />
                        <Route exact path="/retailer/forgot-password" component={RetailerForgotPassword} />
                        <Route exact path="/retailer/reset-password/:token" component={RetailerResetPassword} />
                    </div>

                    {/* <Footer /> */}
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    );
}

export default App;
