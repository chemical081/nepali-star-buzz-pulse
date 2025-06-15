
// Contact Us component with social media links and contact information
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const ContactUs = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm" id="contact">
      <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-red-600 pb-2 inline-block">
        Contact Us
      </h2>
      
      <div className="space-y-6">
        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Get in Touch</h3>
          
          <div className="flex items-start space-x-2 p-2 bg-white rounded-lg shadow-sm">
            <Mail className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm">Email</p>
              <p className="text-xs text-gray-600 break-all">contact@newssite.com</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 p-2 bg-white rounded-lg shadow-sm">
            <Phone className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm">Phone</p>
              <p className="text-xs text-gray-600">+977-1-234567</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 p-2 bg-white rounded-lg shadow-sm">
            <MapPin className="w-4 h-4 text-red-600 mt-1 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm">Address</p>
              <p className="text-xs text-gray-600">Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
        
        {/* Social Media Links */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Follow Us</h3>
          
          <div className="space-y-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group w-full"
            >
              <Facebook className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span className="font-medium text-blue-800 group-hover:text-blue-900 text-sm">Facebook</span>
            </a>
            
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors group w-full"
            >
              <Twitter className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span className="font-medium text-sky-800 group-hover:text-sky-900 text-sm">Twitter</span>
            </a>
            
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors group w-full"
            >
              <Instagram className="w-4 h-4 text-pink-600 flex-shrink-0" />
              <span className="font-medium text-pink-800 group-hover:text-pink-900 text-sm">Instagram</span>
            </a>
            
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 p-2 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group w-full"
            >
              <Youtube className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span className="font-medium text-red-800 group-hover:text-red-900 text-sm">YouTube</span>
            </a>
          </div>
          
          {/* Newsletter Signup */}
          <div className="mt-4 p-3 bg-white rounded-lg shadow-sm">
            <h4 className="font-semibold text-gray-800 mb-2 text-sm">Newsletter</h4>
            <p className="text-xs text-gray-600 mb-2">Subscribe for updates</p>
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
              <button className="w-full px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-xs font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
