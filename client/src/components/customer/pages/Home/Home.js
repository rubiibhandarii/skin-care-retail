import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import './home.css'

const Home = () => {
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const productResponse = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/products/`
            );
            const sortedProductResponse = productResponse.data.data.reverse();
            setLatestProducts(sortedProductResponse);
        };
        loadProducts();
    },[]);

    return (
        <div className="outer-latest-released">
            <h1>
                Latest <span class="heading-span">Released</span>
            </h1>

            <div className="latest-released">
                <Product products={latestProducts} />
            </div>
        </div>
    );
};

export default Home;
