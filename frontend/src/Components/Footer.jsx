import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mt-[20vh] font-poppins">
      {/* Full-Height Newsletter Section */}
      <section className="h-50 mt-10  flex items-center justify-center px-4">
        <div className="text-center max-w-xl w-full  font-cursive">
          <h2 className="text-3xl md:text-4xl  font-semibold text-[#704d29] mb-4">
            Join the PRANEIZ Circle
          </h2>
          <p className="text-gray-700 mb-6 text-2xl">
            Be the first to access exclusive collections, fashion tips, and
            limited offers.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-80 px-4 py-2 text-xl border border-gray-300 rounded-md focus:outline-none focus:border-[#704d29]"
            />
            <button
              type="submit"
              className="bg-[#704d29] text-xl text-white px-6 py-2 rounded-md hover:bg-[#5e3e21] transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white text-black py-12 px-6 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img src={assets.logo} alt="PRANEIZ" className="w-28 mb-4" />
            <p className="text-sm text-gray-700">
              Curated luxury. Contemporary design. A wardrobe beyond trends.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-md font-semibold text-[#704d29] mb-3">
              Explore
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#" className="hover:text-[#704d29]">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#704d29]">
                  Men
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#704d29]">
                  Women
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#704d29]">
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-md font-semibold text-[#704d29] mb-3">
              Support
            </h4>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <a href="#" className="hover:text-[#704d29]">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#704d29]">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#704d29]">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#704d29]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-md font-semibold text-[#704d29] mb-3">
              Contact
            </h4>
            <p className="text-sm text-gray-700">Email: support@praneiz.com</p>
            <p className="text-sm text-gray-700">Phone: +1 (800) 123-4567</p>
            <p className="text-sm text-gray-700 mt-2">Follow us:</p>
            <div className="flex space-x-3 mt-2">
              <a href="#" className="hover:text-[#704d29]">
                Instagram
              </a>
              <a href="#" className="hover:text-[#704d29]">
                Facebook
              </a>
              <a href="#" className="hover:text-[#704d29]">
                Pinterest
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} PRANEIZ. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
