import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../contexts/CartContext";
import { ProductContext } from "../../../contexts/ProductContext";
import { useTranslation } from "react-i18next";

const ProductDetails = () => {

    const { t } = useTranslation();

    // get the product id from url
    const { id } = useParams();
    const { addToCart, cart, increaseAmount, decreaseAmount } = useContext(CartContext);
    const { products } = useContext(ProductContext);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [id]);

    // Get the single product from id
    const product = products.find((item) => {
        return item.id === parseInt(id);
    });

    // if product is not found
    if (!product) {
        return (
            <section className="h-screen flex justify-center items-center">
                Loading...
            </section>
        );
    }

    // destructure product
    const { title, price, description, image, category } = product;

    // filter relevant products
    const relevantProducts = products.filter(
        (item) => item.category === category && item.id !== product.id
    );

    // Check if product is in cart
    const cartItem = cart.find((item) => item.id === product.id);
    const isInCart = !!cartItem;

    // Helper function for relevant products
    const getRelevantCartItem = (productId) => {
        return cart.find((item) => item.id === productId);
    };

    return (
        <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                        <img className="max-w-[200px] lg:max-w-xs" src={image} alt={title} />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">{title}</h1>
                        <div className="text-2xl text-red-500 font-medium mb-6">₹ {price}</div>
                        <p className="mb-8">{description}</p>

                        {!isInCart ? (
                            <button
                                onClick={() => addToCart(product, product.id)}
                                className='bg-primary py-4 px-8 text-white rounded-md hover:bg-primary/80 transition'
                            >
                                {t("common.addToCart")}
                            </button>
                        ) : (
                            <div className="flex items-center gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => decreaseAmount(product.id)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold min-w-[40px] text-center">
                                    {cartItem.amount}
                                </span>
                                <button
                                    onClick={() => increaseAmount(product.id)}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md transition"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Relevant Products Section */}
                {relevantProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-semibold mb-6">{t("common.relevantProducts")}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relevantProducts.slice(0, 4).map((item) => {
                                const relevantCartItem = getRelevantCartItem(item.id);
                                const isRelevantInCart = !!relevantCartItem;

                                return (
                                    <div
                                        key={item.id}
                                        className="border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="h-40 object-contain mb-4"
                                        />
                                        <h3 className="font-medium mb-2">{item.title}</h3>
                                        <p className="text-red-500 font-semibold mb-4">₹ {item.price}</p>

                                        {!isRelevantInCart ? (
                                            <button
                                                onClick={() => addToCart(item, item.id)}
                                                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
                                            >
                                                {t("common.addToCart")}
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => decreaseAmount(item.id)}
                                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-md transition"
                                                >
                                                    -
                                                </button>
                                                <span className="text-lg font-semibold min-w-[30px] text-center">
                                                    {relevantCartItem.amount}
                                                </span>
                                                <button
                                                    onClick={() => increaseAmount(item.id)}
                                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-md transition"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductDetails;