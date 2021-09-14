import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './product-detail.css';
import UserContext from '../../../../context/UserContext';
import { toast } from 'react-toastify';
import ceta from '../../../../images/ceta.jpg';

const ProductDetail = (props) => {
    const history = useHistory();
    const [singleProduct, setSingleProduct] = useState({});

    const productId = props.match.params.productId;

    const { userData } = useContext(UserContext);

    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState();
    const [isWishlist, setIsWishlist] = useState();

    let products = JSON.parse(localStorage.getItem('cart')) || [];

    useEffect(() => {
        const loadSingleProduct = async () => {
            const singleProductResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products/${productId}`
            );
            setSingleProduct(singleProductResponse.data.data);

            if (
                products.some(
                    (product) =>
                        product.id === singleProductResponse.data.data.id
                )
            ) {
                setIsAdded(true);
            } else {
                setIsAdded(false);
            }

            const token = localStorage.getItem('auth-token');
            const wishlist = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/users/wishlist`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            if (
                wishlist.data.data.some(
                    (product) => product.productId === singleProductResponse.data.data.id
                )
            ) {
                setIsWishlist(true);
            } else {
                setIsWishlist(false);
            }
        };
        loadSingleProduct();
    }, []);

    const addToCart = () => {
        const totalPrice = quantity * singleProduct.price;
        if (products.every((product) => product.id !== singleProduct.id)) {
            products.push({
                ...singleProduct,
                quantity: parseInt(quantity),
                totalPrice,
            });
            setIsAdded(true);
        }
        localStorage.setItem('cart', JSON.stringify(products));
        toast.success('Product added to cart.');
    };

    const removeFromCart = () => {
        setIsAdded(false);
        const filteredItems = products.filter((product) => {
            return product.id !== singleProduct.id;
        });
        localStorage.setItem('cart', JSON.stringify(filteredItems));
        toast.success('Product removed from cart.');
    };

    const addToWishlist = async () => {
        if (userData.user === undefined) {
            return history.push('/customer/login');
        }

        try {
            const data = {
                productId,
            };
            const token = localStorage.getItem('auth-token');
            await axios.post(
                `${process.env.REACT_APP_API_URL}/api/users/wishlist/add`,
                data,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setIsWishlist(true);
            toast.success('Added to wishlist.');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    const removeFromWishlist = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/api/users/wishlist/remove/${productId}`,
                { headers: { Authorization: 'Bearer ' + token } }
            );
            setIsWishlist(false);
            toast.success('Removed from wishlist.');
        } catch (err) {
            toast.error(err.response.data.message);
        }
    };

    return (
        <div className="movie-detail">
            <div className="outer-movie-detail">
                <div className="left-movie-detail">
                    <img src={ceta} alt="" />
                </div>
                <div className="right-movie-detail">
                    <h1>{singleProduct.name}</h1>
                    <div className="movie-detail-desc">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-tag"></i>
                        <span>
                            <Link to={`/genres/${singleProduct.genre}`}>
                                {singleProduct.genre}
                            </Link>
                        </span>
                        <i className="fas fa-clock"></i>
                        <span>{singleProduct.release_date}</span>
                        {isWishlist ? (
                                        <i
                                            onClick={removeFromWishlist}
                                            className="fas fa-heart"
                                            id="filled-heart-icon"
                                        ></i>
                                    ) : (
                                        <i
                                            onClick={addToWishlist}
                                            className="far fa-heart"
                                        ></i>
                                    )}
                    </div>
                    <p>{singleProduct.description}</p>
                    <p>
                        Duration: <span>{singleProduct.length}</span>
                    </p>
                    <p>
                        Director: <span>{singleProduct.director}</span>
                    </p>
                    <input
                        type="number"
                        defaultValue="1"
                        min="1"
                        max="20"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <br />

                    {isAdded ? (
                        <button onClick={removeFromCart}>
                            Remove from cart
                        </button>
                    ) : (
                        <button onClick={addToCart}>Add to cart</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
