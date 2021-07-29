import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    const history = useHistory();
    const [phone, setPhone] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [country, setCountry] = useState();
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        cartItems.map((item) =>
            setTotalPrice((prevData) => item.totalPrice + prevData)
        );
    }, []);

    const orderItems = async () => {
        const products = [];
        cartItems.forEach((product) => {
            products.push({
                quantity: product.quantity,
                orderedDate: Date.now(),
                phoneNumber: phone,
                address: address,
                city: city,
                country: country,
                totalPrice: product.totalPrice,
                productId: product.id,
            });
        });

        try {
            const token = localStorage.getItem('auth-token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/orders/new`,
                { products },
                { headers: { Authorization: 'Bearer ' + token } }
            );
            toast.success('Order successfully placed', {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            localStorage.setItem('cart', JSON.stringify([]));
            history.push('/checkout/complete');
        } catch (err) {
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
        }
    };

    return (
        <div class="row">
            <div className="col-md-4">
                <h2 class="mb-4">Billing Details</h2>
                <form action="">
                    <div class="mb-3">
                        <label class="form-label">Phone Number</label>
                        <input
                            type="text"
                            class="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Address</label>
                        <input
                            type="text"
                            class="form-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">City</label>
                        <input
                            type="text"
                            class="form-control"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Country</label>
                        <input
                            type="text"
                            class="form-control"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <div className="col-md-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>Rs.{item.quantity}</td>
                                <td>Rs.{item.totalPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>
                                <strong>Total:</strong> Rs.{totalPrice}
                            </th>
                        </tr>
                    </tfoot>
                </table>

                <button class="btn btn-primary" onClick={orderItems}>
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
