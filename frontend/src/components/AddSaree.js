import React, { useState } from 'react';
import { addSaree } from '../api';

const AddSaree = ({ onSareeAdded }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSaree = { name, price };
        await addSaree(newSaree);
        setName('');
        setPrice('');
        onSareeAdded();  // Refresh list after adding
    };

    return (
        <div className="container mt-3">
            <h2>Add New Saree</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Saree Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price (₹)</label>
                    <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Saree</button>
            </form>
        </div>
    );
};

export default AddSaree;