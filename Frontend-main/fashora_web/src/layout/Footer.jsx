
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#744f28] text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        {/* Fashora Description */}
        <div>
          <h3 className="font-semibold mb-2 text-lg">Fashora</h3>
          <p>
            Your one-stop destination for timeless girls' fashion. Trendy, chic,
            and always affordable.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2 text-lg">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Tops
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Dresses
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Knitwear
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2 text-lg">Contact</h3>
          <p>Email: support@fashora.com</p>
          <p>Phone: +977 9800000000</p>
          <p>Location: Kathmandu, Nepal</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center text-xs mt-2 border-t border-white/30 pt-4">
        &copy; {new Date().getFullYear()} Fashora. All rights reserved.
      </div>
    </footer>
  );
}
