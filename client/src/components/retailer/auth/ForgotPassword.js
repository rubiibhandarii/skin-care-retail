import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/retailers/reset-password`, {
                email,
            });
            setEmail('');
            toast.success('Link has been sent to your email.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        } catch (err) {
            toast.error(`${err.response.data.message}`, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <div>
            <h1>Forgot Password</h1>

            <div class="mb-3">
                <label class="form-label">Email address</label>
                <input
                    type="text"
                    class="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button class="btn btn-primary" onClick={submit}>Submit</button>
        </div>
    );
};

export default ForgotPassword;
