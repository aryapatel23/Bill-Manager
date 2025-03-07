import { useState } from "react";
import axios from "axios";
import "./BillForm.css"; // Import CSS file

const BillForm = () => {
    const [formData, setFormData] = useState({
        customerName: "",
        items: [{ name: "", price: "", quantity: "" }],
        totalAmount: "",
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

    const [error, setError] = useState(null); // State for error messages

    const handleChange = (e, field, index = null, isAddress = false) => {
        let value = e.target.value;

        // ✅ Convert price & quantity to numbers
        if (field === "price" || field === "quantity" || field === "totalAmount") {
            value = Number(value);
            if (isNaN(value) || value <= 0) value = 1; // Ensure valid numbers
        }

        if (isAddress) {
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [field]: value
                }
            });
        }
         else if (index !== null) {
            // ✅ Handling items (array)
            const updatedItems = [...formData.items];
            updatedItems[index][field] = value;
            setFormData({ ...formData, items: updatedItems });
        } else {
            // ✅ Handling normal fields
            setFormData({ ...formData, [field]: value });
        }
    };





    const addItem = () => {
        setFormData((prevForm) => ({
          ...prevForm,
          items: [...prevForm.items, { name: "", price: 1, quantity: 1 }], // ✅ Use numbers, not strings
        }));
      };
      

    const removeItem = (index) => {
        setFormData((prev) => ({
            ...prev,
            items: prev.items.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Convert all item prices & quantities to numbers
        const processedItems = formData.items.map(item => ({
            ...item,
            price: Number(item.price),  // Ensure price is a number
            quantity: Number(item.quantity) // Ensure quantity is a number
        }));

        const processedData = {
            ...formData,
            totalAmount: Number(formData.totalAmount),  // Ensure totalAmount is a number
            items: processedItems
        };

        console.log("Submitting Data:", processedData); // Check before sending

        try {
            const response = await axios.post(
                "https://backend-for-bill-1.onrender.com/bills/create",
                processedData
            );
            console.log("✅ Bill created:", response.data);
        } catch (error) {
            console.error("❌ Error submitting form:", error.response?.data || error);
        }
    };




    return (
        <div className="bill-form-container">
            <h2>Add New Bill</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
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
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => handleChange(e, "totalAmount")}
                    required
                />

                <h3>Address</h3>
                <input
                    type="text"
                    placeholder="House No"
                    value={formData.address.houseNo}
                    onChange={(e) => handleChange(e, "houseNo", null, true)} // ✅ Added `true`
                    required
                />
                <input
                    type="text"
                    placeholder="Street"
                    value={formData.address.street}
                    onChange={(e) => handleChange(e, "street", null, true)} // ✅ Added `true`
                    required
                />
                <input
                    type="text"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={(e) => handleChange(e, "city", null, true)} // ✅ Added `true`
                    required
                />
                <input
                    type="text"
                    placeholder="Taluka"
                    value={formData.address.taluka}
                    onChange={(e) => handleChange(e, "taluka", null, true)} // ✅ Added `true`
                    required
                />
                <input
                    type="text"
                    placeholder="District"
                    value={formData.address.district}
                    onChange={(e) => handleChange(e, "district", null, true)} // ✅ Added `true`
                    required
                />
                <input
                    type="text"
                    placeholder="State"
                    value={formData.address.state}
                    onChange={(e) => handleChange(e, "state", null, true)} // ✅ Added `true`
                    required
                />


                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default BillForm;
