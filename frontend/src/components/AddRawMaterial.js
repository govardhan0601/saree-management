import React, { useState } from 'react';
import { addRawMaterial } from '../api';

const AddRawMaterial = ({ onMaterialAdded }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addRawMaterial({ name });
        setName('');
        onMaterialAdded();
    };

    return (
        <div className="container mt-3">
            <h2>Add New Raw Material</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Material Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Add Material</button>
            </form>
        </div>
    );
};

export default AddRawMaterial;