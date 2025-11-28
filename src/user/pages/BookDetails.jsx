import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Mock book data - in real app, fetch by id
  const book = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: '$12.99',
    originalPrice: '$15.99',
    image: '📚',
    vendor: 'BookStore Pro',
    rating: 4.8,
    reviews: 1245,
    category: 'Fiction',
    description: 'A classic American novel set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan. This timeless tale explores themes of wealth, love, and the American Dream.',
    pages: 180,
    language: 'English',
    format: 'eBook (PDF, EPUB)',
    published: '1925',
    isbn: '978-0-7432-7356-5'
  };

  const handleAddToCart = () => {
    // Add to cart logic
    alert(`Added ${quantity} copy(ies) to cart!`);
  };

  const relatedBooks = [
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: '$14.99', image: '📖' },
    { id: 3, title: '1984', author: 'George Orwell', price: '$11.99', image: '📕' },
    { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: '$13.99', image: '📗' },
  ];

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-600">
        <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/books" className="hover:text-slate-900 transition-colors">Books</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{book.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Book Image */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="aspect-[3/4] bg-gray-100 rounded-lg flex items-center justify-center text-9xl">
            {book.image}
          </div>
        </div>

        {/* Book Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-gray-900">{book.rating}</span>
                <span className="text-gray-600">({book.reviews} reviews)</span>
              </div>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium">
                {book.category}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">{book.price}</span>
              {book.originalPrice && (
                <span className="text-lg text-gray-400 line-through">{book.originalPrice}</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-4">Vendor: {book.vendor}</p>
            
            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-4">
              <label className="text-sm font-medium text-gray-700">Quantity:</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  −
                </button>
                <span className="px-4 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors mb-3"
            >
              Add to Cart
            </button>
            <button className="w-full px-6 py-3 bg-white text-slate-900 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
              Buy Now
            </button>
          </div>

          {/* Book Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Book Details</h2>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-gray-600">Pages</dt>
                <dd className="font-medium text-gray-900">{book.pages}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Language</dt>
                <dd className="font-medium text-gray-900">{book.language}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Format</dt>
                <dd className="font-medium text-gray-900">{book.format}</dd>
              </div>
              <div>
                <dt className="text-gray-600">Published</dt>
                <dd className="font-medium text-gray-900">{book.published}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-600">ISBN</dt>
                <dd className="font-medium text-gray-900">{book.isbn}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Description</h2>
        <p className="text-gray-600 leading-relaxed">{book.description}</p>
      </div>

      {/* Related Books */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedBooks.map((relatedBook) => (
            <Link
              key={relatedBook.id}
              to={`/books/${relatedBook.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:border-gray-300 transition-all group"
            >
              <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center text-6xl">
                {relatedBook.image}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-slate-900 transition-colors">
                  {relatedBook.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{relatedBook.author}</p>
                <p className="font-semibold text-gray-900">{relatedBook.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

