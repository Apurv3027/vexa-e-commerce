// import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
// import { CartContext } from "../../contexts/CartContext";
// import { useAuth } from "../../contexts/AuthContext";

const CartItem = ({ item }) => {
    // const { removeFromCart, updateCartQuantity } = useContext(CartContext);
    // const { isAuthenticated } = useAuth();

    const product = item.product || item;
    const quantity = item.quantity || 1;

    // const handleRemove = () => {
    //     if (isAuthenticated() && product._id) {
    //         removeFromCart(product._id);
    //     }
    // };

    // const handleIncrease = () => {
    //     if (isAuthenticated() && product._id) {
    //         updateCartQuantity(product._id, quantity + 1);
    //     }
    // };

    // const handleDecrease = () => {
    //     if (isAuthenticated() && product._id) {
    //         updateCartQuantity(product._id, quantity - 1);
    //     }
    // };

    return (
        <div className="flex gap-x-4 py-2 lg:px-2 border-b border-gray-200 w-full font-light text-gray-500">
            <div className="w-full min-h-[150px] flex items-center gap-x-4">
                {/* Product Image */}
                <Link to={`/product/${product._id}`}>
                    <img
                        className="max-w-[80px]"
                        src={product.image}
                        alt={product.title}
                    />
                </Link>

                <div className="w-full flex flex-col">
                    <div className="flex justify-between mb-2">
                        {/* Product Title */}
                        <Link
                            to={`/product/${product._id}`}
                            className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline"
                        >
                            {product.title}
                        </Link>

                        {/* Remove button */}
                        <div
                            // onClick={handleRemove}
                            className="text-xl cursor-pointer hover:text-red-500 transition-all"
                        >
                            <IoMdClose className="text-gray-500 hover:text-red-500" />
                        </div>
                    </div>

                    <div className="flex gap-x-2 h-[36px] text-sm">
                        {/* Quantity Controls */}
                        <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
                            <div
                                // onClick={handleDecrease}
                                className="flex-1 h-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
                            >
                                <IoMdRemove />
                            </div>
                            <div className="h-full flex justify-center items-center px-2">
                                {quantity}
                            </div>
                            <div
                                // onClick={handleIncrease}
                                className="flex-1 h-full flex justify-center items-center cursor-pointer hover:bg-gray-100"
                            >
                                <IoMdAdd />
                            </div>
                        </div>

                        {/* Item Price */}
                        <div className="flex-1 flex items-center justify-around">
                            ₹ {product.price}
                        </div>

                        {/* Final Price */}
                        <div className="flex-1 flex items-center justify-end font-medium">
                            ₹ {(product.price * quantity).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;