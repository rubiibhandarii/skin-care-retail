import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = (props) => {
    const history = useHistory();

    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const token = props.match.params.token;

    const submit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword)
            return toast.error('Two password fields did not match.');

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/users/new-password`, {
                newPassword,
                token,
            });
            toast.success('New password has been changed successfully.', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            history.push('/customer/login');
        } catch (err) {
            toast.error(`${err.response.data.message}`);
        }
    };

    return (
        <div className="main">
            <h1>Reset Password</h1>
            <form onSubmit={submit}>
                <div class="mb-3">
                    <label class="form-label">New Password</label>
                    <input
                        type="password"
                        class="form-control"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                    Change Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
