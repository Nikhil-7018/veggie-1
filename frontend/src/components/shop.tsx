import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts, Product as FirebaseProduct, deleteProduct } from "../services/products";
import { useNavigate, Link } from 'react-router-dom';
import { getAuth } from "firebase/auth";

interface CartItem extends FirebaseProduct {
  quantity: number;
}

const Shop = () => {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Starting to fetch products...");
        const fetchedProducts = await getProducts();
        console.log("Products fetched:", fetchedProducts);
        
        // Filter out any products with missing required fields
        const validProducts = fetchedProducts.filter(product => 
          product.name && 
          product.price && 
          product.image && 
          product.category
        );
        
        console.log("Valid products:", validProducts);
        setProducts(validProducts);
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

  const handleAddToCart = (product: FirebaseProduct) => {
    // Fetch the current cart from localStorage
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product is already in the cart
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, increase the quantity
      existingItem.quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Show a success message
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product.id !== productId));
      toast.success("Product deleted successfully!", {
        position: "top-right",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product. Please try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            ← Back to Home
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
        </div>

        <div className="text-center mb-8">
          <Link 
            to="/contact" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg transition duration-300 shadow-md"
          >
            Connect with Farmers
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => {
              console.log("Rendering product:", product);
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="relative h-48">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.category || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name || 'Unnamed Product'}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description || 'No description available'}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-600">₹{product.price?.toFixed(2) || '0.00'}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
                        >
                          Add to Cart
                        </button>
                        {currentUser && currentUser.uid === product.userId && (
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-xl">No products available</p>
              <button
                onClick={() => navigate('/addProduct')}
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
              >
                Add New Product
              </button>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Shop;