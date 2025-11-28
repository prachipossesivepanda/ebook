import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyEbooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const ebooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      vendor: 'BookStore Pro',
      purchasedOn: '2024-01-22',
      status: 'Available',
      lastRead: '2 days ago',
      coverEmoji: '📚',
      progress: 45,
      formats: ['PDF', 'EPUB', 'MOBI'],
      orderId: 'ORD-001',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      vendor: 'ReadMore Books',
      purchasedOn: '2024-01-22',
      status: 'Available',
      lastRead: '1 week ago',
      coverEmoji: '📕',
      progress: 70,
      formats: ['EPUB', 'MOBI'],
      orderId: 'ORD-001',
    },
    {
      id: 5,
      title: 'Sapiens: A Brief History',
      author: 'Yuval Noah Harari',
      vendor: 'BookStore Pro',
      purchasedOn: '2024-01-18',
      status: 'Processing',
      lastRead: null,
      coverEmoji: '📘',
      progress: 0,
      formats: ['PDF'],
      orderId: 'ORD-003',
    },
  ];

  const filteredEbooks = ebooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || book.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    Available: 'bg-emerald-50 text-emerald-700',
    Processing: 'bg-amber-50 text-amber-700',
    Expired: 'bg-red-50 text-red-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">My Ebooks</h1>
          <p className="text-gray-600">Access your purchased ebooks anytime</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Search by title, author, or university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
          >
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="processing">Processing</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Ebooks</p>
          <p className="text-2xl font-semibold text-gray-900 mt-1">{ebooks.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Currently Reading</p>
          <p className="text-2xl font-semibold text-blue-600 mt-1">{ebooks.filter((book) => book.progress > 0).length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Available Formats</p>
          <p className="text-2xl font-semibold text-emerald-600 mt-1">PDF • EPUB • MOBI</p>
        </div>
      </div>

      {/* Ebook List */}
      {filteredEbooks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No ebooks found</h2>
          <p className="text-gray-600 mb-6">Your purchased ebooks will appear here once available.</p>
          <Link
            to="/books"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors"
          >
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEbooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-24 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-5xl">
                  {book.coverEmoji}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{book.title}</h3>
                      <p className="text-sm text-gray-600">by {book.author}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-medium text-blue-600">University: {book.vendor}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${statusColors[book.status] || 'bg-gray-100 text-gray-700'}`}>
                          {book.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Purchased on {book.purchasedOn}</p>
                      <p className="text-xs text-gray-500">Order ID: {book.orderId}</p>
                    </div>
                    <div className="w-full lg:w-64">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span>Reading Progress</span>
                        <span>{book.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                      {book.lastRead && <p className="text-xs text-gray-500 mt-2">Last read {book.lastRead}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      Available formats:
                      {book.formats.map((format) => (
                        <span key={format} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded">
                          {format}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Link
                        to={`/reader/${book.id}`}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          book.status === 'Available'
                            ? 'bg-slate-900 text-white hover:bg-slate-800'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Read Now
                      </Link>
                      <button
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                          book.status === 'Available'
                            ? 'border-gray-300 text-gray-700 hover:bg-gray-50'
                            : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEbooks;


