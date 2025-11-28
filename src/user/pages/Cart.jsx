import { useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      bookId: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 12.99,
      quantity: 1,
      image: '📚',
      vendor: 'BookStore Pro',
      productType: 'ebook',
    },
    {
      id: 2,
      bookId: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 14.99,
      quantity: 2,
      image: '📖',
      vendor: 'Literary Hub',
      productType: 'physical',
    },
    {
      id: 3,
      bookId: 3,
      title: '1984',
      author: 'George Orwell',
      price: 11.99,
      quantity: 1,
      image: '📕',
      vendor: 'ReadMore Books',
      productType: 'ebook',
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cartItems.length} item(s) in your cart</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Start adding books to your cart!</p>
          <Link
            to="/books"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex gap-4">
                  <Link to={`/books/${item.bookId}`} className="flex-shrink-0">
                    <div className="w-24 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
                      {item.image}
                    </div>
                  </Link>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Link to={`/books/${item.bookId}`} className="font-semibold text-gray-900 hover:text-slate-900 transition-colors">
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-600 mt-1">{item.author}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-gray-500">University: {item.vendor}</p>
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            item.productType === 'ebook' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-amber-100 text-amber-700'
                          }`}>
                            {item.productType === 'ebook' ? '📱 Ebook' : '📦 Physical'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      {item.productType === 'physical' ? (
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-900"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-x border-gray-300 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-600 hover:text-gray-900"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">Digital - Quantity: 1</span>
                      )}
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>
              </div>
              <button className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors mb-3">
                Proceed to Checkout
              </button>
              <Link
                to="/books"
                className="block w-full text-center px-6 py-3 bg-white text-slate-900 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

