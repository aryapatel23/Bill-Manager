import { Link } from "react-router-dom";
import { ChevronRight, Tractor, ArrowLeft, Package, Star } from "lucide-react";

/**
 * Professional Product Browser for Makwel Industries.
 * Uses #00963F brand color and Tailwind CSS 4.
 * Clean, simple white-themed business catalog.
 */

const products = [
  {
    id: 1,
    name: "Maize/Corn Thresher",
    route: "/browseproducts/maize-corn-thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro5.jpg",
    description: "High-performance maize thresher designed for durability and maximum output efficiency.",
    category: "Thresher"
  },
  {
    id: 2,
    name: "Samrat Castor Thresher",
    route: "/browseproducts/samrat-castor-thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro4.jpg",
    description: "Engineered specifically for castor crops to ensure clean separation and high yield.",
    category: "Thresher"
  },
  {
    id: 3,
    name: "Samrat Multi Grain Thresher",
    route: "/browseproducts/samrat-multi-grain-thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro2.jpg",
    description: "Versatile solution for various grains, providing farmers with a multi-purpose harvesting tool.",
    category: "Multi-Grain"
  },
  {
    id: 4,
    name: "Samrat Grain Thresher",
    route: "/browseproducts/samrat-grain-thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro1.jpg",
    description: "Reliable grain processing with adjustable settings for different crop requirements.",
    category: "Standard"
  },
  {
    id: 5,
    name: "Samrat Ground Nut Digger",
    route: "/browseproducts/samrat-ground-nut-digger",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro6.jpg",
    description: "Precision digging equipment designed to minimize damage to groundnut crops.",
    category: "Harvesting"
  },
];

const BrowseProducts = () => {
  return (
    <div className="bg-white min-h-screen py-16 lg:py-24 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Breadcrumb / Navigation */}
        <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00963F] font-bold text-xs uppercase tracking-widest transition-colors mb-6"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="flex items-center gap-2 text-[#00963F]">
                <Package size={20} />
                <span className="text-sm font-black uppercase tracking-[0.2em]">Equipment Catalog</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mt-4">Our Products</h1>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              to={product.route} 
              key={product.id} 
              className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden"
            >
              <div className="h-60 relative overflow-hidden bg-gray-50 border-b border-gray-50">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 py-1 bg-gray-50 rounded border border-gray-100">
                    {product.category}
                  </span>
                  <div className="flex text-[#00963F]">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-4 uppercase group-hover:text-[#00963F] transition-colors">
                    {product.name}
                </h3>
                
                <p className="text-gray-500 font-medium leading-relaxed line-clamp-2 mb-8">
                    {product.description}
                </p>
                
                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <span className="text-xs font-bold text-[#00963F] uppercase tracking-widest">Model Specifications</span>
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#00963F] group-hover:text-white transition-all transform group-hover:translate-x-1">
                        <ChevronRight size={18} />
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- Why Makwel? Banner --- */}
        <div className="mt-24 p-12 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
                <h4 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">Can't find what you're looking for?</h4>
                <p className="text-gray-500 font-medium">Contact our heavy machinery experts for custom solutions and technical inquiries.</p>
            </div>
            <Link 
                to="/contactus"
                className="px-10 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg active:scale-95 whitespace-nowrap"
            >
                Contact Our Team
            </Link>
        </div>
      </div>

      {/* Footer Signature */}
      <footer className="mt-24 py-12 border-t border-gray-50 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em]">Makwel Industries • Catalog 2024</p>
      </footer>
    </div>
  );
};

export default BrowseProducts;
