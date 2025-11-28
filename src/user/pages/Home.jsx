import { Link } from 'react-router-dom';

const Home = () => {
  const featuredBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: '$12.99',
      image: '📚',
      vendor: 'BookStore Pro',
      rating: 4.8
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: '$14.99',
      image: '📖',
      vendor: 'Literary Hub',
      rating: 4.9
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      price: '$11.99',
      image: '📕',
      vendor: 'ReadMore Books',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: '$13.99',
      image: '📗',
      vendor: 'Book World',
      rating: 4.6
    },
  ];

  const categories = [
    { name: 'Fiction', count: 245, icon: '📚' },
    { name: 'Non-Fiction', count: 189, icon: '📖' },
    { name: 'Science', count: 156, icon: '🔬' },
    { name: 'History', count: 134, icon: '📜' },
    { name: 'Biography', count: 98, icon: '👤' },
    { name: 'Technology', count: 112, icon: '💻' },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 md:p-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover Your Next Great Read
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Explore thousands of digital books from trusted vendors. Find your favorite genres, 
            discover new authors, and build your digital library.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/books"
              className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors text-center"
            >
              Browse Books
            </Link>
            <Link
              to="/books?category=featured"
              className="px-6 py-3 bg-white text-slate-900 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors text-center"
            >
              Featured Collection
            </Link>
          </div>

          {/* Admin/User Access Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4">Admin or Vendor? Access your dashboard:</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/role-selection"
                className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 font-medium transition-colors text-sm"
              >
                Admin Login
              </Link>
              <Link
                to="/admin/login"
                className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 font-medium transition-colors text-sm"
              >
                Direct Admin Access
              </Link>
              <Link
                to="/login"
                className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 font-medium transition-colors text-sm"
              >
                User Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Browse by Category</h2>
          <Link to="/books" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/books?category=${category.name.toLowerCase()}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-slate-900 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.count} books</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Books */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Featured Books</h2>
          <Link to="/books" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
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
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600">{book.rating}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{book.price}</span>
                </div>
                <p className="text-xs text-gray-500">by {book.vendor}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
            <div className="text-sm text-gray-600">Books Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-sm text-gray-600">Vendors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
            <div className="text-sm text-gray-600">Happy Readers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

