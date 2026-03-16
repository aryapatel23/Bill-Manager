import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Tractor, 
  ChevronRight, 
  Settings, 
  Users, 
  Mail, 
  Phone, 
  ArrowRight,
  ShieldCheck,
  Award
} from "lucide-react";

/**
 * Professional Home Page for Makwel Industries.
 * Built with original structure + Tailwind CSS 4.
 * Brand Color: #00963F
 */

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white min-h-screen text-gray-900 font-sans">
            
            {/* --- Hero Section --- */}
            <section className="relative px-6 py-16 lg:py-24 max-w-7xl mx-auto">
                <div className="lg:flex lg:items-center lg:justify-between gap-12">
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 leading-tight">
                            Welcome To <span className="text-[#00963F]">Makwel</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                            Makwel Industries is India's leading tractor-driven thresher manufacturer. 
                            These threshers are built with the latest technology to ensure quality and efficiency for every farm.
                        </p>
                        <div className="pt-4">
                            <button 
                                onClick={() => navigate("/browseproducts")}
                                className="px-8 py-4 bg-[#00963F] text-white font-bold rounded-lg shadow-lg hover:bg-[#007a33] transition-all flex items-center gap-2 group"
                            >
                                Browse To View Product 
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                    <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 p-2 bg-gray-50">
                            <img 
                                src="https://www.makwelindustries.com/wp-content/themes/responsive/images/featured-image.png" 
                                alt="Thresher Machine" 
                                className="w-full h-auto rounded-xl" 
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- About Us Section --- */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center justify-center gap-3">
                        <Award className="text-[#00963F]" /> About Us
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We are pioneers in agricultural machinery, providing top-quality threshers and farming equipment
                        across India. With years of experience, our products stand for durability and efficiency, 
                        designed to meet the rigorous demands of the modern agricultural industry.
                    </p>
                </div>
            </section>

            {/* --- Our Products Section --- */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12 uppercase tracking-tight">Our Products</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { name: "Maize/Corn Thresher", img: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro5.jpg" },
                        { name: "Samrat Castor Thresher", img: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro4.jpg" },
                        { name: "Samrat Multi Grain Thresher", img: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro2.jpg" }
                    ].map((product, idx) => (
                        <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all p-4 group cursor-pointer">
                            <div className="overflow-hidden rounded-lg mb-4 h-56">
                                <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#00963F] transition-colors uppercase tracking-tight">{product.name}</h3>
                            <div className="mt-4 flex justify-between items-center text-[#00963F] opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-bold uppercase tracking-widest">View Details</span>
                                <ChevronRight size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Why Choose Us Section --- */}
            <section className="bg-white py-20 px-6 border-y border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-12 uppercase tracking-tight">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-[#00963F]/10 rounded-2xl flex items-center justify-center text-[#00963F]">
                                <Settings size={32} />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900">High Quality</h3>
                            <p className="text-gray-500 max-w-xs">Our products are made from premium materials for long-lasting durability in the field.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-[#00963F]/10 rounded-2xl flex items-center justify-center text-[#00963F]">
                                <Tractor size={32} />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900">Advanced Technology</h3>
                            <p className="text-gray-500 max-w-xs">We use the latest engineering innovations to optimize performance and harvest quality.</p>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-[#00963F]/10 rounded-2xl flex items-center justify-center text-[#00963F]">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold uppercase tracking-tight text-gray-900">Trusted By Farmers</h3>
                            <p className="text-gray-500 max-w-xs">Thousands of farmers across India rely on our machinery for their essential agricultural needs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Contact Section --- */}
            <section className="bg-gray-100 py-20 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 uppercase tracking-tight">Get In Touch</h2>
                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-gray-600 font-medium tracking-tight">
                        <div className="flex items-center gap-2">
                           <Mail className="text-[#00963F]" size={20} />
                           <span>support@makwel.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Phone className="text-[#00963F]" size={20} />
                           <span>+91 98765 43210</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate("/contactus")}
                        className="px-10 py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all shadow-lg active:scale-95"
                    >
                        Contact Us Now
                    </button>
                    <p className="pt-10 text-[10px] uppercase font-black tracking-[0.5em] text-gray-400">
                        Makwel Industries • Since 1996
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
