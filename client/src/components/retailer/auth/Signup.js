import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
    const history = useHistory();

    const [companyName, setCompanyName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error('Two password fields did not match.');
        }

        try {
            const newRetailer = { companyName, email, password };
            await Axios.post(
                `${process.env.REACT_APP_API_URL}/api/retailers/register`,
                newRetailer
            );
            history.push('/retailer/login');
            toast.success(
                'Your account is created successfully. Please check your email for verification.',
                {
                    position: toast.POSITION.BOTTOM_RIGHT,
                }
            );
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div>
            <h1>Retailers Sign Up</h1>
            <form onSubmit={submit}>
                <div class="mb-3">
                    <label class="form-label">Company Name</label>
                    <input
                        type="text"
                        class="form-control"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input
                        type="email"
                        class="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div class="form-text">
                        We'll never share your email with anyone else.
                    </div>
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
                <div class="mb-3">
                    <label class="form-label">Confirm Password</label>
                    <input
                        type="password"
                        class="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Signup;
