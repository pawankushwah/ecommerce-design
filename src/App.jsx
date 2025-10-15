import { useState } from 'react';
import { ShoppingCart, Star, StarHalf, ArrowLeft, Send, Home as HomeIcon } from 'lucide-react';

// --- MOCK DATA ---
const initialProducts = [
  { 
    id: 1, 
    name: "Luxury Ergonomic Office Chair", 
    price: 499.99, 
    image: "https://placehold.co/600x400/1e3a8a/bfdbfe?text=Office+Chair", 
    description: "Experience ultimate comfort and productivity with this premium ergonomic chair designed for long hours. Features fully adjustable lumbar support and breathable, high-tension mesh fabric.", 
    features: ["Fully Adjustable Lumbar Support", "Breathable Mesh Fabric", "4D Armrests", "Tilt Lock Mechanism"], 
    rating: 4.5,
    reviews: [
      { user: "Alice C.", rating: 5, comment: "Best chair I've ever owned. Worth the investment!", date: "2024-09-10" }, 
      { user: "Bob F.", rating: 4, comment: "Very comfortable, but assembly took a while. Great quality once done.", date: "2024-09-05" }
    ] 
  },
  { 
    id: 2, 
    name: "Smart Wi-Fi Coffee Maker", 
    price: 129.00, 
    image: "https://placehold.co/600x400/b45309/fff7ed?text=Coffee+Maker", 
    description: "Brew your perfect cup from your phone. Program schedules, customize strength, and enjoy fresh coffee every morning with the integrated grinder.", 
    features: ["Wi-Fi Enabled Scheduling", "12-Cup Glass Carafe", "Integrated Burr Grinder", "Keep-Warm Function"], 
    rating: 4.8,
    reviews: [
      { user: "Charlie D.", rating: 5, comment: "Simple to use and makes great coffee. Love the remote start!", date: "2024-09-20" }, 
      { user: "Eve L.", rating: 5, comment: "A game changer for early mornings. Highly recommend.", date: "2024-09-18" }
    ] 
  },
  { 
    id: 3, 
    name: "Noise Cancelling Headphones", 
    price: 279.50, 
    image: "https://placehold.co/600x400/0f172a/94a3b8?text=Headphones", 
    description: "Immerse yourself in pure sound with industry-leading noise cancellation technology and unparalleled comfort for long listening sessions.", 
    features: ["50-Hour Battery Life", "Over-Ear Design", "Crisp Hi-Res Audio", "USB-C Charging"], 
    rating: 4.2,
    reviews: [
      { user: "Frank M.", rating: 4, comment: "Incredible sound quality and solid noise cancellation.", date: "2024-10-01" }, 
      { user: "Grace P.", rating: 5, comment: "Perfect for flights and working remotely. Lightweight too.", date: "2024-09-25" }
    ] 
  },
];

// --- UTILITY COMPONENTS ---

const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const color = "text-yellow-400";

  return (
    <div className="flex items-center space-x-0.5">
      {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className={`w-4 h-4 fill-current ${color}`} />)}
      {hasHalfStar && <StarHalf key="half" className={`w-4 h-4 fill-current ${color}`} />}
      {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)}
      <span className="ml-2 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
    </div>
  );
};

const Header = ({ title, onBack, onHome }) => (
  <header className="sticky top-0 z-10 bg-white shadow-md p-4 flex items-center justify-between">
    <div className="flex items-center">
      {onBack && (
        <button onClick={onBack} className="p-2 mr-3 text-gray-600 hover:text-indigo-600 transition duration-150 rounded-full hover:bg-gray-100">
          <ArrowLeft className="w-6 h-6" />
        </button>
      )}
      <h1 className="text-2xl font-extrabold text-gray-900">{title}</h1>
    </div>
    <div className="flex items-center space-x-4">
      <button 
        onClick={onHome} 
        className="p-2 text-gray-600 hover:text-indigo-600 transition duration-150 rounded-full hover:bg-gray-100"
        aria-label="Go to Home"
      >
        <HomeIcon className="w-6 h-6" />
      </button>
      <ShoppingCart className="w-6 h-6 text-gray-600" />
    </div>
  </header>
);

// --- 1. HOME PAGE (PRODUCT LISTINGS) ---

const ProductCard = ({ product, onViewDetails }) => (
  <div 
    className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition duration-300 cursor-pointer border border-gray-100"
    onClick={() => onViewDetails(product)}
  >
    <div className="relative h-48 bg-gray-100 overflow-hidden">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover transition-opacity duration-300 hover:opacity-90"
        onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/94a3b8/0f172a?text=Product+Image" }}
      />
      <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">NEW</div>
    </div>
    <div className="p-5">
      <h2 className="text-xl font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h2>
      <RatingStars rating={product.rating} />
      <p className="text-3xl font-extrabold text-indigo-700 mt-3">${product.price.toFixed(2)}</p>
      
      <button 
        className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-xl transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 flex items-center justify-center space-x-2"
        onClick={(e) => { e.stopPropagation(); onViewDetails(product); }}
      >
        <span>View Details</span>
        <ArrowLeft className="w-4 h-4 transform rotate-180" />
      </button>
    </div>
  </div>
);

const HomePage = ({ products, onSelectProduct, onHome }) => (
  <>
    <Header title="Tech Shop" onHome={onHome} />
    <main className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Products</h2>
        <p className="text-lg text-gray-500">Discover the latest in technology and comfort.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onViewDetails={onSelectProduct} />
        ))}
      </div>
    </main>
  </>
);

// --- 2. PRODUCT DESCRIPTION PAGE ---

const ProductDetailPage = ({ product, onBack, onViewReviews, onHome }) => (
  <>
    <Header title={product.name} onBack={onBack} onHome={onHome} />
    <main className="container mx-auto px-4 py-8 max-w-screen-xl">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Image Column */}
          <div className="lg:sticky top-24 h-full">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto rounded-xl shadow-lg border border-gray-200 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x600/94a3b8/0f172a?text=Product+Image" }}
            />
          </div>

          {/* Details Column */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
            
            <div className="flex items-center space-x-4">
                <RatingStars rating={product.rating} />
                <span 
                    className="text-sm text-indigo-600 font-medium cursor-pointer hover:underline"
                    onClick={() => onViewReviews(product)}
                >
                    ({product.reviews.length} Reviews)
                </span>
            </div>

            <p className="text-5xl font-extrabold text-indigo-700">${product.price.toFixed(2)}</p>

            <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

            <div className="py-4 border-t border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2 text-gray-600 list-disc list-inside ml-2">
                    {product.features.map((feature, index) => (
                        <li key={index} className="text-base">{feature}</li>
                    ))}
                </ul>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                <button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg font-bold py-3 rounded-xl shadow-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-green-500"
                    onClick={() => console.log('Added to cart:', product.name)}
                >
                    Add to Cart
                </button>
                <button 
                    className="sm:w-auto bg-gray-100 hover:bg-gray-200 text-indigo-700 text-lg font-medium py-3 px-8 rounded-xl shadow transition duration-200 focus:outline-none focus:ring-4 focus:ring-indigo-200"
                    onClick={() => onViewReviews(product)}
                >
                    View Reviews
                </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </>
);

// --- 3. REVIEWS PAGE ---

const ReviewComponent = ({ review }) => (
    <div className="p-5 bg-gray-50 rounded-xl shadow-sm mb-4 border border-gray-200">
        <div className="flex justify-between items-start mb-2">
            <RatingStars rating={review.rating} />
            <span className="text-sm text-gray-400">{review.date}</span>
        </div>
        <p className="text-gray-800 font-semibold mb-1">{review.user}</p>
        <p className="text-gray-600 italic">{review.comment}</p>
    </div>
);

const ReviewsPage = ({ product, onBack, onHome, setProducts }) => {
    const [newReviewText, setNewReviewText] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [message, setMessage] = useState('');

    const handleReviewSubmit = () => {
        if (!newReviewText.trim() || newRating < 1 || newRating > 5) {
            setMessage('Please enter a comment and select a valid rating.');
            return;
        }

        const newReview = {
            user: "Guest User", // Mocked user
            rating: newRating,
            comment: newReviewText.trim(),
            date: new Date().toISOString().split('T')[0] // YYYY-MM-DD
        };

        // Update product data in the main state
        setProducts(prevProducts => prevProducts.map(p => 
            p.id === product.id 
                ? { ...p, reviews: [newReview, ...p.reviews] } // Prepend new review
                : p
        ));

        setNewReviewText('');
        setNewRating(5);
        setMessage('Review successfully submitted!');
        setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    };

    return (
        <>
            <Header title={`Reviews for ${product.name}`} onBack={onBack} onHome={onHome} />
            <main className="container mx-auto px-4 py-8 max-w-screen-xl">
                
                {/* Review Submission Form */}
                <div className="bg-white p-6 rounded-2xl shadow-xl mb-10 border border-indigo-200">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-4">Submit Your Review</h2>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                        <select 
                            value={newRating} 
                            onChange={(e) => setNewRating(parseInt(e.target.value))}
                            className="w-full max-w-xs p-2 border border-gray-300 rounded-lg shadow-inner focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            {[5, 4, 3, 2, 1].map(r => (
                                <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
                        <textarea
                            id="reviewText"
                            rows="4"
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            placeholder="Share your experience with this product..."
                            className="w-full p-3 border border-gray-300 rounded-xl shadow-inner resize-none focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                        ></textarea>
                    </div>

                    {message && (
                        <p className={`text-center py-2 rounded-lg font-medium mb-4 ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </p>
                    )}

                    <button
                        onClick={handleReviewSubmit}
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-200 transform hover:scale-[1.01]"
                    >
                        <Send className="w-5 h-5" />
                        <span>Post Review</span>
                    </button>
                </div>

                {/* Existing Reviews List */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">All Customer Reviews</h2>
                
                <div className="space-y-6">
                    {product.reviews.length > 0 ? (
                        product.reviews.map((review, index) => (
                            <ReviewComponent key={index} review={review} />
                        ))
                    ) : (
                        <p className="text-gray-500 italic text-center py-6 border rounded-xl">No reviews yet. Be the first to share your thoughts!</p>
                    )}
                </div>
            </main>
        </>
    );
};


// --- MAIN APP COMPONENT ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'details', 'reviews'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(initialProducts);

  const navigateToHome = () => {
    setSelectedProduct(null);
    setCurrentPage('home');
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPage('details');
  };
  
  // Custom setter for product that ensures we update the selected product state too
  const customSetProducts = (updater) => {
      setProducts(prevProducts => {
          const newProducts = typeof updater === 'function' ? updater(prevProducts) : updater;
          
          if (selectedProduct) {
              const updatedSelectedProduct = newProducts.find(p => p.id === selectedProduct.id);
              if (updatedSelectedProduct) {
                  setSelectedProduct(updatedSelectedProduct);
              }
          }
          return newProducts;
      });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage 
                products={products} 
                onSelectProduct={handleSelectProduct} 
                onHome={navigateToHome}
               />;
      case 'details':
        if (!selectedProduct) return <div className="p-8 text-center text-red-500">Error: Product not found. <button onClick={navigateToHome} className="text-indigo-600 underline">Go Home</button></div>;
        return <ProductDetailPage 
                product={selectedProduct} 
                onBack={navigateToHome} 
                onViewReviews={() => setCurrentPage('reviews')} 
                onHome={navigateToHome}
               />;
      case 'reviews':
        if (!selectedProduct) return <div className="p-8 text-center text-red-500">Error: Product not found. <button onClick={navigateToHome} className="text-indigo-600 underline">Go Home</button></div>;
        // Pass setProducts to ReviewsPage to allow review submission to update the global state
        return <ReviewsPage 
                product={selectedProduct} 
                onBack={() => setCurrentPage('details')} 
                onHome={navigateToHome}
                setProducts={customSetProducts}
               />;
      default:
        return <HomePage products={products} onSelectProduct={handleSelectProduct} onHome={navigateToHome} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      {renderPage()}
      
      <footer className="w-full bg-gray-800 text-white text-center p-6 mt-12">
        <p className="text-sm">&copy; {new Date().getFullYear()} Tech Shop | Design by Gemini</p>
      </footer>
    </div>
  );
};

export default App;
