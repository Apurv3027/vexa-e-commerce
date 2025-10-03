import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import CartItem from "../../components/home/CartItem";
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";

const Sidebar = () => {
    const { isOpen, handleClose } = useContext(SidebarContext);
    const { cart, itemAmount, total } = useContext(CartContext);

    return (
        <div
            className={`${isOpen ? "right-0" : "-right-full"
                } "w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"`}
        >
            <div className="flex items-center justify-between py-6 border-b">
                <div className="uppercase text-sm font-semibold">Shopping Bag ({itemAmount})</div>
                <div
                    onClick={handleClose}
                    className="cursor-poniter w-8 h-8 flex justify-center items-center"
                >
                    <IoMdArrowForward className="text-2xl" />
                </div>
            </div>
            <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
                {cart.length > 0 ? (
                    cart.map((item) => <CartItem item={item} key={item.id} />)
                ) : (
                    <div className="flex justify-center items-center h-full text-gray-500">
                        Your Cart is empty
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-y-3 mt-1">
                {/* Subtotal */}
                <div className="flex w-full justify-between items-center">
                    <div className="font-semibold">
                        <span className="mr-2">Subtotal:</span>
                    </div>
                    <div className="font-semibold">
                        ₹ {parseFloat(total).toFixed(2)}
                    </div>
                </div>

                {/* VAT 18% */}
                <div className="flex w-full justify-between items-center">
                    <div className="font-semibold">
                        <span className="mr-2">VAT (18%):</span>
                    </div>
                    <div className="font-semibold">
                        ₹ {(parseFloat(total) * 0.18).toFixed(2)}
                    </div>
                </div>

                {/* Total with VAT */}
                <div className="flex w-full justify-between items-center border-t pt-2">
                    <div className="font-bold text-lg">
                        <span className="mr-2">Total:</span>
                    </div>
                    <div className="font-bold text-lg">
                        ₹ {(parseFloat(total) * 1.18).toFixed(2)}
                    </div>
                </div>

                {/* Buttons */}
                {/* <Link
                    to={"/"}
                    className="bg-gray-200 flex p-3 justify-center items-center text-primary w-full font-medium"
                >
                    View Cart
                </Link> */}
                {cart.length > 0 ? (
                    <Link
                        to="/checkout"
                        className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium rounded-lg hover:bg-primary/90 transition"
                        onClick={handleClose}
                    >
                        Checkout
                    </Link>
                ) : (
                    <button
                        disabled
                        className="bg-gray-400 flex p-3 justify-center items-center text-white w-full font-medium rounded-lg cursor-not-allowed opacity-70"
                    >
                        Checkout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Sidebar;