import '../index.css';
import { useNavigate } from 'react-router-dom';

function Body() {
    const navigate = useNavigate();
    
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                        <img src="/images/shipping.jpg" alt="Free Shipping" className="h-32 w-32 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                        <p className="font-bold text-lg mb-2">FREE SHIPPING</p>
                        <p className="text-gray-600 text-sm">ON ORDER OVER Rs. 200</p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                        <img src="/images/fresh.jpg" alt="Always Fresh" className="h-32 w-32 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                        <p className="font-bold text-lg mb-2">ALWAYS FRESH</p>
                        <p className="text-gray-600 text-sm">PRODUCT WELL PACKAGE</p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                        <img src="/images/quality.jpg" alt="Superior Quality" className="h-32 w-32 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                        <p className="font-bold text-lg mb-2">SUPERIOR QUALITY</p>
                        <p className="text-gray-600 text-sm">QUALITY PRODUCTS</p>
                    </div>

                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                        <img src="/images/organicfood.jpg" alt="Organic" className="h-32 w-32 mb-4 hover:scale-110 transition-transform duration-300 ease-in-out" />
                        <p className="font-bold text-lg mb-2">ORGANIC</p>
                        <p className="text-gray-600 text-sm">100% ORGANIC</p>
                    </div>
                </div>

                {/* Product Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="relative group">
                        <img src="/images/fruits.jpg" alt="Fruits" className="w-full h-72 object-cover rounded-lg" />
                        <p className="absolute bottom-4 left-4 text-white text-2xl font-bold p-2 bg-lime-600 rounded">
                            Fruits
                        </p>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h1 className="text-2xl font-bold text-lime-500 mb-4">Vegetables</h1>
                        <p className="text-gray-600 mb-6">Protect the health of every home</p>
                        <button 
                            className="bg-lime-400 text-white px-6 py-2 rounded-full hover:bg-lime-600 transition-colors duration-300"
                            onClick={() => navigate('/shop')}
                        >
                            Shop now
                        </button>
                    </div>

                    <div className="relative group">
                        <img src="/images/organic.jpg" alt="Organic" className="w-full h-72 object-cover rounded-lg" />
                        <p className="absolute bottom-4 left-4 text-white text-2xl font-bold p-2 bg-lime-600 rounded">
                            Organic
                        </p>
                    </div>

                    <div className="relative group">
                        <img src="/images/vege.jpg" alt="Vegetables" className="w-full h-72 object-cover rounded-lg" />
                        <p className="absolute bottom-4 left-4 text-white text-2xl font-bold p-2 bg-lime-600 rounded">
                            Vegetables
                        </p>
                    </div>

                    <div className="relative group">
                        <img src="/images/grains.jpg" alt="Grains" className="w-full h-72 object-cover rounded-lg" />
                        <p className="absolute bottom-4 left-4 text-white text-2xl font-bold p-2 bg-lime-600 rounded">
                            Grains
                        </p>
                    </div>

                    <div className="relative group">
                        <img src="/images/dries.jpg" alt="Dried" className="w-full h-72 object-cover rounded-lg" />
                        <p className="absolute bottom-4 left-4 text-white text-2xl font-bold p-2 bg-lime-600 rounded">
                            Dried
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Body;