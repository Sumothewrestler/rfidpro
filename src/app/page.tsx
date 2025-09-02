'use client';

import Image from "next/image";
import { useState } from "react";
import jsPDF from 'jspdf';

export default function Home() {
  const [cart, setCart] = useState<number>(0);
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const [showQuotation, setShowQuotation] = useState<boolean>(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    quantity: 1
  });
  const [quotationInfo, setQuotationInfo] = useState({
    customerName: '',
    companyName: '',
    phone: '',
    email: '',
    address: '',
    quantity: 1,
    notes: ''
  });

  const addToCart = () => {
    setCart(cart + 1);
    setShowCheckout(true);
  };

  const showQuotationForm = () => {
    setShowQuotation(true);
  };

  const generateQuotationPDF = () => {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    // Company Header with better spacing
    pdf.setFontSize(26);
    pdf.setTextColor(255, 87, 34);
    pdf.text('RFIDpro', 20, 25);
    
    pdf.setFontSize(11);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Professional RFID Solutions', 20, 35);
    pdf.text('76, 8th St, Sector 2, K. K. Nagar', 20, 45);
    pdf.text('Chennai, Tamil Nadu 600078', 20, 55);
    pdf.text('Phone: 9361992255', 20, 65);
    
    // Add horizontal line under header
    pdf.setLineWidth(0.5);
    pdf.setDrawColor(255, 87, 34);
    pdf.line(20, 75, pageWidth - 20, 75);
    
    // Quotation Title
    pdf.setFontSize(20);
    pdf.setTextColor(255, 87, 34);
    pdf.text('QUOTATION', pageWidth / 2, 90, { align: 'center' });
    
    // Customer Details and Quotation Details side by side
    const quotationNo = `QT${Date.now().toString().slice(-6)}`;
    const currentDate = new Date().toLocaleDateString('en-IN');
    const validTill = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN');
    const startY = 110;
    
    // Left side - Customer Details
    pdf.setFontSize(12);
    pdf.setTextColor(255, 87, 34);
    pdf.text('Bill To:', 20, startY);
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    let customerY = startY + 15;
    pdf.text(quotationInfo.customerName, 20, customerY);
    
    if (quotationInfo.companyName) {
      customerY += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text(quotationInfo.companyName, 20, customerY);
      pdf.setFont('helvetica', 'normal');
    }
    
    customerY += 10;
    pdf.text(`Phone: ${quotationInfo.phone}`, 20, customerY);
    
    if (quotationInfo.email) {
      customerY += 10;
      pdf.text(`Email: ${quotationInfo.email}`, 20, customerY);
    }
    
    customerY += 10;
    const addressLines = pdf.splitTextToSize(quotationInfo.address, 85);
    pdf.text(addressLines, 20, customerY);
    
    // Right side - Quotation Details (compact box)
    const boxX = pageWidth - 85;
    pdf.setFillColor(245, 245, 245);
    pdf.rect(boxX, startY, 80, 35, 'F');
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(boxX, startY, 80, 35);
    
    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    pdf.text(`Quotation No: ${quotationNo}`, boxX + 3, startY + 10);
    pdf.text(`Date: ${currentDate}`, boxX + 3, startY + 20);
    pdf.text(`Valid Till: ${validTill}`, boxX + 3, startY + 30);
    
    // Product Table with better formatting
    const tableStartY = Math.max(customerY + (addressLines.length * 5), startY + 35) + 20;
    
    // Table Header
    pdf.setFillColor(255, 87, 34);
    pdf.rect(20, tableStartY, pageWidth - 40, 12, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Description', 25, tableStartY + 8);
    pdf.text('Qty', pageWidth - 100, tableStartY + 8, { align: 'center' });
    pdf.text('Unit Price', pageWidth - 70, tableStartY + 8, { align: 'center' });
    pdf.text('Total', pageWidth - 35, tableStartY + 8, { align: 'center' });
    
    // Product Row
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(0, 0, 0);
    pdf.setDrawColor(200, 200, 200);
    pdf.rect(20, tableStartY + 12, pageWidth - 40, 20);
    
    pdf.text('RFID Attendance System with GSM Module', 25, tableStartY + 20);
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Product ID: RF5228Q', 25, tableStartY + 28);
    
    pdf.setFontSize(10);
    pdf.setTextColor(0, 0, 0);
    pdf.text(quotationInfo.quantity.toString(), pageWidth - 100, tableStartY + 22, { align: 'center' });
    pdf.text('Rs. 11,999', pageWidth - 70, tableStartY + 22, { align: 'center' });
    pdf.text(`Rs. ${(11999 * quotationInfo.quantity).toLocaleString()}`, pageWidth - 35, tableStartY + 22, { align: 'center' });
    
    // Total Section with better alignment
    const totalSectionY = tableStartY + 45;
    pdf.setDrawColor(255, 87, 34);
    pdf.line(pageWidth - 90, totalSectionY, pageWidth - 20, totalSectionY);
    
    pdf.setFontSize(11);
    pdf.text('Subtotal:', pageWidth - 90, totalSectionY + 12);
    pdf.text(`Rs. ${(11999 * quotationInfo.quantity).toLocaleString()}`, pageWidth - 35, totalSectionY + 12, { align: 'center' });
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(255, 87, 34);
    pdf.text('Total Amount:', pageWidth - 90, totalSectionY + 25);
    pdf.text(`Rs. ${(11999 * quotationInfo.quantity).toLocaleString()}`, pageWidth - 35, totalSectionY + 25, { align: 'center' });
    
    // Terms and Conditions
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(255, 87, 34);
    pdf.text('Terms & Conditions:', 20, totalSectionY + 50);
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(9);
    pdf.setTextColor(0, 0, 0);
    const terms = [
      '• This quotation is valid for 30 days from the date of issue',
      '• Payment terms: 50% advance, 50% on delivery',
      '• Delivery time: 7-10 working days after order confirmation',
      '• Warranty: 1 year manufacturer warranty',
      '• Installation and training included',
      '• Prices are inclusive of all taxes'
    ];
    
    terms.forEach((term, index) => {
      pdf.text(term, 25, totalSectionY + 65 + (index * 8));
    });
    
    // Notes Section
    if (quotationInfo.notes) {
      const notesY = totalSectionY + 125;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(255, 87, 34);
      pdf.text('Additional Notes:', 20, notesY);
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      const notesLines = pdf.splitTextToSize(quotationInfo.notes, pageWidth - 40);
      pdf.text(notesLines, 20, notesY + 12);
    }
    
    // Footer with border
    pdf.setDrawColor(255, 87, 34);
    pdf.line(20, pageHeight - 30, pageWidth - 20, pageHeight - 30);
    
    pdf.setFontSize(9);
    pdf.setTextColor(60, 60, 60);
    pdf.text('Thank you for considering RFIDpro for your RFID solution needs.', pageWidth / 2, pageHeight - 20, { align: 'center' });
    pdf.text('For any queries, please contact us at 9361992255', pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Download PDF
    const fileName = `RFIDpro_Quotation_${currentDate.replace(/\//g, '-')}_${quotationInfo.customerName.replace(/\s+/g, '_')}.pdf`;
    pdf.save(fileName);
    
    setShowQuotation(false);
    alert('Professional quotation PDF downloaded successfully!');
  };

  const handleQuotationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateQuotationPDF();
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
                  <div className="flex gap-2">
                    <button
                      onClick={addToCart}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors shadow-md text-sm"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={showQuotationForm}
                      className="border-2 border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-4 py-3 rounded-lg font-semibold transition-colors text-sm"
                    >
                      Get Quote
                    </button>
                  </div>
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
            <button
              onClick={showQuotationForm}
              className="border-2 border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Quotation
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
      {/* Quotation Modal */}
      {showQuotation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Request Quotation</h3>
              <button
                onClick={() => setShowQuotation(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-gray-900">RFID Attendance System (GSM Module)</h4>
              <p className="text-gray-600">Product ID: RF5228Q</p>
              <p className="text-gray-600">Unit Price: ₹11,999</p>
            </div>

            <form onSubmit={handleQuotationSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={quotationInfo.customerName}
                    onChange={(e) => setQuotationInfo({...quotationInfo, customerName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter customer name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company/School Name</label>
                  <input
                    type="text"
                    value={quotationInfo.companyName}
                    onChange={(e) => setQuotationInfo({...quotationInfo, companyName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter company or school name"
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={quotationInfo.phone}
                    onChange={(e) => setQuotationInfo({...quotationInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={quotationInfo.email}
                    onChange={(e) => setQuotationInfo({...quotationInfo, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter email address"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <textarea
                  required
                  value={quotationInfo.address}
                  onChange={(e) => setQuotationInfo({...quotationInfo, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={3}
                  placeholder="Enter complete address"
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                  <select
                    value={quotationInfo.quantity}
                    onChange={(e) => setQuotationInfo({...quotationInfo, quantity: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value={1}>1 Unit</option>
                    <option value={2}>2 Units</option>
                    <option value={3}>3 Units</option>
                    <option value={5}>5 Units</option>
                    <option value={10}>10 Units</option>
                    <option value={20}>20 Units</option>
                    <option value={50}>50 Units</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Total</label>
                  <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg">
                    <span className="text-lg font-bold text-orange-600">Rs. {(11999 * quotationInfo.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  value={quotationInfo.notes}
                  onChange={(e) => setQuotationInfo({...quotationInfo, notes: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={2}
                  placeholder="Any specific requirements or notes"
                />
              </div>

              <div className="border-t pt-4">
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold text-lg transition-colors"
                >
                  Download Quotation PDF
                </button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Professional quotation will be downloaded as PDF. Valid for 30 days.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

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
