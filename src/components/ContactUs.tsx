
// Contact Us component with social media links and contact information
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const ContactUs = () => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm" id="contact">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-3 border-red-600 pb-2 inline-block">
        Contact Us
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Get in Touch</h3>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
            <Mail className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium text-gray-900">Email</p>
              <p className="text-sm text-gray-600">contact@newssite.com</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
            <Phone className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium text-gray-900">Phone</p>
              <p className="text-sm text-gray-600">+977-1-234567</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
            <MapPin className="w-5 h-5 text-red-600" />
            <div>
              <p className="font-medium text-gray-900">Address</p>
              <p className="text-sm text-gray-600">Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800 group-hover:text-blue-900">Facebook</span>
            </a>
            
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors group"
            >
              <Twitter className="w-5 h-5 text-sky-600" />
              <span className="font-medium text-sky-800 group-hover:text-sky-900">Twitter</span>
            </a>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group"
            >
              <Instagram className="w-5 h-5 text-pink-600" />
              <span className="font-medium text-pink-800 group-hover:text-pink-900">Instagram</span>
            </a>
            
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
            >
              <Youtube className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-800 group-hover:text-red-900">YouTube</span>
            </a>
          </div>
          
          {/* Newsletter Signup */}
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-3">Subscribe for latest updates</p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
              />
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
