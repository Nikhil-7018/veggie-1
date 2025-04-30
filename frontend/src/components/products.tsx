import "../index.css";
import { Heart, ShoppingBasket, ListCollapse } from "lucide-react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts, Product as FirebaseProduct } from "../services/products";

interface CartItem extends FirebaseProduct {
  quantity: number;
}

interface DealOfTheDay extends FirebaseProduct {
  originalPrice: number;
  startTime: number;
}

const Products = () => {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [likedProducts, setLikedProducts] = useState<string[]>(() => {
    const storedLikes = localStorage.getItem("likedProducts");
    return storedLikes ? JSON.parse(storedLikes) : [];
  });
  const [selectedProduct, setSelectedProduct] = useState<FirebaseProduct | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [dealOfTheDay, setDealOfTheDay] = useState<DealOfTheDay>(() => {
    const storedDeal = localStorage.getItem("dealOfTheDay");
    if (storedDeal) {
      const deal = JSON.parse(storedDeal);
      const now = Date.now();
      const elapsed = now - deal.startTime;
      if (elapsed >= 24 * 60 * 60 * 1000) {
        return getNewDealOfTheDay();
      }
      return deal;
    }
    return getNewDealOfTheDay();
  });

  function getNewDealOfTheDay(): DealOfTheDay {
    const newDeal = {
      id: "deal-of-the-day",
      name: "Cabbage",
      price: 5,
      originalPrice: 10,
      image: "/images/Cabbage.jpg",
      description: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia",
      category: "Vegetables",
      userId: "system",
      startTime: Date.now()
    };
    localStorage.setItem("dealOfTheDay", JSON.stringify(newDeal));
    return newDeal;
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error loading products. Please try again later.", {
          position: "top-center",
          autoClose: 2000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  }, [likedProducts]);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - dealOfTheDay.startTime;
      const remaining = 24 * 60 * 60 * 1000 - elapsed; // 24 hours in milliseconds

      if (remaining <= 0) {
        // Time's up, get a new deal
        const newDeal = getNewDealOfTheDay();
        setDealOfTheDay(newDeal);
        toast.info("New deal of the day is available!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        // Update the time display
        const hours = Math.floor(remaining / (60 * 60 * 1000));
        const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
        const seconds = Math.floor((remaining % (60 * 1000)) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [dealOfTheDay]);

  const addToCart = (product: FirebaseProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        toast.info(`${product.name} quantity updated!`, { position: "top-right", autoClose: 500 });
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.info(`${product.name} added to cart!`, { position: "top-right", autoClose: 500 });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const toggleLike = (productId: string) => {
    setLikedProducts((prevLikes) => {
      if (prevLikes.includes(productId)) {
        return prevLikes.filter((id) => id !== productId);
      } else {
        return [...prevLikes, productId];
      }
    });
  };

  const showDescription = (product: FirebaseProduct) => {
    setSelectedProduct(product);
  };

  const closeDescription = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="m-40" id="shop">
        <ToastContainer />
        <div>
          <h1 className="text-lime-500 text-center text-xl">Featured Products</h1>
          <h2 className="font-bold text-5xl text-center p-6">Our Products</h2>
          <p className="text-center text-gray-500 p-3">Fresh organic vegetables sourced directly from farmers.</p>
        </div>

        {/* Grid Layout for Products */}
        <div className="grid grid-cols-4 gap-16 py-16">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="relative group p-2 w-52">
                {/* Product Image */}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300 ease-in-out" 
                />
                {/* Product Name */}
                <p className="font-bold text-center p-2">{product.name}</p>
                {/* Price (Hidden on Hover) */}
                <p className="text-center text-lime-600 text-sm p-2 group-hover:opacity-0 transition-opacity duration-300">
                  ₹{product.price.toFixed(2)}
                </p>
                {/* Icons - Positioned Over the Price */}
                <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button 
                    onClick={() => toggleLike(product.id)}
                    className={`p-2 rounded-full shadow-md transition ${
                      likedProducts.includes(product.id) 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-white hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={18} fill={likedProducts.includes(product.id) ? 'white' : 'none'} />
                  </button>
                  <button 
                    onClick={() => addToCart(product)} 
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                  >
                    <ShoppingBasket size={18} />
                  </button>
                  <button 
                    onClick={() => showDescription(product)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition"
                  >
                    <ListCollapse size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-xl">No products available</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Description Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-800">{selectedProduct.name}</h2>
              <button 
                onClick={closeDescription}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                <p className="text-xl font-bold text-lime-600 mb-4">
                  ₹{selectedProduct.price.toFixed(2)}
                </p>
                <button 
                  onClick={() => {
                    addToCart(selectedProduct);
                    closeDescription();
                  }}
                  className="bg-lime-600 text-white px-6 py-2 rounded-lg hover:bg-lime-700 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Deal of the Day Section */}
      <div className="flex justify-between items-center px-16 -mt-20">
        <div className="relative w-1/2">
          <img src={dealOfTheDay.image} alt={dealOfTheDay.name} className="h-96 w-full object-cover rounded-lg shadow-md" />
        </div>
        <div className="w-1/2 p-8">
          <h1 className="text-lime-700 text-xl py-2">Best Price For You</h1>
          <p className="font-bold text-5xl py-4">Deal of the Day</p>
          <p className="text-gray-500 py-4">
          Delicious meals begin with farm-fresh vegetables.
          </p>
          <p className="text-lime-700 py-2 text-3xl">{dealOfTheDay.name}</p>
          <div className="flex gap-1 py-2">
            <p className="text-gray-500 line-through">Was ₹{dealOfTheDay.originalPrice}</p>
            <p className="text-lime-700 font-bold">Now ₹{dealOfTheDay.price} only</p>
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="bg-lime-100 px-4 py-2 rounded-lg">
              <p className="text-lime-700 font-bold">Time Left:</p>
              <p className="text-2xl font-mono">{timeLeft}</p>
            </div>
          </div>
          <button 
            onClick={() => addToCart(dealOfTheDay)}
            className="mt-4 bg-lime-600 text-white px-6 py-3 rounded-lg hover:bg-lime-700 transition-colors duration-300 flex items-center gap-2"
          >
            <ShoppingBasket size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Products;
