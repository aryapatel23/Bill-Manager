import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome To <span className="brand-name">Makwel</span></h1>
          <p className="hero-description">
            Makwel Industries is India's leading tractor-driven thresher manufacturer.
            These threshers are built with the latest technology to ensure quality and efficiency.
          </p>
          <button className="hero-btn" onClick={() => navigate("/browseproducts")}>Browse To View Product</button>
        </div>
        <div className="hero-image">
          <img src="https://www.makwelindustries.com/wp-content/themes/responsive/images/featured-image.png" alt="Thresher Machine" className="hero-img" />
        </div>
      </section>

      {/* About Us Section */}
      <section className="about">
        <h2 className="section-title">About Us</h2>
        <p className="about-text">
          We are pioneers in agricultural machinery, providing top-quality threshers and farming equipment
          across India. With years of experience, our products stand for durability and efficiency.
        </p>
      </section>

      {/* Our Products Section */}
      <section className="products">
        <h2 className="section-title">Our Products</h2>
        <div className="product-grid">
          <div className="product-card">
            <img src="https://www.makwelindustries.com/wp-content/uploads/2013/04/pro5.jpg" alt="Maize/Corn Thresher" className="product-img" />
            <h3 className="product-name">Maize/Corn Thresher</h3>
          </div>
          <div className="product-card">
            <img src="https://www.makwelindustries.com/wp-content/uploads/2013/04/pro4.jpg" alt="Samrat Castor Thresher" className="product-img" />
            <h3 className="product-name">Samrat Castor Thresher</h3>
          </div>
          <div className="product-card">
            <img src="https://www.makwelindustries.com/wp-content/uploads/2013/04/pro2.jpg" alt="Samrat Multi Grain Thresher" className="product-img" />
            <h3 className="product-name">Samrat Multi Grain Thresher</h3>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features">
          <div className="feature">
            <h3>🔧 High Quality</h3>
            <p>Our products are made from premium materials for long-lasting durability.</p>
          </div>
          <div className="feature">
            <h3>🚜 Advanced Technology</h3>
            <p>We use the latest engineering innovations to optimize performance.</p>
          </div>
          <div className="feature">
            <h3>💼 Trusted By Farmers</h3>
            <p>Thousands of farmers rely on our machinery for their agricultural needs.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact">
        <h2 className="section-title">Get In Touch</h2>
        <p>Email: support@makwel.com | Phone: +91 98765 43210</p>
        <button className="contact-btn">Contact Us</button>
      </section>
    </div>
  );
};

export default Home;
