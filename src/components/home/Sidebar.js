import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowForward } from "react-icons/io";
import CartItem from "../../components/home/CartItem";
import { SidebarContext } from "../../contexts/SidebarContext";
import { CartContext } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
    const { t } = useTranslation();
    const { isOpen, handleClose } = useContext(SidebarContext);
    const { cart, itemAmount, total, loading, fetchCart } = useContext(CartContext);
    const { user, isAuthenticated } = useAuth();
    const [localLoading, setLocalLoading] = useState(false);

    // Refresh cart when sidebar opens
    useEffect(() => {
        if (isOpen && isAuthenticated() && user?._id) {
            refreshCart();
        }
    }, [isOpen, user]);

    const refreshCart = async () => {
        if (user?._id) {
            setLocalLoading(true);
            await fetchCart(user._id);
            setLocalLoading(false);
        }
    };

    return (
        <div
            className={`${isOpen ? "right-0" : "-right-full"
                } "w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]"`}
        >
            <div className="flex items-center justify-between py-6 border-b">
                <div className="uppercase text-sm font-semibold">
                    {t("cart.shoppingBag")} ({itemAmount})
                </div>
                <div className="flex items-center gap-2">
                    {/* Refresh button */}
                    {isAuthenticated() && (
                        <button
                            onClick={refreshCart}
                            disabled={localLoading}
                            className="p-1 rounded hover:bg-gray-100 transition-colors"
                            title="Refresh Cart"
                        >
                            <svg
                                className={`w-4 h-4 ${localLoading ? 'animate-spin' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    )}
                    <div
                        onClick={handleClose}
                        className="cursor-pointer w-8 h-8 flex justify-center items-center hover:bg-gray-100 rounded transition-colors"
                    >
                        <IoMdArrowForward className="text-2xl" />
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {(loading || localLoading) && (
                <div className="flex justify-center items-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            )}

            {/* Not Authenticated State */}
            {!isAuthenticated() && !loading && (
                <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                    <div className="text-gray-500 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <p className="text-lg font-medium mb-2">{t("cart.loginRequired")}</p>
                        <p className="text-sm text-gray-400">{t("cart.loginToView")}</p>
                    </div>
                    <Link
                        to="/login"
                        onClick={handleClose}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        {t("auth.signIn")}
                    </Link>
                </div>
            )}

            {/* Authenticated but Empty Cart */}
            {isAuthenticated() && !loading && cart.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-center px-4">
                    <div className="text-gray-500 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-lg font-medium mb-2">{t("cart.empty")}</p>
                        <p className="text-sm text-gray-400">{t("cart.addItems")}</p>
                    </div>
                    <Link
                        to="/"
                        onClick={handleClose}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        {t("common.continueShopping")}
                    </Link>
                </div>
            )}

            {/* Cart with Items */}
            {isAuthenticated() && !loading && cart.length > 0 && (
                <>
                    <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
                        {cart.map((item) => (
                            <CartItem
                                item={item}
                                key={item._id || item.product?._id}
                            />
                        ))}
                    </div>
                    <div className="flex flex-col gap-y-3 mt-4">
                        {/* Subtotal */}
                        <div className="flex w-full justify-between items-center">
                            <div className="font-semibold">
                                <span className="mr-2">{t("common.subtotal")}:</span>
                            </div>
                            <div className="font-semibold">
                                ₹ {parseFloat(total).toFixed(2)}
                            </div>
                        </div>

                        {/* GST 18% */}
                        <div className="flex w-full justify-between items-center">
                            <div className="font-semibold">
                                <span className="mr-2">{t("common.gst")}:</span>
                            </div>
                            <div className="font-semibold">
                                ₹ {(parseFloat(total) * 0.18).toFixed(2)}
                            </div>
                        </div>

                        {/* Total with GST */}
                        <div className="flex w-full justify-between items-center border-t pt-2">
                            <div className="font-bold text-lg">
                                <span className="mr-2">{t("common.total")}:</span>
                            </div>
                            <div className="font-bold text-lg">
                                ₹ {(parseFloat(total) * 1.18).toFixed(2)}
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium rounded-lg hover:bg-primary/90 transition mt-4"
                            onClick={handleClose}
                        >
                            {t("common.checkout")}
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;