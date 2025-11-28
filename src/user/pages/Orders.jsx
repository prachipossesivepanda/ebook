import { Link } from 'react-router-dom';

const Orders = () => {
  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-22',
      status: 'Delivered',
      total: 45.99,
      items: [
        { 
          id: 1,
          title: 'The Great Gatsby', 
          author: 'F. Scott Fitzgerald', 
          quantity: 1, 
          price: 12.99, 
          image: '📚',
          productType: 'ebook',
          vendor: 'BookStore Pro',
        },
        { 
          id: 3,
          title: '1984', 
          author: 'George Orwell', 
          quantity: 2, 
          price: 11.99, 
          image: '📕',
          productType: 'physical',
          vendor: 'ReadMore Books',
          trackingNumber: 'TRK-123456',
        },
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'Processing',
      total: 89.50,
      items: [
        { 
          id: 2,
          title: 'To Kill a Mockingbird', 
          author: 'Harper Lee', 
          quantity: 1, 
          price: 14.99, 
          image: '📖',
          productType: 'ebook',
          vendor: 'Literary Hub',
        },
        { 
          id: 4,
          title: 'Pride and Prejudice', 
          author: 'Jane Austen', 
          quantity: 3, 
          price: 13.99, 
          image: '📗',
          productType: 'physical',
          vendor: 'Book World',
        },
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-18',
      status: 'Shipped',
      total: 32.00,
      items: [
        { 
          id: 5,
          title: 'Sapiens: A Brief History', 
          author: 'Yuval Noah Harari', 
          quantity: 1, 
          price: 16.99, 
          image: '📘',
          productType: 'ebook',
          vendor: 'BookStore Pro',
        },
      ]
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      Delivered: 'bg-emerald-50 text-emerald-700',
      Processing: 'bg-blue-50 text-blue-700',
      Shipped: 'bg-amber-50 text-amber-700',
      Cancelled: 'bg-red-50 text-red-700',
    };
    return styles[status] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">View and track your order history</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
          <Link
            to="/books"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                    <span className={`px-3 py-1 rounded text-xs font-medium ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Placed on {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                  <p className="text-sm text-gray-600">{order.items.length} item(s)</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-16 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.author}</p>
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
                      {item.productType === 'physical' && item.trackingNumber && (
                        <p className="text-xs text-gray-500 mt-1">Tracking: {item.trackingNumber}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      {item.productType === 'ebook' && (order.status === 'Delivered' || order.status === 'Processing') && (
                        <Link
                          to={`/reader/${item.id}`}
                          className="mt-2 inline-block px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                        >
                          Read Now
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-slate-900 transition-colors">
                  View Details
                </button>
                {order.items.some(item => item.productType === 'ebook') && (order.status === 'Delivered' || order.status === 'Processing') && (
                  <Link
                    to="/my-ebooks"
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Access Ebooks
                  </Link>
                )}
                {order.status === 'Delivered' && (
                  <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                    Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

