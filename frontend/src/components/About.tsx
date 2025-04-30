import '../index.css';
import Shop from './shop';
function Body() {
    return (
        <div className="m-16" id="about">
           <div className="grid grid-cols-4 gap-6 text-center">
  <div className="flex flex-col items-center">
    <img src="./images/shipping.jpg" alt="Free Shipping" className="h-40 w-40 hover:scale-110 transition-transform duration-300 ease-in-out" />
    <p className="font-bold text-lg mt-2">FREE SHIPPING</p>
    <p className="text-gray-600 text-sm">ON ORDER OVER Rs. 200</p>
  </div>

  <div className="flex flex-col items-center">
    <img src="./images/fresh.jpg" alt="Always Fresh" className="h-40 w-40 hover:scale-110 transition-transform duration-300 ease-in-out" />
    <p className="font-bold text-lg mt-2">ALWAYS FRESH</p>
    <p className="text-gray-600 text-sm">PRODUCT WELL PACKAGE</p>
  </div>

  <div className="flex flex-col items-center">
    <img src="./images/quality.jpg" alt="Superior Quality" className="h-40 w-40 hover:scale-110 transition-transform duration-300 ease-in-out" />
    <p className="font-bold text-lg mt-2">SUPERIOR QUALITY</p>
    <p className="text-gray-600 text-sm">QUALITY PRODUCTS</p>
  </div>

  <div className="flex flex-col items-center">
    <img src="./images/organicfood.jpg" alt="Organic" className="h-40 w-40 hover:scale-110 transition-transform duration-300 ease-in-out" />
    <p className="font-bold text-lg mt-2">ORGANIC</p>
    <p className="text-gray-600 text-sm">100% ORGANIC</p>
  </div>
</div>


            <div className="grid grid-cols-3 m-30 gap-2">
                <div className="relative">
                    <img src="./public/images/fruits.jpg" alt="Image 1" className="h-72 w-72 object-cover" />
                    <p className="absolute bottom-2 left-2 text-white text-2xl font-bold p-2 bg-lime-600">
                        Fruits
                    </p>
                </div>

                <div className='text-center p-4'>
                    <h1 className="text-2xl font-bold text-lime-500 p-2">Vegetables</h1>
                    <p className='text-gray-600 p-4'>Protect the health of every home</p>
                    <button className="bg-lime-400 text-white px-4 py-2 rounded-2xl hover:bg-lime-600 transition-colors duration-300" onClick={() => window.location.href = '/shop'}>Shop now</button>
                </div>

                <div className="relative">
                    <img src="./public/images/organic.jpg" alt="Image 1" className="h-72 w-72 object-cover" />
                    <p className="absolute bottom-2 left-2 text-white text-2xl font-bold p-2 bg-lime-600">
                        Organic 
                    </p>
                </div>

                <div className="relative">
                    <img src="./public/images/vege.jpg" alt="Image 1" className="h-72 w-72 object-cover" />
                    <p className="absolute bottom-2 left-2 text-white text-2xl font-bold p-2 bg-lime-600">
                        Vegetables
                    </p>
                </div>

                <div className="relative">
                    <img src="./public/images/grains.jpg" alt="Image 1" className="h-72 w-72 object-cover" />
                    <p className="absolute bottom-2 left-2 text-white text-2xl font-bold p-2 bg-lime-600">
                        Grains
                    </p>
                </div>

                <div className="relative">
                    <img src="./public/images/dries.jpg" alt="Image 1" className="h-72 w-72 object-cover" />
                    <p className="absolute bottom-2 left-2 text-white text-2xl font-bold p-2 bg-lime-600">
                        Dried
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Body;
