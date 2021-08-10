import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import swal from 'sweetalert';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const token = localStorage.getItem('auth-token');
            const orderedItems = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/users/orders`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setOrders(orderedItems.data.data);
        };
        loadOrders();
    }, []);

    const cancelOrder = async (orderId) => {
        swal({
            title: 'Are you sure?',
            text: 'Once cancelled, you will not be able to see this order!',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const token = localStorage.getItem('auth-token');
                    await axios.delete(
                        `${process.env.REACT_APP_API_URL}/api/users/orders/${orderId}/cancel`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    const myOrderResponse = await axios.get(
                        `${process.env.REACT_APP_API_URL}/api/users/orders`,
                        { headers: { Authorization: 'Bearer ' + token } }
                    );
                    const sortedMyOrderResponse =
                        myOrderResponse.data.data.reverse();
                    setOrders(sortedMyOrderResponse);
                    toast.error(`Your order has been cancelled.`);
                } catch (err) {
                    toast.error(`${err.response.data.message}`);
                }
            }
        });
    };

    return (
        <div>
            {orders.length > 0 ? (
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Retailer</th>
                            <th>Ordered Date</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr>
                                <td>{order.product.name}</td>
                                <td>
                                    {order.user.firstName} {order.user.lastName}
                                </td>
                                <td>{order.orderedDate}</td>
                                <td>Rs. {order.product.price}</td>
                                <td>{order.quantity}</td>
                                <td>Rs. {order.totalPrice}</td>
                                <td>
                                    {(() => {
                                        if (order.status === 'pending') {
                                            return (
                                                <p className="text-warning">
                                                    Pending
                                                </p>
                                            );
                                        }
                                        if (order.status === 'approved') {
                                            return (
                                                <p className="text-success">
                                                    Approved
                                                </p>
                                            );
                                        }
                                        if (order.status === 'refused') {
                                            return (
                                                <p className="text-danger">
                                                    Refused
                                                </p>
                                            );
                                        }
                                        if (order.status === 'delivered') {
                                            return (
                                                <p className="text-success">
                                                    Delivered
                                                </p>
                                            );
                                        }
                                        return null;
                                    })()}
                                </td>
                                <td>
                                    {order.status === 'pending' ? (
                                        <button
                                            onClick={() =>
                                                cancelOrder(order.id)
                                            }
                                            class="btn btn-danger btn-sm"
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <button
                                            disabled
                                            title="This product cannot be canceled"
                                            class="btn btn-secondary btn-sm"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="empty-div">
                    <p>You have not ordered any products yet.</p>
                    <Link to="/">
                        <button className="btn btn-primary">Back to home</button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Orders;
