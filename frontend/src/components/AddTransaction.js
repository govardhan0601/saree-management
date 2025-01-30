import React, { useState, useEffect } from 'react';
import { getSarees, getRawMaterials, addTransaction } from '../api';

const AddTransaction = ({ onTransactionAdded }) => {
    const [date, setDate] = useState(''); // ✅ No default date, user must select it
    const [type, setType] = useState('');
    const [itemId, setItemId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState('');
    const [sarees, setSarees] = useState([]);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        getSarees().then(data => setSarees(data));
        getRawMaterials().then(data => setMaterials(data));
    }, []);

    useEffect(() => {
        if (type === "saree" && itemId) {
            const selectedSaree = sarees.find(s => s.id === parseInt(itemId));
            if (selectedSaree) {
                setPrice(selectedSaree.price);
            }
        } else if (type === "raw-material") {
            setPrice('');
        }
    }, [type, itemId, sarees]);

    useEffect(() => {
        if (quantity && price) {
            setTotal(quantity * price);
        }
    }, [quantity, price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!date) {
            alert("Please select a date!"); // ✅ Ensure date is selected
            return;
        }

        const transactionData = {
            date,  // ✅ Use the selected date, not the system date
            saree: type === 'saree' ? itemId : null,
            raw_material: type === 'raw-material' ? itemId : null,
            quantity,
            total_price: total
        };

        await addTransaction(transactionData);
        setDate(''); // ✅ Clear after submission
        setItemId('');
        setQuantity('');
        setPrice('');
        setTotal('');
        setType('');
        onTransactionAdded(); // Refresh transactions
    };

    return (
        <div className="container mt-3">
            <h2>Add New Transaction</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Date</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Transaction Type</label>
                    <select className="form-select" value={type} onChange={(e) => setType(e.target.value)} required>
                        <option value="">Select Type</option>
                        <option value="saree">Saree</option>
                        <option value="raw-material">Raw Material</option>
                    </select>
                </div>

                {type && (
                    <div className="mb-3">
                        <label className="form-label">{type === 'saree' ? "Select Saree" : "Select Raw Material"}</label>
                        <select className="form-select" value={itemId} onChange={(e) => setItemId(e.target.value)} required>
                            <option value="">Select</option>
                            {type === 'saree'
                                ? sarees.map(s => <option key={s.id} value={s.id}>{s.name} - ₹{s.price}</option>)
                                : materials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                        </select>
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                </div>

                {type === 'raw-material' && (
                    <div className="mb-3">
                        <label className="form-label">Price per Unit</label>
                        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label"><b>Total Amount</b></label>
                    <input type="text" className="form-control" value={total} readOnly />
                </div>

                <button type="submit" className="btn btn-primary">Add Transaction</button>
            </form>
        </div>
    );
};

export default AddTransaction;