import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || "https://saree-backend.onrender.com/api/"; // Make sure your Django server is running

// Fetch all sarees
export const getSarees = async () => {
    const response = await axios.get(`${BASE_URL}sarees/`);
    return response.data;
};

// Fetch all raw materials
export const getRawMaterials = async () => {
    const response = await axios.get(`${API_BASE_URL}raw-materials/`);
    return response.data;
};

// Fetch all transactions
export const getTransactions = async () => {
    const response = await axios.get(`${API_BASE_URL}transactions/`);
    return response.data;
};

// Add a new saree
export const addSaree = async (sareeData) => {
    const response = await axios.post(`${API_BASE_URL}sarees/`, sareeData);
    return response.data;
};

// Add a new raw material
export const addRawMaterial = async (materialData) => {
    const response = await axios.post(`${API_BASE_URL}raw-materials/`, materialData);
    return response.data;
};

// Add a new transaction
export const addTransaction = async (transactionData) => {
    const response = await axios.post(`${API_BASE_URL}transactions/`, transactionData);
    return response.data;
};

export const deleteSaree = async (sareeId) => {
    await axios.delete(`${API_BASE_URL}sarees/${sareeId}/`);
};
// Delete a raw material
export const deleteRawMaterial = async (materialId) => {
    await axios.delete(`${API_BASE_URL}raw-materials/${materialId}/`);
};

// Delete a transaction
export const deleteTransaction = async (transactionId) => {
    await axios.delete(`${API_BASE_URL}transactions/${transactionId}/`);
};

// Update a saree
export const updateSaree = async (sareeId, sareeData) => {
    const response = await axios.put(`${API_BASE_URL}sarees/${sareeId}/`, sareeData);
    return response.data;
};

// Update a raw material
export const updateRawMaterial = async (materialId, materialData) => {
    const response = await axios.put(`${API_BASE_URL}raw-materials/${materialId}/`, materialData);
    return response.data;
};

// Update a transaction
export const updateTransaction = async (transactionId, transactionData) => {
    const response = await axios.put(`${API_BASE_URL}transactions/${transactionId}/`, transactionData);
    return response.data;
};


