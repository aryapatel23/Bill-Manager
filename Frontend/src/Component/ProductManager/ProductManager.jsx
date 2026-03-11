import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Trash2, Loader2, Package, Tag, IndianRupee } from "lucide-react";

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({ name: "", price: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/products/all");
            setProducts(response.data);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!newProduct.name || !newProduct.price) {
            setError("Please provide both name and price.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/products/add", newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: "", price: "" });
            setSuccess("Product added successfully!");
            setError("");
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError("Failed to add product.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            setProducts(products.filter((p) => p._id !== id));
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-bold">Loading product catalog...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                            <Package size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Product Manager</h2>
                            <p className="text-gray-500 font-medium mt-1">Manage predefined items for quick billing</p>
                        </div>
                    </div>

                    <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest pl-1">Product Name</label>
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="e.g. Grain Thresher"
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={newProduct.name}
                                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-widest pl-1">Price (₹)</label>
                            <div className="relative">
                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
                        >
                            <Plus size={20} /> Add Product
                        </button>
                    </form>

                    {error && <p className="mt-4 text-red-500 text-sm font-medium pl-2">{error}</p>}
                    {success && <p className="mt-4 text-green-500 text-sm font-medium pl-2">{success}</p>}
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                        <h3 className="text-xl font-bold text-gray-800">Product List</h3>
                        <span className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold">{products.length} Products</span>
                    </div>

                    {products.length === 0 ? (
                        <div className="p-20 text-center flex flex-col items-center">
                            <div className="p-6 bg-gray-50 rounded-full text-gray-300 mb-4">
                                <Package size={48} />
                            </div>
                            <p className="text-gray-400 font-medium">No products saved yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100">
                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Product Name</th>
                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] text-right">Price</th>
                                        <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-[0.2em] text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {products.map((product) => (
                                        <tr key={product._id} className="group hover:bg-gray-50 transition-colors">
                                            <td className="px-8 py-5 font-bold text-gray-900">{product.name}</td>
                                            <td className="px-8 py-5 text-right font-black text-blue-600">₹{product.price.toLocaleString()}</td>
                                            <td className="px-8 py-5">
                                                <div className="flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleDelete(product._id)}
                                                        className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                                        title="Delete Product"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductManager;
