import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBoxes, FaMoneyBillWave, FaChartBar } from 'react-icons/fa';
import logo from '../assets/logo.jpg';  // ✅ Correct path

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 shadow">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    <img src={logo} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
                    <strong>Saree Management</strong>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/sarees" className="nav-link"><FaShoppingCart /> Sarees</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/raw-materials" className="nav-link"><FaBoxes /> Raw Materials</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/transactions" className="nav-link"><FaMoneyBillWave /> Transactions</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;