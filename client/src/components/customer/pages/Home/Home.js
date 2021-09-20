import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './home2.css';
import Product from './Product';
import Banner from '../../../../images/banner.png';
import { Link } from 'react-router-dom';
import NoImage from '../../../../images/noimage.jpg';
import SkinCare from '../../../../images/skincare.png';
import SkinConcern from '../../../../images/skinconcern.jpg';
import EyeCare from '../../../../images/eyecare.png';
import LipCare from '../../../../images/lipcare.png';
import BodyCare from '../../../../images/bodycare.png';

const Home2 = () => {
    const [latestProducts, setLatestProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const productResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products/`
            );
            const categoryResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/categories/`
            );
            setLatestProducts(productResponse.data.data);
            setCategories(categoryResponse.data.data);
        };
        loadProducts();
    }, []);

    return (
        <div className="homepage main">
            <div className="hero-section">
                <h3>LIMITED TIME</h3>
                <p>Limited edition skincare product</p>
                <button>SHOP NOW</button>
            </div>

            <div className="outer-latest-released">
                <h3>New Arrivals</h3>
                <div className="latest-released">
                    <Product products={latestProducts} />
                </div>
            </div>

            <div className="banner">
                <div className="left-banner">
                    <img src={Banner} alt="" />
                </div>
                <div className="right-banner">
                    <h3>Great skin is better than filters.</h3>
                    <p>Real men take care of their skin.</p>
                    <button>SHOP NOW</button>
                </div>
            </div>

            <div className="outer-latest-released">
                <h3>Shop by Categories</h3>
                <div className="latest-released">
                    {/* {categories.map((product) => (
                        <div
                            key={product.id}
                            className="single-latest-released"
                        >
                            <Link to={`/category/${product.name}`}>
                                <img
                                    src={
                                        product.imageURL === null
                                            ? NoImage
                                            : product.imageURL
                                    }
                                    alt=""
                                />
                            </Link>
                            <div className="movie-info">
                                <h4 style={{ textAlign: 'center' }}>
                                    <Link to={`/category/${product.name}`}>
                                        {product.name}
                                    </Link>
                                </h4>
                            </div>
                        </div>
                    ))} */}

                    <div className="single-latest-released">
                        <Link to={`/category/Skin Concerns`}>
                            <img src={SkinConcern} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Skin Concerns`}>
                                    Skin Concerns
                                </Link>
                            </h4>
                        </div>
                    </div>

                    <div className="single-latest-released">
                        <Link to={`/category/Skin Care`}>
                            <img src={SkinCare} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Skin Care`}>
                                    Skin Care
                                </Link>
                            </h4>
                        </div>
                    </div>

                    <div className="single-latest-released">
                        <Link to={`/category/Body Care`}>
                            <img src={BodyCare} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Body Care`}>
                                    Body Care
                                </Link>
                            </h4>
                        </div>
                    </div>

                    <div className="single-latest-released">
                        <Link to={`/category/Lip Care`}>
                            <img src={LipCare} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Lip Care`}>Lip Care</Link>
                            </h4>
                        </div>
                    </div>

                    <div className="single-latest-released">
                        <Link to={`/category/Eye Care`}>
                            <img src={EyeCare} alt="" />
                        </Link>
                        <div className="movie-info">
                            <h4 style={{ textAlign: 'center' }}>
                                <Link to={`/category/Eye Care`}>Eye Care</Link>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home2;
