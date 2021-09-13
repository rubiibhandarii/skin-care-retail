import React, { useContext } from 'react';
import './header.css';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../../../context/UserContext';
import Logo from '../../../../images/logo.png';
import swal from 'sweetalert';
import { toast } from 'react-toastify';

const Header2 = () => {
    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const toggleMenu = () => {
        document.getElementById('navbar').classList.toggle('toggle');
    };

    const logout = () => {
        swal({
            title: 'Are you sure want to logout?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                setUserData({
                    token: undefined,
                    user: undefined,
                });
                localStorage.setItem('auth-token', '');
                history.push('/');
                toast.success('You are logged out successfully.');
            }
        });
    };

    return (
        <header>
            <div className="inner-header">
                <Link to="/">
                    <div className="logo">
                        <img src={Logo} alt="" />
                    </div>
                </Link>

                <nav>
                    <i
                        onClick={toggleMenu}
                        id="toggle-button"
                        className="fas fa-bars"
                    ></i>
                    <ul id="navbar">
                        <li>
                            <Link className="nav-item-link active" to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="nav-item-link active"
                                to="/about-us"
                            >
                                About Us
                            </Link>
                        </li>

                        <li className="dropdown">
                            <Link
                                className="nav-item-link "
                                to="#"
                                id="navbarDropdown3"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                Category
                            </Link>
                            <div
                                className="dropdown-menu"
                                aria-labelledby="navbarDropdown3"
                            >
                                <Link
                                    className="dropdown-item"
                                    to="/category/Men"
                                >
                                    Men
                                </Link>

                                <Link
                                    className="dropdown-item"
                                    to="/category/Women"
                                >
                                    Women
                                </Link>

                                <Link
                                    className="dropdown-item"
                                    to="/category/Kids"
                                >
                                    Kids
                                </Link>
                            </div>
                        </li>

                        {userData.user ? (
                            userData.user.role === 'admin' ? (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">
                                        Admin
                                    </Link>
                                </li>
                            ) : null
                        ) : null}

                        <li>
                            <Link to="/wishlist" className="nav-item-link">
                                <i class="far fa-heart"></i>
                            </Link>
                        </li>

                        <li>
                            <Link to="/cart" className="nav-item-link">
                                <i className="fas fa-shopping-cart"></i>
                            </Link>
                        </li>

                        <li>
                            <Link to="/search" className="nav-item-link">
                                <i className="fas fa-search"></i>
                            </Link>
                        </li>

                        {userData.user ? (
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-item-link dropdown-toggle"
                                    to="#"
                                    id="navbarDropdown2"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Hi, {userData.user.firstName}
                                </Link>
                                <div
                                    className="dropdown-menu"
                                    aria-labelledby="navbarDropdown2"
                                >
                                    <Link
                                        className="dropdown-item"
                                        to="/profile"
                                    >
                                        My Profile
                                    </Link>
                                    <Link
                                        className="dropdown-item"
                                        to="/orders"
                                    >
                                        My Orders
                                    </Link>
                                  
                                    {/* <Link
                                        className="dropdown-item"
                                        to="/change-password"
                                    >
                                        Change Password
                                    </Link> */}
                                    <div className="dropdown-divider" ></div>
                                    <Link
                                        onClick={() => {
                                            logout();
                                        }}
                                        className="dropdown-item " style={{ color: 'red' }} >
                                       Logout
                                    </Link>
                                </div>
                            </li>
                        ) : null}

                        {userData.user ? null : (
                            <li>
                                <Link to="/customer/login">
                                    <button>Login</button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header2;
