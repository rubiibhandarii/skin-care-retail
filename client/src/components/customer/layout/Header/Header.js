import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <Link class="navbar-brand" to="/">
                    Skin Care
                </Link>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls="navbarScroll"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarScroll">
                    <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li class="nav-item">
                            <Link
                                class="nav-link active"
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link
                                class="nav-link dropdown-toggle"
                                to="#"
                                id="navbarScrollingDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Link
                            </Link>
                            <ul
                                class="dropdown-menu"
                                aria-labelledby="navbarScrollingDropdown"
                            >
                                <li>
                                    <Link class="dropdown-item" to="#">
                                        Action
                                    </Link>
                                </li>
                                <li>
                                    <Link class="dropdown-item" to="#">
                                        Another action
                                    </Link>
                                </li>
                                <li>
                                    <hr class="dropdown-divider" />
                                </li>
                                <li>
                                    <Link class="dropdown-item" to="#">
                                        Something else here
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <Link
                                class="nav-link"
                                to="/cart"
                                tabindex="-1"
                                aria-disabled="true"
                            >
                                Cart
                            </Link>
                        </li>

                        <li class="nav-item">
                            <Link
                                class="nav-link"
                                to="/customer/login"
                                tabindex="-1"
                                aria-disabled="true"
                            >
                                Customer Login
                            </Link>
                        </li>

                        <li class="nav-item">
                            <Link
                                class="nav-link"
                                to="/customer/signup"
                                tabindex="-1"
                                aria-disabled="true"
                            >
                                Customer Sign Up
                            </Link>
                        </li>

                        <li class="nav-item">
                            <Link
                                class="nav-link"
                                to="/retailer/login"
                                tabindex="-1"
                                aria-disabled="true"
                            >
                                Retailer Login
                            </Link>
                        </li>

                        <li class="nav-item">
                            <Link
                                class="nav-link"
                                to="/retailer/signup"
                                tabindex="-1"
                                aria-disabled="true"
                            >
                                Retailer Sign Up
                            </Link>
                        </li>
                    </ul>
                    <form class="d-flex">
                        <input
                            class="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button class="btn btn-outline-success" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Header
