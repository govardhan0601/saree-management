import React, { useState, useEffect } from 'react';
import { getSarees, addSaree, deleteSaree } from '../api';

const Sarees = () => {
    const [sarees, setSarees] = useState([]);
    const [newSaree, setNewSaree] = useState({ name: '', price: '' });

    const fetchSarees = async () => {
        const data = await getSarees();
        setSarees(data);
    };

    useEffect(() => {
        fetchSarees();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newSaree.name || !newSaree.price) {
            alert("Please enter both Saree Name and Price.");
            return;
        }
        await addSaree(newSaree);
        setNewSaree({ name: '', price: '' });
        fetchSarees(); // Refresh the list after adding
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Saree?")) {
            await deleteSaree(id);
            fetchSarees(); // Refresh the list after deletion
        }
    };

    return (
        <div className="container">
            <h1 className="mt-3">Manage Sarees</h1>

            {/* Add Saree Form */}
            <form className="mb-3" onSubmit={handleAdd}>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Saree Name" value={newSaree.name}
                        onChange={(e) => setNewSaree({ ...newSaree, name: e.target.value })} required />
                    <input type="number" className="form-control" placeholder="Price" value={newSaree.price}
                        onChange={(e) => setNewSaree({ ...newSaree, price: e.target.value })} required />
                    <button className="btn btn-primary" type="submit">➕ Add</button>
                </div>
            </form>

            {/* Sarees List */}
            <ul className="list-group mt-3">
                {sarees.map(saree => (
                    <li key={saree.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {saree.name} - ₹{saree.price}
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(saree.id)}>🗑 Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sarees;