import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Invoice = () => {
    const { billId } = useParams();
    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://backend-for-bill-1.onrender.com/bills/${billId}`)
            .then(response => {
                setBill(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching bill:", error);
                setLoading(false);
            });
    }, [billId]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <p className="text-center mt-10 text-gray-600">Loading invoice...</p>;
    if (!bill) return <p className="text-center mt-10 text-red-500">Invoice not found.</p>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white shadow-2xl my-10 border border-gray-100 rounded-xl relative print:shadow-none print:my-0 print:p-4">
            <button
                className="absolute top-4 left-4 flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors print:hidden"
                onClick={() => navigate(-1)}
            >
                ⬅ Back
            </button>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 pt-8 md:pt-4">
                <img src="https://res.cloudinary.com/dzsvjyg2c/image/upload/v1741258133/amxh4fnusn45rdqzqlco.png"
                    alt="Company Logo" className="w-48 h-auto mb-4 md:mb-0" />
                <div className="text-right md:text-right text-sm text-gray-600 leading-relaxed italic">
                    <p className="font-bold text-gray-800 not-italic">Samrat Thresher Private Lim.</p>
                    <p>Unjha-Siddhpur Highway</p>
                    <p>Brahmanwada- 384 215</p>
                    <p>Ta. Unjha, Dist. Mehsana, Gujarat,</p>
                    <p>Phone: +91(02767) 282047, 282483</p>
                </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8 tracking-tight uppercase">Invoice</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Customer Details</p>
                    <p className="text-lg font-semibold text-gray-800">{bill.customerName}</p>
                    <p className="text-gray-600 mt-2">
                        {bill.address.houseNo}, {bill.address.street},<br />
                        {bill.address.city}, {bill.address.state}
                    </p>
                </div>
                <div className="md:text-right flex flex-col justify-end">
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">Date of Issue</p>
                    <p className="text-lg font-medium text-gray-800">{new Date(bill.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider rounded-tl-lg">Item Description</th>
                            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-center">Quantity</th>
                            <th className="px-6 py-4 font-semibold uppercase text-xs tracking-wider text-right rounded-tr-lg">Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {bill.items.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-700 font-medium">{item.name}</td>
                                <td className="px-6 py-4 text-gray-600 text-center font-mono">{item.quantity}</td>
                                <td className="px-6 py-4 text-gray-900 text-right font-semibold">₹{item.price.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end mb-8">
                <div className="w-full md:w-1/3 p-4 bg-gray-900 text-white rounded-lg shadow-inner">
                    <div className="flex justify-between items-center">
                        <span className="text-sm uppercase tracking-widest opacity-80">Grand Total</span>
                        <span className="text-2xl font-bold">₹{bill.totalAmount.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <hr className="border-gray-200 mb-6" />

            <p className="text-center text-gray-500 italic mb-10">Thank you for your business! We appreciate your trust in us.</p>

            <div className="flex justify-center">
                <button
                    className="flex items-center gap-3 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95 print:hidden"
                    onClick={handlePrint}
                >
                    Print Invoice 🖨️
                </button>
            </div>
        </div>
    );
};

export default Invoice;
