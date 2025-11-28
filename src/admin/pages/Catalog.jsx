import { useState } from 'react';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const books = [
    { id: 1, title: 'The Great Novel', author: 'John Author', vendor: 'BookStore Pro', category: 'Fiction', price: '$24.99', stock: 150, status: 'Active', sales: 234 },
    { id: 2, title: 'Science Explained', author: 'Jane Scientist', vendor: 'Book World', category: 'Non-Fiction', price: '$29.99', stock: 89, status: 'Active', sales: 189 },
    { id: 3, title: 'Learning Math', author: 'Dr. Math', vendor: 'ReadMore Books', category: 'Educational', price: '$19.99', stock: 0, status: 'Out of Stock', sales: 156 },
    { id: 4, title: 'Adventure Tales', author: 'Adventure Writer', vendor: 'Literary Hub', category: 'Fiction', price: '$22.99', stock: 45, status: 'Active', sales: 98 },
    { id: 5, title: 'Kids Stories', author: 'Story Teller', vendor: 'BookStore Pro', category: 'Children', price: '$15.99', stock: 200, status: 'Active', sales: 312 },
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || book.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesStatus = filterStatus === 'all' || book.status.toLowerCase().replace(' ', '_') === filterStatus.toLowerCase();
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', 'Fiction', 'Non-Fiction', 'Educational', 'Children'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Catalog Management</h2>
          <p className="text-gray-600">Manage all books in the catalog</p>
        </div>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium">
          Add New Book
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search books by title, author, or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{book.title}</h3>
                <p className="text-sm text-gray-600">by {book.author}</p>
                <p className="text-xs text-gray-500 mt-1">Vendor: {book.vendor}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                book.status === 'Active' ? 'bg-green-100 text-green-700' :
                book.status === 'Out of Stock' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {book.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Category:</span>
                <span className="font-medium text-gray-800">{book.category}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Price:</span>
                <span className="font-semibold text-gray-800">{book.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Stock:</span>
                <span className={`font-medium ${book.stock === 0 ? 'text-red-600' : 'text-gray-800'}`}>
                  {book.stock} units
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Sales:</span>
                <span className="font-medium text-gray-800">{book.sales} sold</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button className="flex-1 px-3 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 text-sm font-medium">
                Edit
              </button>
              <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;

