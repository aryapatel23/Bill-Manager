// import { useState } from "react";
// import "./BrowseProducts.css";

// const products = [
//   { id: 1, name: "Maize/Corn Thresher", category: "Thresher", image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro5.jpg", description: "A powerful and efficient maize/corn thresher designed for maximum productivity." },
//   { id: 2, name: "Samrat Castor Thresher", category: "Thresher", image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro4.jpg", description: "Specially designed for castor crops, ensuring minimal seed breakage." },
//   { id: 3, name: "Samrat Multi Grain Thresher", category: "Thresher", image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro2.jpg", description: "Versatile multi-grain thresher for different types of grains." },
//   { id: 4, name: "Samrat Grain Thresher", category: "Thresher", image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro1.jpg", description: "Efficient grain thresher with adjustable settings for various grains." },
//   { id: 5, name: "Samrat Ground Nut Digger", category: "Ground Nut Digger", image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro6.jpg", description: "Ground nut digger designed to reduce damage and maximize yield." },
// ];

// const BrowseProducts = () => {
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   return (
//     <div className="browse-container">
//       {/* All Products Grid at the Top */}
//       <section className="product-grid-section">
//         <h2 className="section-title">Our Products</h2>
//         <div className="product-grid">
//           {products.map((product) => (
//             <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product.id)}>
//               <img src={product.image} alt={product.name} className="product-image" />
//               <p className="product-name">{product.name}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Detailed Product Sections */}
//       {products.map((product) => (
//         <section key={product.id} className={`product-detail ${selectedProduct === product.id ? "active" : ""}`}>
//           <h3 className="product-title">{product.name}</h3>
//           <div className="product-content">
//             <img src={product.image} alt={product.name} className="detail-image" />
//             <p className="product-description">{product.description}</p>
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default BrowseProducts;

import { Link } from "react-router-dom";
import "./BrowseProducts.css";

const products = [
  {
    id: 1,
    name: "Maize/Corn Thresher",
    route: "/browseproducts/maize-corn-thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro5.jpg",
    description: "A powerful and efficient maize/corn thresher designed for maximum productivity.",
  },
  {
    id: 2,
    name: "Samrat Castor Thresher",
    route: "/browseproducts/samrat-castor-thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro4.jpg",
    description: "Specially designed for castor crops, ensuring minimal seed breakage.",
  },
  {
    id: 3,
    name: "Samrat Multi Grain Thresher",
    route: "/browseproducts/samrat-multi-grain-thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro2.jpg",
    description: "Versatile multi-grain thresher for different types of grains.",
  },
  {
    id: 4,
    name: "Samrat Grain Thresher",
    route: "/browseproducts/samrat-grain-thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro1.jpg",
    description: "Efficient grain thresher with adjustable settings for various grains.",
  },
  {
    id: 5,
    name: "Samrat Ground Nut Digger",
    route: "/browseproducts/samrat-ground-nut-digger",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro6.jpg",
    description: "Ground nut digger designed to reduce damage and maximize yield.",
  },
];

const BrowseProducts = () => {
  return (
    <div className="browse-container">
      <section className="product-grid-section">
        <h2 className="section-title">Our Products</h2>
        <div className="product-grid">
          {products.map((product) => (
            <Link to={product.route} key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <p className="product-name">{product.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BrowseProducts;
