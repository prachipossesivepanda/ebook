import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const EbookReader = () => {
  const { bookId } = useParams();
  const [fontSize, setFontSize] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [theme, setTheme] = useState('light'); // light, sepia, dark

  // Mock book data - in real app, fetch by bookId
  const book = {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    content: `Chapter 1

In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores. The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the big shore places were closed now and there were hardly any lights except the shadowy, moving glow of a ferryboat across the Sound. And as the moon rose higher the inessential houses began to melt away until gradually I became aware of the old island here that flowered once for Dutch sailors' eyes—a fresh, green breast of the new world. Its vanished trees, the trees that had made way for Gatsby's house, had once pandered in whispers to the last and greatest of all human dreams; for a transitory enchanted moment man must have held his breath in the presence of this continent, compelled into an aesthetic contemplation he neither understood nor desired, face to face for the last time in history with something commensurate to his capacity for wonder.

And so with the sunshine and the great bursts of leaves growing on the trees, just as things grow in fast movies, I had that familiar conviction that life was beginning over again with the summer.

There was so much to read, for one thing, and so much fine health to be pulled down out of the young breath-giving air. I bought a dozen volumes on banking and credit and investment securities, and they stood on my shelf in red and gold like new money from the mint, promising to unfold the shining secrets that only Midas and Morgan and Maecenas knew. And I had the high intention of reading many other books besides. I was rather literary in college—one year I wrote a series of very solemn and obvious editorials for the Yale News—and now I was going to bring back all such things into my life and become again that most limited of all specialists, the "well-rounded man." This isn't just an epigram—life is much more successfully looked at from a single window, after all.

It was a matter of chance that I should have rented a house in one of the strangest communities in North America. It was on that slender riotous island which extends itself due east of New York—and where there are, among other natural curiosities, two unusual formations of land. Twenty miles from the city a pair of enormous eggs, identical in contour and separated only by a courtesy bay, jut out into the most domesticated body of salt water in the Western hemisphere, the great wet barnyard of Long Island Sound. They are not perfect ovals—like the egg in the Columbus story, they are both crushed flat at the contact end—but their physical resemblance must be a source of perpetual confusion to the gulls that fly overhead. To the wingless a more arresting phenomenon is their dissimilarity in every particular except shape and size.`,
    totalPages: 180,
    currentPage: 1,
    progress: 0.5,
  };

  const themes = {
    light: { bg: 'bg-white', text: 'text-gray-900', border: 'border-gray-200' },
    sepia: { bg: 'bg-amber-50', text: 'text-amber-900', border: 'border-amber-200' },
    dark: { bg: 'bg-gray-900', text: 'text-gray-100', border: 'border-gray-700' },
  };

  const currentTheme = themes[theme];

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < book.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text}`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 ${currentTheme.bg} ${currentTheme.border} border-b shadow-sm`}>
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/orders"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="font-semibold text-sm">{book.title}</h1>
                <p className="text-xs opacity-75">{book.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Theme Selector */}
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setTheme('light')}
                  className={`px-2 py-1 rounded text-xs ${theme === 'light' ? 'bg-white shadow' : ''}`}
                  title="Light"
                >
                  ☀️
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`px-2 py-1 rounded text-xs ${theme === 'sepia' ? 'bg-white shadow' : ''}`}
                  title="Sepia"
                >
                  📜
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`px-2 py-1 rounded text-xs ${theme === 'dark' ? 'bg-white shadow' : ''}`}
                  title="Dark"
                >
                  🌙
                </button>
              </div>

              {/* Font Size */}
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-1">
                <button
                  onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                  className="text-sm font-bold"
                >
                  A−
                </button>
                <span className="text-xs w-8 text-center">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                  className="text-sm font-bold"
                >
                  A+
                </button>
              </div>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                title="Toggle Fullscreen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Page {currentPage} of {book.totalPages}</span>
              <span>{Math.round((currentPage / book.totalPages) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all"
                style={{ width: `${(currentPage / book.totalPages) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reading Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div
          className={`prose prose-lg max-w-none ${currentTheme.text}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.8' }}
        >
          <div className="whitespace-pre-wrap leading-relaxed">
            {book.content}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className={`fixed bottom-0 left-0 right-0 ${currentTheme.bg} ${currentTheme.border} border-t shadow-lg`}>
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max={book.totalPages}
                value={currentPage}
                onChange={(e) => {
                  const page = parseInt(e.target.value);
                  if (page >= 1 && page <= book.totalPages) {
                    setCurrentPage(page);
                  }
                }}
                className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-center bg-white dark:bg-gray-800"
              />
              <span className="text-sm opacity-75">/ {book.totalPages}</span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === book.totalPages}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                currentPage === book.totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed footer */}
      <div className="h-24" />
    </div>
  );
};

export default EbookReader;

