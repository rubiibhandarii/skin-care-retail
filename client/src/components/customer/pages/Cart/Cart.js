import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../../../context/UserContext';

const Cart = () => {
    const products = JSON.parse(localStorage.getItem('cart')) || [];
    const { userData } = useContext(UserContext);

    const [cartProducts, setCartProducts] = useState(products);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        cartProducts.map((product) =>
            setTotalPrice((prevData) => product.totalPrice + prevData)
        );
    }, []);

    const removeProducts = async (id, totalPrice) => {
        const filteredProducts = cartProducts.filter(
            (product) => product.id !== id
        );
        setCartProducts(filteredProducts);
        setTotalPrice((prevData) => prevData - totalPrice);
        localStorage.setItem('cart', JSON.stringify(filteredProducts));
    };

    const increaseQuantity = (product) => {
        if (product.quantity < 20) {
            let result = cartProducts.map((el) =>
                el.id === product.id && el.quantity < 20
                    ? {
                          ...el,
                          quantity: (product.quantity += 1),
                          totalPrice: product.price * product.quantity,
                      }
                    : el
            );

            setCartProducts(result);
            setTotalPrice((prevData) => prevData + product.price);
            localStorage.setItem('cart', JSON.stringify(result));
        }
    };

    const decreaseQuantity = (product) => {
        if (product.quantity > 1) {
            let result = cartProducts.map((el) =>
                el.id === product.id && el.quantity > 1
                    ? {
                          ...el,
                          quantity: (product.quantity -= 1),
                          totalPrice: product.price * product.quantity,
                      }
                    : el
            );
            setCartProducts(result);
            setTotalPrice((prevData) => prevData - product.price);
            localStorage.setItem('cart', JSON.stringify(result));
        }
    };

    return (
        <>
            {cartProducts.length > 0 ? (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartProducts.map((product) => (
                                <tr>
                                    <td>
                                        <Link to={`products/${product.id}`}>
                                            <img
                                                className="img-thumbnail"
                                                src=""
                                                alt=""
                                            />
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`products/${product.id}`}>
                                            {product.name}
                                        </Link>
                                    </td>
                                    <td>Rs.{product.price}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                decreaseQuantity(product)
                                            }
                                        >
                                            -
                                        </button>
                                        {product.quantity}
                                        <button
                                            onClick={() =>
                                                increaseQuantity(product)
                                            }
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>Rs.{product.totalPrice}</td>
                                    <td>
                                        <button
                                            style={{
                                                border: 'none',
                                                background: 'none',
                                            }}
                                            onClick={() =>
                                                removeProducts(
                                                    product.id,
                                                    product.totalPrice
                                                )
                                            }
                                        >
                                            <i class="fas fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Rs.{totalPrice}</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ) : (
                <div className="empty-div">
                    <p>Your cart is empty</p>
                    <Link to="/">
                        <button className="btn btn-Checkout">
                            Back to home
                        </button>
                    </Link>
                </div>
            )}

{cartProducts.length > 0 ? (
                        <div className="proceed-checkout-div">
                            <Link to={userData.user === undefined ? '/login' : '/checkout'}>
                                <button
                                    type="button"
                                    className="btn btn-Checkout"
                                >
                                    Proceed to Checkout
                                </button>
                            </Link>
                        </div>
                    ) : null}
            {/* <Link to="/checkout">
                <button className="btn btn-primary">Proceed To Checkout</button>
            </Link> */}
        </>
    );
};

export default Cart;
