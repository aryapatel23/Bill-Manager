import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BillDetails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/bills/details/${id}`)
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
    if (!bill) return;
    
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
      <head>
        <title>Bill</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .bill-container { border: 1px solid #ddd; padding: 20px; border-radius: 5px; }
          h2 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <div class="bill-container">
          <h2>Invoice</h2>
          <p><strong>Customer:</strong> ${bill.customerName}</p>
          <p><strong>Date:</strong> ${new Date(bill.date).toLocaleDateString()}</p>
          <p><strong>Address:</strong> ${bill.address.houseNo}, ${bill.address.street}, 
          ${bill.address.city}, ${bill.address.state}</p>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${bill.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.price}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
          <h3>Total: ₹${bill.totalAmount}</h3>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bill Details</h2>
      {loading ? <p>Loading...</p> : bill ? (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p><strong>Customer:</strong> {bill.customerName}</p>
          <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}</p>
          <p><strong>Address:</strong> {bill.address.houseNo}, {bill.address.street}, {bill.address.city}, {bill.address.state}</p>

          <h3 className="mt-4 font-semibold">Items:</h3>
          <ul>
            {bill.items.map((item, index) => (
              <li key={index}>{item.name} (x{item.quantity}) - ₹{item.price}</li>
            ))}
          </ul>

          <h3 className="mt-4 font-semibold">Total: ₹{bill.totalAmount}</h3>

          <button 
            onClick={handlePrint} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Print Bill
          </button>
        </div>
      ) : (
        <p>Bill not found.</p>
      )}
    </div>
  );
};

export default BillDetails;
