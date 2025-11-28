import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const BookDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productType, setProductType] = useState('ebook'); // 'ebook' or 'physical'

  // Mock book data - in real app, fetch by id
  const book = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    ebookPrice: 12.99,
    physicalPrice: 19.99,
    originalPrice: 15.99,
    image: '📚',
    vendor: 'BookStore Pro',
    vendorId: 'VND-001',
    rating: 4.8,
    reviews: 1245,
    category: 'Fiction',
    description: 'A classic American novel set in the Jazz Age, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan. This timeless tale explores themes of wealth, love, and the American Dream.',
    pages: 180,
    language: 'English',
    published: '1925',
    isbn: '978-0-7432-7356-5',
    availableFormats: ['PDF', 'EPUB', 'MOBI'],
    hasPhysical: true,
    hasEbook: true,
    shippingDays: 5,
    ebookContent: `Chapter 1

In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the big shore places were closed now and there were hardly any lights except the shadowy, moving glow of a ferryboat across the Sound. And as the moon rose higher the inessential houses began to melt away until gradually I became aware of the old island here that flowered once for Dutch sailors' eyes—a fresh, green breast of the new world. Its vanished trees, the trees that had made way for Gatsby's house, had once pandered in whispers to the last and greatest of all human dreams; for a transitory enchanted moment man must have held his breath in the presence of this continent, compelled into an aesthetic contemplation he neither understood nor desired, face to face for the last time in history with something commensurate to his capacity for wonder.`
  };

  const currentPrice = productType === 'ebook' ? book.ebookPrice : book.physicalPrice;

  const handleAddToCart = (type) => {
    // Add to cart logic with product type
    const item = {
      bookId: book.id,
      title: book.title,
      author: book.author,
      price: type === 'ebook' ? book.ebookPrice : book.physicalPrice,
      quantity: type === 'ebook' ? 1 : quantity,
      productType: type,
      image: book.image,
      vendor: book.vendor,
      vendorId: book.vendorId,
    };
    // In real app, add to cart state/context
    alert(`Added ${type === 'ebook' ? 'e-book' : `${quantity} physical copy(ies)`} to cart!`);
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

          {/* University Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-blue-900">University:</span>
              <span className="text-sm font-semibold text-blue-700">{book.vendor}</span>
            </div>
          </div>

          {/* Product Type Selection */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">Select Format:</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setProductType('ebook')}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    productType === 'ebook'
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold mb-1">📱 E-Book</div>
                    <div className="text-xs opacity-75">Instant Download</div>
                    <div className="text-sm font-bold mt-2">${book.ebookPrice.toFixed(2)}</div>
                  </div>
                </button>
                <button
                  onClick={() => setProductType('physical')}
                  disabled={!book.hasPhysical}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    !book.hasPhysical
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                      : productType === 'physical'
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  }`}
                >
                  <div className="text-left">
                    <div className="font-semibold mb-1">📦 Physical Copy</div>
                    <div className="text-xs opacity-75">{book.shippingDays} days shipping</div>
                    <div className="text-sm font-bold mt-2">${book.physicalPrice.toFixed(2)}</div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-gray-900">${currentPrice.toFixed(2)}</span>
              {book.originalPrice && currentPrice < book.originalPrice && (
                <span className="text-lg text-gray-400 line-through">${book.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {productType === 'ebook' && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Available formats:</strong> {book.availableFormats.join(', ')}
                </p>
                <p className="text-xs text-blue-600 mt-1">Access immediately after purchase</p>
              </div>
            )}

            {productType === 'physical' && (
              <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-xs text-amber-700">
                  <strong>Shipping:</strong> {book.shippingDays} business days
                </p>
                <p className="text-xs text-amber-600 mt-1">Free shipping on orders over $50</p>
              </div>
            )}
            
            {/* Quantity & Add to Cart */}
            {productType === 'physical' && (
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
            )}
            <button
              onClick={() => handleAddToCart(productType)}
              className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium transition-colors mb-3"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => {
                handleAddToCart(productType);
                // Navigate to checkout
              }}
              className="w-full px-6 py-3 bg-white text-slate-900 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
            >
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
                <dt className="text-gray-600">Available Formats</dt>
                <dd className="font-medium text-gray-900">{book.availableFormats.join(', ')}</dd>
              </div>
              <div>
                <dt className="text-gray-600">University</dt>
                <dd className="font-medium text-gray-900">{book.vendor}</dd>
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

