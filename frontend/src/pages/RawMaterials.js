import React, { useState, useEffect } from 'react';
import { getRawMaterials, addRawMaterial, deleteRawMaterial } from '../api';

const RawMaterials = () => {
    const [materials, setMaterials] = useState([]);
    const [newMaterial, setNewMaterial] = useState({ name: '' });

    const fetchMaterials = async () => {
        const data = await getRawMaterials();
        setMaterials(data);
    };

    useEffect(() => {
        fetchMaterials();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newMaterial.name) {
            alert("Please enter Raw Material Name.");
            return;
        }
        await addRawMaterial(newMaterial);
        setNewMaterial({ name: '' });
        fetchMaterials(); // Refresh the list after adding
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Raw Material?")) {
            await deleteRawMaterial(id);
            fetchMaterials(); // Refresh the list after deletion
        }
    };

    return (
        <div className="container">
            <h1 className="mt-3">Manage Raw Materials</h1>

            {/* Add Raw Material Form */}
            <form className="mb-3" onSubmit={handleAdd}>
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Raw Material Name" value={newMaterial.name}
                        onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })} required />
                    <button className="btn btn-primary" type="submit">➕ Add</button>
                </div>
            </form>

            {/* Raw Materials List */}
            <ul className="list-group mt-3">
                {materials.map(material => (
                    <li key={material.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {material.name}
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(material.id)}>🗑 Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RawMaterials;