import React from 'react';
import { Link } from 'react-router-dom';
import ceta from '../../../../images/ceta.jpg';

const Product = ({ products }) => {
    return (
        <>
            {products.map((product) => (
                <div key={product.id} className="single-latest-released">
                    <Link to={`/products/${product.id}`}>
                        <img src={ceta} alt="" />
                    </Link>
                    <div className="movie-info">
                        <h4>
                            <Link to={`/items/${product.id}`}>
                                {product.name}
                            </Link>
                        </h4>
                        <i className="fas fa-tag"></i>
                        {/* <span><Link to={`genres/${item.genre}`}>{item.subCategory.name}</Link></span> */}
                        <h6>Rs.{product.price}</h6>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Product;
