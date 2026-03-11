import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaPrint } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Plus, LogOut, Key, ShieldCheck, Filter, ChevronDown, Trash2, Printer } from "lucide-react";

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const [logoutTimer, setLogoutTimer] = useState(null);

  // State for filters
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");

  const navigate = useNavigate();

  // Secure Password
  const CORRECT_PASSWORD = "avpatel2302";
  const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes

  useEffect(() => {
    const storedAuth = localStorage.getItem("bill_access");
    const loginTime = localStorage.getItem("login_time");

    if (storedAuth === "true" && loginTime) {
      const parsedLoginTime = parseInt(loginTime, 10);
      if (!isNaN(parsedLoginTime)) {
        const elapsedTime = Date.now() - parsedLoginTime;
        if (elapsedTime < AUTO_LOGOUT_TIME) {
          setIsAuthenticated(true);
          fetchBills();
          startAutoLogout(AUTO_LOGOUT_TIME - elapsedTime);
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    }
  }, []);

  const fetchBills = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/bills/all");
      setBills(response.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (billId) => {
    if (!window.confirm("Are you sure you want to delete this bill?")) return;
    try {
      await axios.delete(`http://localhost:5000/bills/${billId}`);
      setBills(bills.filter(bill => bill._id !== billId));
    } catch (error) {
      console.error("Error deleting bill:", error);
    }
  };

  const handleLogin = () => {
    if (password.trim() === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("bill_access", "true");
      localStorage.setItem("login_time", Date.now().toString());
      setError("");
      fetchBills();
      startAutoLogout(AUTO_LOGOUT_TIME);
    } else {
      setError("Incorrect password! Please try again.");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("bill_access");
    localStorage.removeItem("login_time");
    setBills([]);
    setPassword("");
    if (logoutTimer) clearTimeout(logoutTimer);
  };

  const startAutoLogout = (time) => {
    if (logoutTimer) clearTimeout(logoutTimer);
    const timer = setTimeout(() => {
      alert("Session expired! Logging out...");
      handleLogout();
    }, time);
    setLogoutTimer(timer);
  };

  const sortedBills = [...bills].sort((a, b) => {
    return sortOrder === "latest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date);
  });

  const uniqueStates = [...new Set(bills.map(bill => bill.address.state))];
  const filteredDistricts = selectedState ? [...new Set(bills.filter(bill => bill.address.state === selectedState).map(bill => bill.address.district))] : [];
  const filteredTalukas = selectedDistrict ? [...new Set(bills.filter(bill => bill.address.district === selectedDistrict).map(bill => bill.address.taluka))] : [];

  const filteredBills = sortedBills.filter(bill =>
    (!selectedState || bill.address.state === selectedState) &&
    (!selectedDistrict || bill.address.district === selectedDistrict) &&
    (!selectedTaluka || bill.address.taluka === selectedTaluka)
  );

  const selectClasses = "w-full md:w-auto p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-sm outline-none transition-all";

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-2xl rounded-2xl border border-gray-100 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-50 rounded-full">
              <ShieldCheck size={48} className="text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Authenticated Access</h2>
          <p className="text-center text-gray-500 text-sm mb-8">Please enter the security password to view bills</p>

          <div className="space-y-4">
            <div className="relative">
              <Key size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Security Password"
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
            >
              Unlock Bills
            </button>
            {error && (
              <p className="text-center text-red-500 text-sm font-medium animate-pulse">{error}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bill Management</h2>
              <p className="text-gray-500 text-sm mt-1">Manage and track your customer invoices</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link
                to="/billform"
                style={{ backgroundColor: '#00963F' }}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 hover:opacity-90 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all active:scale-95"
              >
                <Plus size={20} /> Add New Bill
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-bold px-6 py-3 rounded-xl transition-all border border-transparent hover:border-red-200"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
              <Filter size={18} />
              <span>Filters & Sorting</span>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <select className={selectClasses} value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); setSelectedTaluka(""); }}>
                  <option value="">All States</option>
                  {uniqueStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>

                <select className={selectClasses} value={selectedDistrict} onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedTaluka(""); }} disabled={!selectedState}>
                  <option value="">All Districts</option>
                  {filteredDistricts.map(district => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>

                <select className={selectClasses} value={selectedTaluka} onChange={(e) => setSelectedTaluka(e.target.value)} disabled={!selectedDistrict}>
                  <option value="">All Talukas</option>
                  {filteredTalukas.map(taluka => (
                    <option key={taluka} value={taluka}>{taluka}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                <span className="text-sm font-medium text-gray-500">Sort:</span>
                <select className={selectClasses} value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">Fetching secure data...</p>
            </div>
          ) : filteredBills.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                <Filter size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">No bills found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or create a new bill</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Items</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Total</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Address</th>
                      <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredBills.map(bill => (
                      <tr key={bill._id} className="hover:bg-gray-50 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{bill.customerName}</div>
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <div className="space-y-1">
                            {bill.items.map((item, i) => (
                              <div key={i} className="text-sm text-gray-600 flex justify-between gap-4">
                                <span>{item.name}</span>
                                <span className="font-mono text-gray-400">x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-lg font-bold text-gray-900">₹{bill.totalAmount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">{new Date(bill.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-500 truncate max-w-[200px]" title={`${bill.address.houseNo}, ${bill.address.street}, ${bill.address.taluka}, ${bill.address.district}, ${bill.address.state}`}>
                            {bill.address.city}, {bill.address.state}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all"
                              onClick={() => navigate(`/invoice/${bill._id}`)}
                              title="Print Invoice"
                            >
                              <Printer size={18} />
                            </button>
                            <button
                              className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-all"
                              onClick={() => handleDelete(bill._id)}
                              title="Delete Bill"
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BillList;

