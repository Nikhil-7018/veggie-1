import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProducts, Product as FirebaseProduct } from "../services/products";

interface CartItem extends FirebaseProduct {
  quantity: number;
}

const Shop = () => {
  const [products, setProducts] = useState<FirebaseProduct[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    toast.success("Cart cleared successfully!", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading products...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <ToastContainer />
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shop</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-green-600 font-bold mt-2">${product.price}</p>
                <p className="text-gray-500 text-sm mt-1">Category: {product.category}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products available
            </div>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleClearCart}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default Shop;