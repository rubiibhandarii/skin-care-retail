import React from 'react'
import { Link } from 'react-router-dom';

const CheckoutComplete = () => {
    return (
        <div>
            <p>Your order has been placed successfully. Go to orders list page to see your orders.</p>
            <Link to="/orders"><button class="btn btn-primary">Your Orders</button></Link>
        </div>
    )
}

export default CheckoutComplete
