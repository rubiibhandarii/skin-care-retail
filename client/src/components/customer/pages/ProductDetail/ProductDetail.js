import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './product-detail.css';
import UserContext from '../../../../context/UserContext';
import { toast } from 'react-toastify';
import ceta from '../../../../images/ceta.jpg';

const ProductDetail = (props) => {
    const [singleProduct, setSingleProduct] = useState({});

    const productId = props.match.params.productId;

    const { userData } = useContext(UserContext);

    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState();

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
