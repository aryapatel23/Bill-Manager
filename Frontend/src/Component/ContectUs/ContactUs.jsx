import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign, ArrowLeft, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Professional Contact Page for Makwel Industries.
 * Uses #00963F brand color and Tailwind CSS 4.
 * Clean, simple white-themed business layout.
 */

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! Your inquiry has been sent to Makwel Industries.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-white min-h-screen font-sans text-gray-900 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Navigation & Header */}
        <div className="max-w-3xl mb-16">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00963F] font-bold text-xs uppercase tracking-widest mb-10 transition-colors"
            >
              <ArrowLeft size={14} /> Back to Home
            </Link>
            <div className="flex items-center gap-2 text-[#00963F]">
                <MessageCircle size={20} />
                <span className="text-sm font-black uppercase tracking-[0.2em]">Contact Us</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mt-4 uppercase">
              Get in Touch with <br /><span className="text-[#00963F]">Makwel Industries</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed mt-6">
              Our engineering team is ready to assist you with technical specifications, 
              pricing inquiries, and global shipping options.
            </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16 items-start">
          
          {/* Contact Details (2/5 columns) */}
          <div className="lg:col-span-2 space-y-10">
            <ContactInfoBlock 
                icon={<Phone size={24} />}
                label="Call Support"
                value="+91 2767 282047"
                details="Mon-Sat, 9am to 6pm"
            />
            <ContactInfoBlock 
                icon={<Mail size={24} />}
                label="General Inquiry"
                value="sales@makwel.com"
                details="Response within 24 hours"
            />
            <ContactInfoBlock 
                icon={<MapPin size={24} />}
                label="Visit Factory"
                value="Unjha-Siddhpur Highway, Brahmanwada- 384 215, Gujarat"
                details="Industrial Zone No. 4"
            />
          </div>

          {/* Contact Form (3/5 columns) */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-3xl border border-gray-100 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 uppercase tracking-tight mb-8">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <User size={12} /> Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Smith"
                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00963F]/20 focus:border-[#00963F] transition-all font-medium"
                    />
                    </div>

                    <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                        <AtSign size={12} /> Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00963F]/20 focus:border-[#00963F] transition-all font-medium"
                    />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <MessageSquare size={12} /> Your Inquiry
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your machinery requirements..."
                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00963F]/20 focus:border-[#00963F] transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full md:w-auto px-12 py-5 bg-[#00963F] text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#007a33] transition-all shadow-lg active:scale-[0.98] group"
                >
                  Send Inquiry
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
      
      {/* Footer Bottom */}
      <footer className="mt-24 py-12 border-t border-gray-50 text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[1em]">Makwel Industries • Support Desk</p>
      </footer>
    </div>
  );
};

const ContactInfoBlock = ({ icon, label, value, details }) => (
    <div className="flex items-start gap-6">
        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-[#00963F] border border-gray-100 flex-shrink-0">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{label}</p>
            <p className="text-xl font-bold text-gray-900 tracking-tight">{value}</p>
            <p className="text-xs text-gray-400 font-medium mt-1">{details}</p>
        </div>
    </div>
);

export default ContactUs;
