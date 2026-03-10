import { useState } from "react";
import axios from "axios";

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

    const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-gray-50 hover:bg-white";
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wider";

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-xl my-8 rounded-2xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Create New Bill</h2>

            {/* ✅ Success message */}
            {successMessage && (
                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 font-medium rounded animate-bounce">
                    {successMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Customer Name</label>
                        <input
                            className={inputClasses}
                            type="text"
                            placeholder="Enter customer name"
                            value={formData.customerName}
                            onChange={(e) => handleChange(e, "customerName")}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Billing Date</label>
                        <input
                            className={inputClasses}
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleChange(e, "date")}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                        <h3 className="text-xl font-semibold text-gray-800 uppercase tracking-tighter">Items List</h3>
                    </div>

                    {formData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl relative border border-gray-200 hover:border-blue-200 transition-colors">
                            <div className="md:col-span-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Item Name</label>
                                <input
                                    className={`${inputClasses} mt-1`}
                                    type="text"
                                    placeholder="e.g. Grain Thresher"
                                    value={item.name}
                                    onChange={(e) => handleChange(e, "name", index)}
                                    required
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Price (₹)</label>
                                <input
                                    className={`${inputClasses} mt-1`}
                                    type="number"
                                    placeholder="0"
                                    value={item.price}
                                    onChange={(e) => handleChange(e, "price", index)}
                                    required
                                />
                            </div>
                            <div className="flex items-end gap-2">
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase">Qty</label>
                                    <input
                                        className={`${inputClasses} mt-1`}
                                        type="number"
                                        placeholder="0"
                                        value={item.quantity}
                                        onChange={(e) => handleChange(e, "quantity", index)}
                                        required
                                    />
                                </div>
                                {formData.items.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="mb-1 p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                        title="Remove Item"
                                    >
                                        ✖
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addItem}
                        className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:text-blue-500 rounded-xl font-medium transition-all"
                    >
                        + Add Another Item
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 uppercase tracking-tighter">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <input className={inputClasses} type="text" placeholder="House No" value={formData.address.houseNo} onChange={(e) => handleChange(e, "houseNo", null, true)} required />
                            </div>
                            <div className="col-span-1">
                                <input className={inputClasses} type="text" placeholder="Street" value={formData.address.street} onChange={(e) => handleChange(e, "street", null, true)} required />
                            </div>
                            <div className="col-span-2">
                                <input className={inputClasses} type="text" placeholder="City / Village" value={formData.address.city} onChange={(e) => handleChange(e, "city", null, true)} required />
                            </div>
                            <div className="col-span-1">
                                <input className={inputClasses} type="text" placeholder="Taluka" value={formData.address.taluka} onChange={(e) => handleChange(e, "taluka", null, true)} required />
                            </div>
                            <div className="col-span-1">
                                <input className={inputClasses} type="text" placeholder="District" value={formData.address.district} onChange={(e) => handleChange(e, "district", null, true)} required />
                            </div>
                            <div className="col-span-2">
                                <input className={inputClasses} type="text" placeholder="State" value={formData.address.state} onChange={(e) => handleChange(e, "state", null, true)} required />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between p-6 bg-gray-900 text-white rounded-2xl shadow-inner">
                        <div>
                            <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-4">Total Summary</h3>
                            <div className="flex justify-between items-center text-4xl font-extrabold">
                                <span>₹</span>
                                <span>{formData.totalAmount.toLocaleString()}</span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/50 transition-all active:scale-95"
                        >
                            Confirm & Save Bill
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BillForm;
