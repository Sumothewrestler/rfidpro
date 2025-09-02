'use client';

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState<number>(0);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1
  });

  const addToCart = () => {
    setCart(cart + 1);
    setShowCheckout(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderDetails = `Order Details:
Product: RFID Attendance System (GSM Module)
Product ID: RF5228Q
Price: ₹11,999 x ${customerInfo.quantity} = ₹${(11999 * customerInfo.quantity).toLocaleString()}

Customer Details:
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}`;
    
    // Create SMS link
    const smsMessage = encodeURIComponent(orderDetails);
    window.open(`sms:9361992255?body=${smsMessage}`, '_blank');
    
    // Also create email as backup
    const emailSubject = encodeURIComponent('RFID System Order - RFIDpro');
    const emailBody = encodeURIComponent(orderDetails);
    
    setTimeout(() => {
      const useEmail = confirm('SMS opened. Would you also like to send via email as backup?');
      if (useEmail) {
        window.open(`mailto:orders@rfidpro.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
      }
    }, 1000);
    
    alert('Order details prepared for SMS! We will contact you within 24 hours to confirm.');
    setShowCheckout(false);
    setCart(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="RFIDpro Logo"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <h1 className="text-2xl font-bold text-orange-600">RFIDpro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-orange-600 font-semibold">📞 9361992255</span>
              <div className="relative">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                  Cart ({cart})
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Advanced RFID Solutions for Indian Schools
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Professional RFID Attendance & GSM Tracking Systems designed for school buses and Indian educational institutions
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={addToCart}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg"
                >
                  Order Now - ₹11,999
                </button>
                <a
                  href="tel:9361992255"
                  className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors text-center"
                >
                  Call Us
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Image
                src="/rfid_1.jpg"
                alt="RFID Reader Device"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our RFID Solutions
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Image
                src="/rfid_1.jpg"
                alt="Advanced RFID Reader"
                width={300}
                height={200}
                className="rounded-lg shadow-md mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Advanced RFID Reader</h4>
              <p className="text-gray-600">High-performance reader for all applications</p>
            </div>
            <div className="text-center">
              <Image
                src="/rfid_2.jpg"
                alt="Low & High Frequency Reader"
                width={300}
                height={200}
                className="rounded-lg shadow-md mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Dual Frequency Reader</h4>
              <p className="text-gray-600">Support for both low and high frequency RFID</p>
            </div>
            <div className="text-center">
              <Image
                src="/rfid_3.png"
                alt="Transit RFID System"
                width={300}
                height={200}
                className="rounded-lg shadow-md mx-auto mb-4"
              />
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Transit Optimized</h4>
              <p className="text-gray-600">Built for Indian transit conditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose RFIDpro?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-3xl mb-4">🚌</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Transit Ready</h4>
              <p className="text-gray-600">Voltage support up to 48V with LED light and sound beeper for RFID card matching</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-3xl mb-4">🎯</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h4>
              <p className="text-gray-600">Contactless tracking at lightning speed - students marked present within seconds on buses and premises</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-3xl mb-4">📱</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">GSM Module</h4>
              <p className="text-gray-600">Built-in GSM connectivity for real-time attendance tracking and reporting</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-3xl mb-4">🎓</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">School Solutions</h4>
              <p className="text-gray-600">GPS-based school bus tracking with RFID student attendance marking</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-3xl mb-4">🔧</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Dual Frequency</h4>
              <p className="text-gray-600">Supports both low and high frequency RFID for maximum compatibility</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-orange-500 text-3xl mb-4">⚡</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Rugged Design</h4>
              <p className="text-gray-600">Specially built for Indian transit environment conditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                RFID Attendance System with GSM Module
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">
                  <strong>What is RFID?</strong><br />
                  RFID stands for Radio Frequency Identification, using radiofrequency waves to transfer information between RFID tags and readers.
                </p>
                <p>
                  <strong>How it works:</strong><br />
                  Each student is linked to an RFID tag with a unique code. When tapped on the reader during bus boarding or premise entry, attendance is immediately verified and recorded.
                </p>
                <p>
                  <strong>Perfect for:</strong><br />
                  • School bus student attendance<br />
                  • Premise entry/exit tracking<br />
                  • Transit vehicle monitoring<br />
                  • Contactless attendance marking<br />
                  • Compatible with buses and school premises
                </p>
              </div>
              <div className="mt-8 p-6 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">₹11,999/-</h4>
                    <p className="text-gray-600">Complete RFID Attendance System</p>
                    <p className="text-sm text-gray-500">Product ID: RF5228Q</p>
                  </div>
                  <button
                    onClick={addToCart}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <Image
                src="/rfid_2.jpg"
                alt="RFID System in Action"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
              <Image
                src="/rfid_3.png"
                alt="RFID Technology"
                width={500}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How RFID Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            The Future of Attendance Tracking
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Link Students</h4>
              <p className="text-gray-600">Each student gets a unique RFID card linked to their profile - works in buses and school premises</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Quick Tap</h4>
              <p className="text-gray-600">Simple tap records attendance instantly - compatible with bus systems and premise entry</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Real-time Data</h4>
              <p className="text-gray-600">GSM module sends data instantly for tracking and reporting</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Ready to Modernize Your Attendance System?
          </h3>
          <p className="text-xl text-orange-100 mb-8">
            Join the future of contactless attendance tracking with RFIDpro
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={addToCart}
              className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors shadow-lg"
            >
              Order Now - ₹11,999
            </button>
            <a
              href="tel:9361992255"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Call: 9361992255
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="RFIDpro Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
                <h4 className="text-xl font-bold">RFIDpro</h4>
              </div>
              <p className="text-gray-400">
                Leading provider of RFID attendance and tracking solutions in India
              </p>
              <p className="text-gray-400 text-sm mt-2">
                📍 76, 8th St, Sector 2, K. K. Nagar, Chennai, Tamil Nadu 600078
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• 48V voltage support</li>
                <li>• LED & Sound indicators</li>
                <li>• GSM connectivity</li>
                <li>• Dual frequency support</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <p className="text-gray-400 mb-2">📞 9361992255</p>
              <p className="text-gray-400 mb-2">📍 76, 8th St, Sector 2, K. K. Nagar</p>
              <p className="text-gray-400 mb-2">Chennai, Tamil Nadu 600078</p>
              <p className="text-gray-400">Perfect for schools, offices, and transit systems</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; 2024 RFIDpro. Made in India for Indian businesses.</p>
          </div>
        </div>
      </footer>
      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Checkout</h3>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">RFID Attendance System (GSM Module)</h4>
              <p className="text-gray-600">Product ID: RF5228Q</p>
              <p className="text-gray-600">₹11,999 each</p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  required
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Enter your complete address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <select
                  value={customerInfo.quantity}
                  onChange={(e) => setCustomerInfo({...customerInfo, quantity: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value={1}>1 Unit - ₹11,999</option>
                  <option value={2}>2 Units - ₹23,998</option>
                  <option value={3}>3 Units - ₹35,997</option>
                  <option value={5}>5 Units - ₹59,995</option>
                  <option value={10}>10 Units - ₹1,19,990</option>
                </select>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-orange-600">₹{(11999 * customerInfo.quantity).toLocaleString()}</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Send Order via SMS
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  We&apos;ll contact you within 24 hours to confirm your order
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
