import "../index.css";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const totalBill = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    toast(`Total Bill: $${totalBill.toFixed(2)}\nThank you for your purchase!`, { position: "top-center" });
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h1 className="text-2xl font-bold text-center mb-4">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-3">
                <span>{item.name} (x{item.quantity})</span>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  className="w-12 p-1 border rounded text-center"
                />
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between mt-4 font-bold">
            <span>Total:</span>
            <span>${totalBill.toFixed(2)}</span>
          </div>

          <button onClick={handleCheckout} className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
