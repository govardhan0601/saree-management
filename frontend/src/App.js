import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Sarees from './pages/Sarees';
import RawMaterials from './pages/RawMaterials';
import Transactions from './pages/Transactions';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sarees" element={<Sarees />} />
                <Route path="/raw-materials" element={<RawMaterials />} />
                <Route path="/transactions" element={<Transactions />} />
            </Routes>
        </Router>
    );
};

export default App;