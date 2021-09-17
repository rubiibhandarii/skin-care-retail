import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './home2.css';
import Product from './Product';
import Banner from '../../../../images/banner.png';

const Home2 = () => {
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const productResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products/`
            );
            setLatestProducts(productResponse.data.data);
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
                <h3>Shop by Skin Concerns</h3>
                <div className="latest-released">
                    <Product products={latestProducts} />
                </div>
            </div>
            
        </div>
    );
};

export default Home2;
