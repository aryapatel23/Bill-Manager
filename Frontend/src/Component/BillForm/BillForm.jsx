import { useState } from "react";
import axios from "axios";
import "./BillForm.css"; // Import CSS file

const BillForm = () => {
    const [formData, setFormData] = useState({
        customerName: "",
        items: [{ name: "", price: "", quantity: "" }],
        totalAmount: 0,
        date: "",
        address: {
            houseNo: "",
            street: "",
            city: "",
            taluka: "",
            district: "",
            state: "",
        },
    });

    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(""); // ✅ Success message state

    // Function to calculate the total amount dynamically
    const calculateTotalAmount = (items) => {
        return items.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return total + price * quantity;
        }, 0);
    };

    const handleChange = (e, field, index = null, isAddress = false) => {
        let value = e.target.value;

        if (field === "price" || field === "quantity") {
            value = value === "" ? "" : Number(value);
        }

        if (isAddress) {
            setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, [field]: value },
            }));
        } else if (index !== null) {
            const updatedItems = [...formData.items];
            updatedItems[index][field] = value;
            setFormData((prev) => ({
                ...prev,
                items: updatedItems,
                totalAmount: calculateTotalAmount(updatedItems),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const addItem = () => {
        setFormData((prev) => ({
            ...prev,
            items: [...prev.items, { name: "", price: "", quantity: "" }],
        }));
    };

    const removeItem = (index) => {
        setFormData((prev) => {
            const updatedItems = prev.items.filter((_, i) => i !== index);
            return {
                ...prev,
                items: updatedItems,
                totalAmount: calculateTotalAmount(updatedItems),
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const processedItems = formData.items.map((item) => ({
            ...item,
            price: Number(item.price) || 0,
            quantity: Number(item.quantity) || 0,
        }));

        const processedData = {
            ...formData,
            totalAmount: calculateTotalAmount(processedItems),
            items: processedItems,
        };

        try {
            const response = await axios.post(
                "https://backend-for-bill-1.onrender.com/bills/create",
                processedData
            );

            console.log("✅ Bill created:", response.data);
            setSuccessMessage("🎉 Bill Successfully Created!"); // ✅ Show success message

            setTimeout(() => {
                setSuccessMessage(""); // ✅ Hide after 3 seconds
            }, 3000);

            // ✅ Reset form after submission
            setFormData({
                customerName: "",
                items: [{ name: "", price: "", quantity: "" }],
                totalAmount: 0,
                date: "",
                address: {
                    houseNo: "",
                    street: "",
                    city: "",
                    taluka: "",
                    district: "",
                    state: "",
                },
            });
        } catch (error) {
            console.error("❌ Error submitting form:", error.response?.data || error);
        }
    };

    return (
        <div className="bill-form-container">
            <h2>Add New Bill</h2>

            {/* ✅ Success message */}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form onSubmit={handleSubmit} className="bill-form">
                <label>Customer Name:</label>
                <input
                    type="text"
                    value={formData.customerName}
                    onChange={(e) => handleChange(e, "customerName")}
                    required
                />

                <label>Date:</label>
                <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange(e, "date")}
                    required
                />

                <h3>Items</h3>
                {formData.items.map((item, index) => (
                    <div key={index} className="item-group">
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={item.name}
                            onChange={(e) => handleChange(e, "name", index)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={item.price}
                            onChange={(e) => handleChange(e, "price", index)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={item.quantity}
                            onChange={(e) => handleChange(e, "quantity", index)}
                            required
                        />
                        <button type="button" onClick={() => removeItem(index)} className="remove-btn">
                            ✖
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addItem} className="add-item-btn">
                    + Add Item
                </button>

                <label>Total Amount:</label>
                <input
                    type="text"
                    value={`₹${formData.totalAmount}`}
                    readOnly
                    className="total-amount-input"
                />

                <h3>Address</h3>
                <input type="text" placeholder="House No" value={formData.address.houseNo} onChange={(e) => handleChange(e, "houseNo", null, true)} required />
                <input type="text" placeholder="Street" value={formData.address.street} onChange={(e) => handleChange(e, "street", null, true)} required />
                <input type="text" placeholder="City" value={formData.address.city} onChange={(e) => handleChange(e, "city", null, true)} required />
                <input type="text" placeholder="Taluka" value={formData.address.taluka} onChange={(e) => handleChange(e, "taluka", null, true)} required />
                <input type="text" placeholder="District" value={formData.address.district} onChange={(e) => handleChange(e, "district", null, true)} required />
                <input type="text" placeholder="State" value={formData.address.state} onChange={(e) => handleChange(e, "state", null, true)} required />

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default BillForm;
