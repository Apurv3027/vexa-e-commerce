import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../../contexts/CartContext";
import { ProductContext } from "../../contexts/ProductContext";

const Product = () => {
    const { addToCart } = useContext(CartContext);

    const { products } = useContext(ProductContext);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((item, index) => (
                <div>
                    <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-[200px] mx-auto flex justify-center items-center">
                                <img
                                    className="max-h-[160px] group-hover:scale-110 transition duration-300"
                                    src={item.image}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <button onClick={() => handleAddToCart(item)}>
                                <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
                                    <BsPlus className="text-3xl" />
                                </div>
                            </button>
                            <Link
                                to={`/product/${item._id}`}
                                className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
                            >
                                <BsEyeFill />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="tex-sm capitalize text-gray-500 mb-1">{item.category}</div>
                        <Link to={`/product/${item._id}`}>
                            <h2 className="font-semibold mb-1">{item.title}</h2>
                        </Link>
                        <h2 className="font-semibold">₹ {item.price}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Product;