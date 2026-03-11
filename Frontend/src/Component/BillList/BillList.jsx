import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Printer, ArrowLeft } from "lucide-react";

const BillDetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/bills/${id}`)
      .then(response => {
        setBill(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching bill details:", error);
        setLoading(false);
      });
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium transition-colors"
        >
          <ArrowLeft size={20} /> Back to List
        </button>

        {loading ? (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500 font-medium">Loading bill details...</p>
          </div>
        ) : bill ? (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
                <div>
                  <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Invoice Details</h2>
                  <div className="inline-flex items-center px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest">
                    Bill ID: {id.slice(-8)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Date of Issue</p>
                  <p className="text-xl font-bold text-gray-800">{new Date(bill.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-4">
                  <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Customer Information</h3>
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-2xl font-bold text-gray-900">{bill.customerName}</p>
                    <p className="text-gray-600 mt-3 leading-relaxed">
                      {bill.address.houseNo}, {bill.address.street},<br />
                      {bill.address.city}, {bill.address.state}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-12">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Itemized Billing</h3>
                <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                  <table className="w-full text-left">
                    <thead className="bg-gray-900 text-white">
                      <tr>
                        <th className="px-6 py-4 font-bold text-xs uppercase">Description</th>
                        <th className="px-6 py-4 font-bold text-xs uppercase text-center">Qty</th>
                        <th className="px-6 py-4 font-bold text-xs uppercase text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {bill.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-5">
                            <p className="font-bold text-gray-800">{item.name}</p>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-600 font-bold">{item.quantity}</span>
                          </td>
                          <td className="px-6 py-5 text-right font-black text-gray-900">₹{item.price.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8 border-t border-gray-100">
                <div className="text-gray-400 text-sm italic">
                  * All amounts are in Indian Rupees (₹)
                </div>
                <div className="w-full md:w-auto p-8 bg-gray-900 text-white rounded-2xl shadow-xl flex items-center justify-between gap-12">
                  <span className="text-sm font-bold opacity-60 uppercase tracking-[0.3em]">Total Amount</span>
                  <span className="text-4xl font-black">₹{bill.totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-3 px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-2xl hover:shadow-blue-500/40 transition-all active:scale-95 print:hidden"
                >
                  <Printer size={24} /> PRINT INVOICE
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100 text-center">
            <p className="text-red-500 font-bold text-xl">Bill not found.</p>
            <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 hover:underline">Return to list</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BillDetails;
