// import { useEffect, useState, useRef } from "react";
// import axios from "axios";

// const BillList = () => {
//   const [bills, setBills] = useState([]);
//   const printRef = useRef(null);

//   useEffect(() => {
//     axios.get("http://localhost:5000/bills/all")
//       .then(response => setBills(response.data))
//       .catch(error => console.error("Error fetching bills:", error));
//   }, []);

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Bills</h2>
//       {bills.length === 0 ? (
//         <p>No bills available.</p>
//       ) : (
//         <div ref={printRef} className="bg-white p-4 rounded-lg shadow-lg">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">Customer</th>
//                 <th className="border p-2">Items</th>
//                 <th className="border p-2">Total Amount</th>
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Address</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bills.map(bill => (
//                 <tr key={bill._id} className="border">
//                   <td className="p-2">{bill.customerName}</td>
//                   <td className="p-2">
//                     {bill.items.map(item => (
//                       <p key={item.name}>{item.name} (x{item.quantity})</p>
//                     ))}
//                   </td>
//                   <td className="p-2">₹{bill.totalAmount}</td>
//                   <td className="p-2">{new Date(bill.date).toLocaleDateString()}</td>
//                   <td className="p-2">
//                     {bill.address.houseNo}, {bill.address.street}, {bill.address.city}, {bill.address.state}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button 
//             onClick={handlePrint} 
//             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
//             Print Bill
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BillList;






// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Bill.css"; // Import the CSS file

// const BillList = () => {
//   const [bills, setBills] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // State for filters
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedTaluka, setSelectedTaluka] = useState("");

//   // Sort option state
//   const [sortOrder, setSortOrder] = useState("latest");

//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get("https://backend-for-bill-1.onrender.com/bills/all")
//       .then(response => {
//         setBills(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching bills:", error);
//         setLoading(false);
//       });
//   }, []);

//   // Get unique States, Districts, and Talukas
//   const uniqueStates = [...new Set(bills.map(bill => bill.address.state))];
//   const filteredDistricts = selectedState ? [...new Set(bills.filter(bill => bill.address.state === selectedState).map(bill => bill.address.district))] : [];
//   const filteredTalukas = selectedDistrict ? [...new Set(bills.filter(bill => bill.address.district === selectedDistrict).map(bill => bill.address.taluka))] : [];

//   // Filtered bills based on selection
//   const filteredBills = bills.filter(bill =>
//     (!selectedState || bill.address.state === selectedState) &&
//     (!selectedDistrict || bill.address.district === selectedDistrict) &&
//     (!selectedTaluka || bill.address.taluka === selectedTaluka)
//   );

//   // Sorting logic (Latest or Oldest)
//   const sortedBills = [...filteredBills].sort((a, b) => {
//     return sortOrder === "latest"
//       ? new Date(b.date) - new Date(a.date) // Latest first
//       : new Date(a.date) - new Date(b.date); // Oldest first
//   });

//   return (
//     <div className="bill-container">
//     <h2 className="bill-title">Bills</h2>

//     {/* Filters & Sorting */}
//     <div className="filters-container">
//       <div className="filters">
//         <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); setSelectedTaluka(""); }}>
//           <option value="">Select State</option>
//           {uniqueStates.map(state => (
//             <option key={state} value={state}>{state}</option>
//           ))}
//         </select>

//         <select value={selectedDistrict} onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedTaluka(""); }} disabled={!selectedState}>
//           <option value="">Select District</option>
//           {filteredDistricts.map(district => (
//             <option key={district} value={district}>{district}</option>
//           ))}
//         </select>

//         <select value={selectedTaluka} onChange={(e) => setSelectedTaluka(e.target.value)} disabled={!selectedDistrict}>
//           <option value="">Select Taluka</option>
//           {filteredTalukas.map(taluka => (
//             <option key={taluka} value={taluka}>{taluka}</option>
//           ))}
//         </select>
//       </div>

//       {/* Sort Dropdown (aligned to right) */}
//       <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-dropdown">
//         <option value="latest">Sort by Latest</option>
//         <option value="oldest">Sort by Oldest</option>
//       </select>
//     </div>

//       {loading ? <p className="loading">Loading...</p> : sortedBills.length === 0 ? <p className="no-bills">No bills available.</p> : (
//         <div className="bill-table-container">
//           <table className="bill-table">
//             <thead>
//               <tr className="bill-header">
//                 <th className="bill-th">Customer</th>
//                 <th className="bill-th">Item</th>
//                 <th className="bill-th">Quantity</th>
//                 <th className="bill-th">Total Amount</th>
//                 <th className="bill-th">Date</th>
//                 <th className="bill-th">Address</th>
//                 <th className="bill-th">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedBills.map(bill => (
//                 bill.items.map((item, index) => ( 
//                   <tr key={`${bill._id}-${index}`} className="bill-row">
//                     {index === 0 && (
//                       <td className="bill-td" rowSpan={bill.items.length}>
//                         {bill.customerName}
//                       </td>
//                     )}
//                     <td className="bill-td">{item.name}</td>
//                     <td className="bill-td">{item.quantity}</td>
//                     {index === 0 && (
//                       <>
//                         <td className="bill-td" rowSpan={bill.items.length}>₹{bill.totalAmount}</td>
//                         <td className="bill-td" rowSpan={bill.items.length}>{new Date(bill.date).toLocaleDateString()}</td>
//                         <td className="bill-td" rowSpan={bill.items.length}>
//                           {bill.address.houseNo}, {bill.address.street}, {bill.address.taluka}, {bill.address.district}, {bill.address.state}
//                         </td>
//                         <td className="bill-td action-td" rowSpan={bill.items.length}>
//                           <button 
//                             onClick={() => navigate(`/invoice/${bill._id}`)}
//                             className="print-button">
//                             Print
//                           </button>
//                         </td>
//                       </>
//                     )}
//                   </tr>
//                 ))
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BillList;





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Bill.css"; 

const BillList = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState(""); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  // State for filters
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");

  const navigate = useNavigate();

  // Secure Password (You can store in ENV or backend API)
  const CORRECT_PASSWORD = "avpatel2302";  

  useEffect(() => {
    // Check if user already authenticated
    const storedAuth = localStorage.getItem("bill_access");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      fetchBills();
    }
  }, []);

  const fetchBills = () => {
    axios.get("https://backend-for-bill-1.onrender.com/bills/all")
      .then(response => {
        setBills(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching bills:", error);
        setLoading(false);
      });
  };

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("bill_access", "true"); // Store login state
      fetchBills(); // Load bills after authentication
    } else {
      setError("Incorrect password! Please try again.");
    }
  };

  // Sorting bills (latest or oldest)
  const sortedBills = [...bills].sort((a, b) => {
    return sortOrder === "latest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(b.date) - new Date(a.date);
  });

  // Get unique States, Districts, and Talukas
  const uniqueStates = [...new Set(bills.map(bill => bill.address.state))];
  const filteredDistricts = selectedState ? [...new Set(bills.filter(bill => bill.address.state === selectedState).map(bill => bill.address.district))] : [];
  const filteredTalukas = selectedDistrict ? [...new Set(bills.filter(bill => bill.address.district === selectedDistrict).map(bill => bill.address.taluka))] : [];

  // Filtered bills based on selection
  const filteredBills = sortedBills.filter(bill =>
    (!selectedState || bill.address.state === selectedState) &&
    (!selectedDistrict || bill.address.district === selectedDistrict) &&
    (!selectedTaluka || bill.address.taluka === selectedTaluka)
  );

  return (
    <div className="bill-container">
      {!isAuthenticated ? (
        <div className="password-container">
          <h2>Enter Password to Access Bills</h2>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            className="password-input"
            placeholder="Enter Password"
          />
          <button onClick={handleLogin} className="submit-button">Submit</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      ) : (
        <>
          <h2 className="bill-title">Bills</h2>

          {/* Sorting & Filters */}
          <div className="filters-container">
            <div className="filters">
              <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(""); setSelectedTaluka(""); }}>
                <option value="">Select State</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>

              <select value={selectedDistrict} onChange={(e) => { setSelectedDistrict(e.target.value); setSelectedTaluka(""); }} disabled={!selectedState}>
                <option value="">Select District</option>
                {filteredDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>

              <select value={selectedTaluka} onChange={(e) => setSelectedTaluka(e.target.value)} disabled={!selectedDistrict}>
                <option value="">Select Taluka</option>
                {filteredTalukas.map(taluka => (
                  <option key={taluka} value={taluka}>{taluka}</option>
                ))}
              </select>
            </div>

            {/* Sorting Option */}
            <div className="sort-container">
              <label>Sort By:</label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {loading ? <p className="loading">Loading...</p> : filteredBills.length === 0 ? <p className="no-bills">No bills available.</p> : (
            <div className="bill-table-container">
              <table className="bill-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Total Amount</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map(bill => (
                    bill.items.map((item, index) => ( 
                      <tr key={`${bill._id}-${index}`}>
                        {index === 0 && (
                          <td rowSpan={bill.items.length}>{bill.customerName}</td>
                        )}
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        {index === 0 && (
                          <>
                            <td rowSpan={bill.items.length}>₹{bill.totalAmount}</td>
                            <td rowSpan={bill.items.length}>{new Date(bill.date).toLocaleDateString()}</td>
                            <td rowSpan={bill.items.length}>
                              {bill.address.houseNo}, {bill.address.street}, {bill.address.taluka}, {bill.address.district}, {bill.address.state}
                            </td>
                            <td rowSpan={bill.items.length}>
                              <button className="print-button" onClick={() => navigate(`/invoice/${bill._id}`)}>Print</button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BillList;

