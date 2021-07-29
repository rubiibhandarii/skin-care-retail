import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import { toast } from 'react-toastify';

const Login = () => {
    const history = useHistory();

    const { setUserData } = useContext(UserContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const loginResponse = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/retailers/login`,
                { email, password }
            );
            setUserData({
                token: loginResponse.data.token,
                user: loginResponse.data.data,
                user_type: 'retailer',
            });
            localStorage.setItem('auth-token', loginResponse.data.token);
            toast.success('You are logged in successfully.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            history.push('/retailer/dashboard');
        } catch (err) {
            toast.error(`${err.response.data.message}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <div>
            <h1>Retailer Login</h1>
            <form onSubmit={submit}>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
                <div class="mb-3">
                    <Link to="/retailer/forgot-password">Forgot password</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
