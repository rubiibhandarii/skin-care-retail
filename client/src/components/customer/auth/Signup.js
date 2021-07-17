import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
    const history = useHistory();

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const submit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return toast.error('Two password fields did not match.');
        }

        try {
            const newUser = { firstName, lastName, email, password };
            await Axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/register`,
                newUser
            );
            history.push('/customer/login');
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
            <h1>Customer Sign Up</h1>
            <form onSubmit={submit}>
                <div class="mb-3">
                    <label class="form-label">First Name</label>
                    <input
                        type="text"
                        class="form-control"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div class="mb-3">
                    <label class="form-label">Last Name</label>
                    <input
                        type="text"
                        class="form-control"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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
