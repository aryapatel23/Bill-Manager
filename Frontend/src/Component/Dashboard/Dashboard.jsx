import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { TrendingUp, Users, FileText, IndianRupee, Loader2 } from "lucide-react";

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Dashboard = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get("http://localhost:5000/bills/all");
                setBills(response.data);
            } catch (error) {
                console.error("Error fetching bills for dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBills();
    }, []);

    const stats = useMemo(() => {
        const totalRevenue = bills.reduce((sum, bill) => sum + bill.totalAmount, 0);
        const totalBills = bills.length;
        const avgBillValue = totalBills > 0 ? totalRevenue / totalBills : 0;
        const uniqueCustomers = new Set(bills.map(b => b.customerName)).size;

        return { totalRevenue, totalBills, avgBillValue, uniqueCustomers };
    }, [bills]);

    const chartData = useMemo(() => {
        // Process revenue by month
        const monthlyData = {};
        const productDataMap = {};

        bills.forEach(bill => {
            const date = new Date(bill.date);
            const monthYear = date.toLocaleString('default', { month: 'short', year: '2-digit' });

            monthlyData[monthYear] = (monthlyData[monthYear] || 0) + bill.totalAmount;

            bill.items.forEach(item => {
                productDataMap[item.name] = (productDataMap[item.name] || 0) + item.quantity;
            });
        });

        const revenueByMonth = Object.entries(monthlyData).map(([name, revenue]) => ({ name, revenue }));
        const productDistribution = Object.entries(productDataMap)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value)
            .slice(0, 6);

        return { revenueByMonth, productDistribution };
    }, [bills]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Loader2 size={48} className="text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500 font-bold animate-pulse">Analyzing business data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center md:text-left">
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Business Analytics</h2>
                    <p className="text-gray-500 font-medium mt-2">Real-time performance metrics and sales trends</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Revenue"
                        value={`₹${stats.totalRevenue.toLocaleString()}`}
                        icon={<IndianRupee className="text-[#00963F]" />}
                        bgColor="bg-emerald-50"
                    />
                    <StatCard
                        title="Total Invoices"
                        value={stats.totalBills}
                        icon={<FileText className="text-blue-600" />}
                        bgColor="bg-blue-50"
                    />
                    <StatCard
                        title="Average Bill"
                        value={`₹${Math.round(stats.avgBillValue).toLocaleString()}`}
                        icon={<TrendingUp className="text-purple-600" />}
                        bgColor="bg-purple-50"
                    />
                    <StatCard
                        title="Total Customers"
                        value={stats.uniqueCustomers}
                        icon={<Users className="text-orange-600" />}
                        bgColor="bg-orange-50"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Revenue Trend */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <TrendingUp size={20} className="text-blue-500" /> Revenue Growth
                        </h3>
                        <div className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData.revenueByMonth}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00963F" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#00963F" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#00963F" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Product Distribution */}
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <FileText size={20} className="text-orange-500" /> Top Selling Items
                        </h3>
                        <div className="h-[350px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData.productDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.productDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, bgColor }) => (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 transition-all hover:shadow-md">
        <div className={`p-4 ${bgColor} rounded-2xl`}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{title}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
        </div>
    </div>
);

export default Dashboard;
