import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProduct, Product as FirebaseProduct } from "../services/products";
import { getAuth } from "firebase/auth";

const AddProduct = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [product, setProduct] = useState<Omit<FirebaseProduct, 'id'>>(() => ({
    name: "",
    price: 0,
    image: "",
    description: "",
    category: "",
    userId: currentUser?.uid || "",
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProduct((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("You must be logged in to add a product", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (!product.name || !product.price || !product.image || !product.description || !product.category) {
      toast.error("Please fill out all fields and upload an image", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    try {
      const productWithUserId = {
        ...product,
        userId: currentUser.uid,
      };

      console.log("Attempting to add product:", productWithUserId);
      const productId = await addProduct(productWithUserId);
      console.log("Product added successfully with ID:", productId);

      toast.success(`Product "${product.name}" added successfully!`, {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/shop");
      }, 1500);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Error adding product. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="vegetables">Vegetables</option>
                  <option value="fruits">Fruits</option>
                  <option value="dairy">Dairy</option>
                  <option value="grains">Grains</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter product description"
                rows={4}
                required
              />
            </div>

            {product.image && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image Preview</label>
                <img
                  src={product.image}
                  alt="Preview"
                  className="max-w-xs h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg shadow-md transition duration-300 text-lg font-semibold"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;