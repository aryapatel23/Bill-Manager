import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
    User,
    Calendar,
    Package,
    Plus,
    Trash2,
    MapPin,
    IndianRupee,
    X,
    Search,
    ChevronDown,
    Truck,
    Check
} from "lucide-react";

const BillForm = () => {
    const [formData, setFormData] = useState({
        customerName: "",
        items: [{ name: "", price: "", quantity: "" }],
        totalAmount: 0,
        date: new Date().toISOString().split('T')[0],
        address: {
            houseNo: "",
            street: "",
            city: "",
            taluka: "",
            district: "",
            state: "",
        },
    });

    const [products, setProducts] = useState([]);
    const [activeSuggestion, setActiveSuggestion] = useState({ index: null, visible: false });
    const [successMessage, setSuccessMessage] = useState("");
    const suggestionRef = useRef(null);

    // Primary Brand Color
    const BRAND_GREEN = "#00963F";

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/products/all");
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();

        const handleClickOutside = (event) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
                setActiveSuggestion({ index: null, visible: false });
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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

            if (field === "name") {
                setActiveSuggestion({ index, visible: value.length >= 0 });
            }

            setFormData((prev) => ({
                ...prev,
                items: updatedItems,
                totalAmount: calculateTotalAmount(updatedItems),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [field]: value }));
        }
    };

    const handleFocus = (index) => {
        setActiveSuggestion({ index, visible: true });
    };

    const handleSelectProduct = (product, index) => {
        const updatedItems = [...formData.items];
        updatedItems[index].name = product.name;
        updatedItems[index].price = product.price;

        setFormData((prev) => ({
            ...prev,
            items: updatedItems,
            totalAmount: calculateTotalAmount(updatedItems),
        }));
        setActiveSuggestion({ index: null, visible: false });
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

        try {
            await axios.post("http://localhost:5000/bills/create", {
                ...formData,
                items: processedItems,
                totalAmount: calculateTotalAmount(processedItems),
            });
            setSuccessMessage("Bill Successfully Created!");
            setTimeout(() => setSuccessMessage(""), 3000);
            setFormData({
                customerName: "",
                items: [{ name: "", price: "", quantity: "" }],
                totalAmount: 0,
                date: new Date().toISOString().split('T')[0],
                address: { houseNo: "", street: "", city: "", taluka: "", district: "", state: "" },
            });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const inputClasses = "w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#00963F]/20 focus:border-[#00963F] transition-all outline-none text-gray-700 placeholder-gray-400";
    const labelClasses = "block text-xs font-bold text-gray-400 mb-1.5 uppercase tracking-[0.1em] flex items-center gap-2";

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Clean Header */}
                <div className="p-8 md:p-10 border-b border-gray-50 bg-white">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                                <span className="w-2 h-8 bg-[#00963F] rounded-full"></span>
                                Create New Bill
                            </h2>
                            <p className="text-sm text-gray-400 font-medium mt-1">Generate a professional invoice for machinery & equipment</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-2xl border border-gray-100">
                            <Calendar size={16} className="text-[#00963F]" />
                            <span className="text-sm font-bold text-gray-600">{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>

                {/* Success Banner */}
                {successMessage && (
                    <div className="mx-8 mt-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <Check size={20} className="text-white bg-emerald-500 rounded-full p-0.5" />
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-10">
                    {/* Customer & Date Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-1.5">
                            <label className={labelClasses}>Customer Details</label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input className={inputClasses} type="text" placeholder="Full name of customer" value={formData.customerName} onChange={(e) => handleChange(e, "customerName")} required />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className={labelClasses}>Transaction Date</label>
                            <div className="relative">
                                <Calendar size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input className={inputClasses} type="date" value={formData.date} onChange={(e) => handleChange(e, "date")} required />
                            </div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-50 pb-4">
                            <Package size={20} className="text-[#00963F]" />
                            <h3 className="text-xl font-bold text-gray-800 tracking-tight">Machinery & Items</h3>
                        </div>

                        <div className="space-y-4">
                            {formData.items.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-100 relative group transition-all hover:bg-white hover:border-[#00963F]/30 hover:shadow-lg">
                                    <div className="md:col-span-6 relative">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Item Name</label>
                                        <div className="relative mt-1">
                                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-[#00963F] transition-colors" />
                                            <input
                                                className={`${inputClasses} py-2.5 text-sm font-semibold`}
                                                type="text"
                                                placeholder="e.g. Grain Thresher"
                                                value={item.name}
                                                onChange={(e) => handleChange(e, "name", index)}
                                                onFocus={() => handleFocus(index)}
                                                required
                                            />
                                            {activeSuggestion.visible && activeSuggestion.index === index && products.length > 0 && (
                                                <div ref={suggestionRef} className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                                                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Product Suggestions</span>
                                                        <ChevronDown size={12} className="text-gray-300" />
                                                    </div>
                                                    {products.filter(p => !item.name || p.name.toLowerCase().includes(item.name.toLowerCase())).length > 0 ? (
                                                        products.filter(p => !item.name || p.name.toLowerCase().includes(item.name.toLowerCase())).map((p, i) => (
                                                            <button
                                                                key={i}
                                                                type="button"
                                                                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#00963F] hover:text-white transition-all group/item"
                                                                onClick={() => handleSelectProduct(p, index)}
                                                            >
                                                                <div className="flex flex-col">
                                                                    <span className="font-bold text-gray-900 group-hover/item:text-white">{p.name}</span>
                                                                    <span className="text-[10px] uppercase font-bold text-gray-400 group-hover/item:text-emerald-100">Standard Price</span>
                                                                </div>
                                                                <div className="flex items-center gap-1 font-black text-[#00963F] group-hover/item:text-white">
                                                                    <IndianRupee size={12} />
                                                                    <span>{p.price.toLocaleString()}</span>
                                                                </div>
                                                            </button>
                                                        ))
                                                    ) : (
                                                        <div className="px-5 py-6 text-center text-gray-400 text-sm font-medium italic">No catalog matches found</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="md:col-span-3">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Unit Price</label>
                                        <div className="relative mt-1 text-[#00963F]">
                                            <IndianRupee size={16} className="absolute left-3 top-1/2 -translate-y-1/2" />
                                            <input className={`${inputClasses} py-2.5 text-sm font-black`} type="number" placeholder="0" value={item.price} onChange={(e) => handleChange(e, "price", index)} required />
                                        </div>
                                    </div>
                                    <div className="md:col-span-3 flex items-end gap-2">
                                        <div className="flex-1">
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Qty</label>
                                            <div className="relative mt-1">
                                                <X size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                                <input className={`${inputClasses} py-2.5 text-sm font-bold`} type="number" placeholder="0" value={item.quantity} onChange={(e) => handleChange(e, "quantity", index)} required />
                                            </div>
                                        </div>
                                        {formData.items.length > 1 && (
                                            <button type="button" onClick={() => removeItem(index)} className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-100/50 shadow-sm">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            type="button"
                            onClick={addItem}
                            className="w-full py-5 border-2 border-dashed border-gray-100 text-gray-400 hover:text-[#00963F] hover:border-[#00963F]/50 hover:bg-emerald-50/30 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3"
                        >
                            <Plus size={18} /> Add Piece Of Equipment
                        </button>
                    </div>

                    {/* Delivery & Grand Total */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-6">
                        {/* Shipping */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 border-b border-gray-50 pb-3">
                                <Truck size={18} className="text-[#00963F]" />
                                Shipping Destination
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-1 relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input className={inputClasses} type="text" placeholder="Plot/House No" value={formData.address.houseNo} onChange={(e) => handleChange(e, "houseNo", null, true)} required />
                                </div>
                                <div className="col-span-1 relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input className={inputClasses} type="text" placeholder="Street/Zone" value={formData.address.street} onChange={(e) => handleChange(e, "street", null, true)} required />
                                </div>
                                <div className="col-span-2 relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input className={inputClasses} type="text" placeholder="City or Village" value={formData.address.city} onChange={(e) => handleChange(e, "city", null, true)} required />
                                </div>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input className={inputClasses} type="text" placeholder="Taluka" value={formData.address.taluka} onChange={(e) => handleChange(e, "taluka", null, true)} required />
                                </div>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input className={inputClasses} type="text" placeholder="District" value={formData.address.district} onChange={(e) => handleChange(e, "district", null, true)} required />
                                </div>
                                <div className="col-span-2 relative">
                                    <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
                                    <input className={inputClasses} type="text" placeholder="State" value={formData.address.state} onChange={(e) => handleChange(e, "state", null, true)} required />
                                </div>
                            </div>
                        </div>

                        {/* Grand Total */}
                        <div className="flex flex-col justify-between p-8 bg-white border-2 border-[#00963F] rounded-[2.5rem] shadow-2xl shadow-emerald-100/50 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00963F]/5 rounded-bl-[5rem] -mr-8 -mt-8 transition-all group-hover:w-32 group-hover:h-32"></div>

                            <div>
                                <h3 className="text-xs font-black text-[#00963F]/60 uppercase tracking-[0.4em] mb-4">Invoice Summary</h3>
                                <div className="flex items-baseline justify-between gap-4">
                                    <span className="text-gray-400 font-bold text-sm">Grand Total:</span>
                                    <div className="flex items-center gap-1">
                                        <IndianRupee size={24} className="text-[#00963F]" strokeWidth={3} />
                                        <span className="text-5xl font-black text-gray-900 tabular-nums tracking-tighter">
                                            {formData.totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full mt-10 py-5 bg-[#00963F] text-white font-black text-xl rounded-2xl shadow-xl shadow-emerald-900/20 hover:bg-[#007a33] hover:shadow-emerald-900/40 transition-all active:scale-95 flex items-center justify-center gap-3"
                            >
                                <Check size={28} strokeWidth={3} />
                                SAVE INVOICE
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <p className="text-center mt-12 text-gray-300 text-[10px] font-black uppercase tracking-[0.8em]">
                Authentic Machinery Billing System
            </p>
        </div>
    );
};

export default BillForm;
