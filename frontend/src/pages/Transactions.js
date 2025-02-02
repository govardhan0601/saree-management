import React, { useState, useEffect, useRef } from 'react';
import { getTransactions, getSarees, getRawMaterials, updateTransaction, deleteTransaction } from '../api';
import AddTransaction from '../components/AddTransaction';
import { useReactToPrint } from 'react-to-print';
import { Modal, Button, Form } from 'react-bootstrap';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [sarees, setSarees] = useState([]);
    const [rawMaterials, setRawMaterials] = useState([]);
    const [editTransaction, setEditTransaction] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [totalMine, setTotalMine] = useState(0);
    const [totalSuri, setTotalSuri] = useState(0);
    const [profitLoss, setProfitLoss] = useState(0);
    const printRef = useRef();

    // Fetch transactions, sarees, and raw materials
    const fetchTransactions = async () => {
        try {
            const data = await getTransactions();
            const sareeData = await getSarees();
            const rawMaterialData = await getRawMaterials();
            
            setTransactions(data);
            setSarees(sareeData);
            setRawMaterials(rawMaterialData);

            let mineTotal = 0;
            let suriTotal = 0;

            data.forEach(t => {
                if (t.saree) {
                    const sareeItem = sareeData.find(s => s.id === parseInt(t.saree));
                    const sareePrice = sareeItem ? sareeItem.price : 0;
                    const totalSareeCost = parseFloat(t.quantity) * parseFloat(sareePrice);
                    mineTotal += totalSareeCost;
                } else if (t.raw_material || t.total_price) {
                    suriTotal += parseFloat(t.total_price);
                }
            });

            setTotalMine(mineTotal);
            setTotalSuri(suriTotal);
            setProfitLoss(mineTotal - suriTotal);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
        documentTitle: "Transaction Report",
    });

    const openEditModal = (transaction) => {
        setEditTransaction({ ...transaction });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditTransaction(null);
    };

    const handleUpdate = async () => {
        try {
            await updateTransaction(editTransaction.id, editTransaction);
            closeModal();
            fetchTransactions();
        } catch (error) {
            console.error("Error updating transaction:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            try {
                await deleteTransaction(id);
                fetchTransactions();
            } catch (error) {
                console.error("Error deleting transaction:", error);
            }
        }
    };

    return (
        <div className="container">
            <h1 className="mt-3 text-center">📜 Transactions</h1>
            <AddTransaction onTransactionAdded={fetchTransactions} />

            <div className="text-end mb-3">
                <button className="btn btn-dark shadow-sm" onClick={handlePrint}>
                    🖨️ Print Report
                </button>
            </div>

            <div ref={printRef} className="card mt-4 p-4 shadow-sm">
                <h2 className="text-center mb-3">Transaction Report</h2>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Mine</th>
                            <th>Suri</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => {
                            const sareeItem = transaction.saree ? sarees.find(s => s.id === parseInt(transaction.saree)) : null;
                            const rawMaterialItem = transaction.raw_material ? rawMaterials.find(rm => rm.id === parseInt(transaction.raw_material)) : null;

                            const unitPrice = sareeItem 
                                ? sareeItem.price 
                                : transaction.raw_material 
                                    ? transaction.total_price / transaction.quantity 
                                    : "";

                            const totalPrice = sareeItem 
                                ? transaction.quantity * sareeItem.price 
                                : transaction.total_price;

                            const mineAmount = transaction.saree ? totalPrice : "";
                            const suriAmount = transaction.raw_material ? totalPrice : "";

                            return (
                                <tr key={transaction.id}>
                                    <td>{transaction.date || "N/A"}</td>
                                    <td>{sareeItem?.name || rawMaterialItem?.name || "Amount"}</td>
                                    <td>{transaction.quantity}</td>
                                    <td>₹{unitPrice.toFixed(2)}</td>
                                    <td>₹{mineAmount ? mineAmount.toFixed(2) : "-"}</td>
                                    <td>₹{suriAmount ? suriAmount.toFixed(2) : "-"}</td>
                                    <td>
                                        <button className="btn btn-warning btn-sm me-2" onClick={() => openEditModal(transaction)}>✏️ Edit</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(transaction.id)}>🗑️ Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr className="table-secondary">
                            <td colSpan="4"><b>Total</b></td>
                            <td><b>₹{totalMine.toFixed(2)}</b></td>
                            <td><b>₹{totalSuri.toFixed(2)}</b></td>
                            <td></td>
                        </tr>
                        <tr className={profitLoss >= 0 ? "table-success" : "table-danger"}>
                            <td colSpan="4"><b>Profit/Loss</b></td>
                            <td colSpan="2"><b>{profitLoss >= 0 ? `Profit: ₹${profitLoss.toFixed(2)}` : `Loss: ₹${Math.abs(profitLoss).toFixed(2)}`}</b></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Transaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editTransaction && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    value={editTransaction.date} 
                                    onChange={(e) => setEditTransaction({ ...editTransaction, date: e.target.value })} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={editTransaction.quantity} 
                                    onChange={(e) => setEditTransaction({ ...editTransaction, quantity: e.target.value })} 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Total Price</Form.Label>
                                <Form.Control 
                                    type="number" 
                                    value={editTransaction.total_price} 
                                    onChange={(e) => setEditTransaction({ ...editTransaction, total_price: e.target.value })} 
                                />
                            </Form.Group>

                            <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Transactions;