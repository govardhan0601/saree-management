import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaBoxes, FaMoneyBillWave } from 'react-icons/fa';

const Home = () => {
    return (
        <div className="container text-center mt-5">
            <h1 className="mb-3">Welcome, <span className="text-primary">Vasudeva Reddy</span>!</h1>
            <h3 className="mb-4">Start Calculation</h3>

            <div className="row justify-content-center">
                {/* Sarees Card */}
                <div className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
                    <Link to="/sarees" className="text-decoration-none">
                        <div className="card p-5 shadow-lg text-center" style={{ minHeight: "200px", width: "250px" }}>
                            <FaShoppingCart size={60} className="text-primary mx-auto d-block" />
                            <h4 className="mt-3">Sarees</h4>
                        </div>
                    </Link>
                </div>

                {/* Raw Materials Card */}
                <div className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
                    <Link to="/raw-materials" className="text-decoration-none">
                        <div className="card p-5 shadow-lg text-center" style={{ minHeight: "200px", width: "250px" }}>
                            <FaBoxes size={60} className="text-warning mx-auto d-block" />
                            <h4 className="mt-3">Raw Materials</h4>
                        </div>
                    </Link>
                </div>

                {/* Transactions Card */}
                <div className="col-md-4 col-sm-6 mb-4 d-flex justify-content-center">
                    <Link to="/transactions" className="text-decoration-none">
                        <div className="card p-5 shadow-lg text-center" style={{ minHeight: "200px", width: "250px" }}>
                            <FaMoneyBillWave size={60} className="text-success mx-auto d-block" />
                            <h4 className="mt-3">Transactions</h4>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;