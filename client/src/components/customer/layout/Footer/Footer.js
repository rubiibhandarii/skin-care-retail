import React from 'react';
import './footer.css'

const Footer = () => {
    return (
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li>
                                <a href="#">about us</a>
                            </li>
                            <li>
                                <a href="#">our services</a>
                            </li>
                            {/* <li>
                                <a href="#">privacy policy</a>
                            </li>
                            <li>
                                <a href="#">affiliate program</a>
                            </li> */}
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>get help</h4>
                        <ul>
                          
                            <li>
                                <a href="#">Add to cart</a>
                            </li>
                            <li>
                                <a href="#">My Wishlist</a>
                            </li>
                            <li>
                                <a href="#">Order status</a>
                            </li>
                          
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>Categories</h4>
                        <ul>
                            <li>
                                <a href="#">Skin Care</a>
                            </li>
                            <li>
                                <a href="#">Eye Care</a>
                            </li>
                            <li>
                                <a href="#">Lip Care</a>
                            </li>
                            <li>
                                <a href="#">Body Care</a>
                            </li>
                            <li>
                                <a href="#">Skin Concerns</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h4>follow us</h4>
                        <div class="social-links">
                            <a href="#">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="#">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
