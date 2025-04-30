import "../index.css";
import { Heart, ShoppingBasket, ListCollapse } from "lucide-react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Products = () => {
  const products = [
    { id: 1, name: "Tomato", price: 40, image: "/images/tomato.jpg" },
    { id: 2, name: "Potato", price: 25, image: "/images/tomato.jpg" },
    { id: 3, name: "Carrot", price: 30, image: "/images/tomato.jpg" },
    { id: 4, name: "Broccoli", price: 50, image: "/images/tomato.jpg" },
    { id: 5, name: "Cabbage", price: 35, image: "/images/tomato.jpg" },
    { id: 6, name: "Onion", price: 20, image: "/images/tomato.jpg" },
    { id: 7, name: "Spinach", price: 15, image: "/images/tomato.jpg" },
    { id: 8, name: "Capsicum", price: 45, image: "/images/tomato.jpg" },
  ];

  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        toast.info(`${product.name} quantity updated!`, { position: "top-right",autoClose: 500, }); 
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      toast.info(`${product.name} quantity added Successfully!`, { position: "top-right",autoClose: 500, }); 
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

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
        {products.map((product) => (
          <div key={product.id} className="relative group p-2 w-52">
            {/* Product Image */}
            <img src={product.image} alt={product.name} className="w-full hover:scale-110 transition-transform duration-300 ease-in-out" />
            {/* Product Name */}
            <p className="font-bold text-center p-2">{product.name}</p>
            {/* Price (Hidden on Hover) */}
            <p className="text-center text-lime-600 text-sm p-2 group-hover:opacity-0 transition-opacity duration-300">${product.price.toFixed(2)}</p>
            {/* Icons - Positioned Over the Price */}
            <div className="absolute left-1/2 bottom-2 transform -translate-x-1/2 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <Heart size={18} />
              </button>
              <button onClick={() => addToCart(product)}  className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <ShoppingBasket size={18} />
              </button>
              <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200 transition">
                <ListCollapse size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

       
        <div className="flex -mt-30 justify-between items-center px-16">
        <div className="relative w-1/2">
    <img src="./public/images/cabbage.jpg" alt="Image 1" className="h-96 w-full object-cover rounded-lg shadow-md" />
  </div>
  {/* Text Content on the Left */}
  <div className="w-1/2 p-8">
    <h1 className="text-lime-700 text-xl py-2">Best Price For You</h1>
    <p className="font-bold text-5xl py-4">Deal of the Day</p>
    <p className="text-gray-500 py-4">
      Far far away, behind the word mountains, far from the countries Vokalia and Consonantia
    </p>
    <p className="text-lime-700 py-2 text-3xl">Cabbage</p>
    <div className="flex gap-1 py-2">
      <p className="text-gray-500">Was $10</p>
      <p className="text-lime-700">Now $5 only</p>
    </div>
  </div>

  
</div>

        
</>
    )
};
export default Products;
