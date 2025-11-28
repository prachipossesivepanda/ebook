import { useState } from 'react';
import { Link } from 'react-router-dom';

const BrowseBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const categories = ['All', 'Fiction', 'Non-Fiction', 'Science', 'History', 'Biography', 'Technology'];
  
  const books = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: '$12.99',
      originalPrice: '$15.99',
      image: '📚',
      vendor: 'BookStore Pro',
      vendorId: 'VND-001',
      rating: 4.8,
      reviews: 1245,
      category: 'Fiction',
      hasEbook: true,
      hasPhysical: true,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: '$14.99',
      image: '📖',
      vendor: 'Literary Hub',
      vendorId: 'VND-002',
      rating: 4.9,
      reviews: 2134,
      category: 'Fiction',
      hasEbook: true,
      hasPhysical: true,
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      price: '$11.99',
      image: '📕',
      vendor: 'ReadMore Books',
      vendorId: 'VND-003',
      rating: 4.7,
      reviews: 1890,
      category: 'Fiction',
      hasEbook: true,
      hasPhysical: false,
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: '$13.99',
      image: '📗',
      vendor: 'Book World',
      vendorId: 'VND-004',
      rating: 4.6,
      reviews: 1567,
      category: 'Fiction',
      hasEbook: true,
      hasPhysical: true,
    },
    {
      id: 5,
      title: 'Sapiens: A Brief History',
      author: 'Yuval Noah Harari',
      price: '$16.99',
      image: '📘',
      vendor: 'BookStore Pro',
      vendorId: 'VND-001',
      rating: 4.8,
      reviews: 2341,
      category: 'Non-Fiction',
      hasEbook: true,
      hasPhysical: true,
    },
    {
      id: 6,
      title: 'The Innovator\'s Dilemma',
      author: 'Clayton Christensen',
      price: '$15.99',
      image: '💻',
      vendor: 'ReadMore Books',
      vendorId: 'VND-003',
      rating: 4.5,
      reviews: 987,
      category: 'Technology',
      hasEbook: true,
      hasPhysical: false,
    },
    {
      id: 7,
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      price: '$14.99',
      image: '🔬',
      vendor: 'Literary Hub',
      vendorId: 'VND-002',
      rating: 4.7,
      reviews: 1789,
      category: 'Science',
      hasEbook: true,
      hasPhysical: true,
    },
    {
      id: 8,
      title: 'The Diary of a Young Girl',
      author: 'Anne Frank',
      price: '$12.99',
      image: '📜',
      vendor: 'Book World',
      vendorId: 'VND-004',
      rating: 4.9,
      reviews: 3124,
      category: 'History',
      hasEbook: true,
      hasPhysical: true,
    },
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Browse Books</h1>
        <p className="text-gray-600">Discover and explore our vast collection of digital books</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat === 'All' ? 'all' : cat}>{cat}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent outline-none"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredBooks.length} of {books.length} books
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Link
            key={book.id}
            to={`/books/${book.id}`}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all group"
          >
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-6xl">
              {book.image}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-slate-900 transition-colors line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{book.author}</p>
              <div className="flex items-center gap-1 mb-3">
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-gray-600">{book.rating}</span>
                <span className="text-sm text-gray-400">({book.reviews})</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-lg font-semibold text-gray-900">{book.price}</span>
                  {book.originalPrice && (
                    <span className="text-sm text-gray-400 line-through ml-2">{book.originalPrice}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-medium text-blue-600">University:</span>
                  <span className="text-xs font-semibold text-blue-700">{book.vendor}</span>
                </div>
                {(book.hasEbook || book.hasPhysical) && (
                  <div className="flex gap-1">
                    {book.hasEbook && <span className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">📱 Ebook</span>}
                    {book.hasPhysical && <span className="text-xs px-1.5 py-0.5 bg-amber-100 text-amber-700 rounded">📦 Physical</span>}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50" disabled>
          Previous
        </button>
        <button className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium">
          1
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          2
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          3
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </button>
      </div>
    </div>
  );
};

export default BrowseBooks;

