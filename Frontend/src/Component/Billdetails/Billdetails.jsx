import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Billdetails.css"; // Import the CSS file

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

    if (loading) return <p>Loading invoice...</p>;
    if (!bill) return <p>Invoice not found.</p>;

    return (
        <div className="invoice-container">
            <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>

            <div className="header">
                <img src="https://res.cloudinary.com/dzsvjyg2c/image/upload/v1741258133/amxh4fnusn45rdqzqlco.png" 
                     alt="Company Logo" className="logo" />
                <p className="company-info">
                    Your Company Name <br />
                    Unjha-Siddhpur Highway <br />
                    Brahmanwada- 384 215 <br />
                    Ta. Unjha, Dist. Mehsana, Gujarat,<br />
                    Phone: +91(02767) 282047, 282483
                </p>
            </div>
            <hr />
            <h2 className="title">Invoice</h2>
            <div className="details">
                <p><strong>Customer:</strong> {bill.customerName}</p>
                <p><strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}</p>
                <p><strong>Address:</strong> {bill.address.houseNo}, {bill.address.street}, {bill.address.city}, {bill.address.state}</p>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {bill.items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 className="total">Total: ₹{bill.totalAmount}</h3>
            <hr />
            <p className="footer">Thank you for your business!</p>

            <button className="print-button" onClick={handlePrint}>
                Print Invoice 🖨️
            </button>
        </div>
    );
};

export default Invoice;
