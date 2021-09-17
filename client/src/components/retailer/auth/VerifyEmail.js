import React, { useEffect } from 'react';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const VerifyEmail = (props) => {
    const token = props.match.params.token;

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await Axios.post(`${process.env.REACT_APP_API_URL}/api/retailers/email-activate`, {
                    token,
                });
            } catch (err) {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                });
            }
        }
        verifyEmail()
    })

    return (
        <div className="main">
            <h4>Your account has been verified</h4>
           <Link to='/retailer/login'><button class='btn btn-primary'>Go to login</button></Link> 
        </div>
    );
};

export default VerifyEmail;
