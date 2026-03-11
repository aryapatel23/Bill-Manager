import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Invoice = () => {
    const { billId } = useParams();
    const [bill, setBill] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/bills/${billId}`)
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

    if (loading) return <div className="p-10 text-center font-sans">Loading invoice...</div>;
    if (!bill) return <div className="p-10 text-center font-sans">Invoice not found.</div>;

    return (
        <div className="bg-white min-h-screen font-sans text-black">
            {/* Control Bar - Hidden on Print */}
            <div className="max-w-[800px] mx-auto p-4 flex justify-between print:hidden">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                    Back
                </button>
                <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors"
                >
                    Print
                </button>
            </div>

            {/* Print Area */}
            <div className="max-w-[800px] mx-auto p-10 print:p-0">
                {/* Header Row */}
                <div className="flex justify-between items-start mb-10">
                    <div className="w-[180px]">
                        <img
                            src="https://res.cloudinary.com/dzsvjyg2c/image/upload/v1741258133/amxh4fnusn45rdqzqlco.png"
                            alt="Logo"
                            className="w-full h-auto"
                        />
                    </div>
                    <div className="text-right text-[12px] leading-tight">
                        <p className="font-bold">Samrat Thresher Private Lim.</p>
                        <p>Unjha-Siddhpur Highway</p>
                        <p>Brahmanwada- 384 215</p>
                        <p>Ta. Unjha, Dist. Mehsana, Gujarat,</p>
                        <p>Phone: +91(02767) 282047, 282483</p>
                    </div>
                </div>

                {/* Title */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-bold border-b border-black inline-pb-1">Invoice</h2>
                </div>

                {/* Customer Section */}
                <div className="mb-10 text-[14px] space-y-1">
                    <p><span className="font-bold">Customer:</span> {bill.customerName}</p>
                    <p><span className="font-bold">Date:</span> {new Date(bill.date).toLocaleDateString()}</p>
                    <p><span className="font-bold">Address:</span> {bill.address.houseNo}, {bill.address.street}, {bill.address.city}, {bill.address.state}</p>
                </div>

                {/* Items Table */}
                <table className="w-full border-collapse border border-gray-300 mb-6 text-[14px]">
                    <thead>
                        <tr className="bg-gray-50 uppercase text-[12px]">
                            <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                            <th className="border border-gray-300 px-4 py-2 text-center w-[80px]">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2 text-right w-[120px]">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bill.items.map((item, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{item.price.toLocaleString()}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="2" className="border border-gray-300 px-4 py-2 text-right font-bold">Total:</td>
                            <td className="border border-gray-300 px-4 py-2 text-right font-bold">₹{bill.totalAmount.toLocaleString()}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer */}
                <div className="text-center mt-12">
                    <p className="text-[12px] italic">Thank you for your business!</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
