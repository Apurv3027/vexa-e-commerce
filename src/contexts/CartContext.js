import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [itemAmount, setItemAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    const { user } = useAuth;

    // Fetch cart from API
    useEffect(() => {
        if (user && user._id) {
            fetchCart(user._id);
        } else {
            setCart([]);
        }
    }, [user]);

    // Calculate total price
    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.product.price * currentItem.quantity;
        }, 0);
        setTotal(total);
    }, [cart]);

    // update item amount
    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.quantity;
            }, 0);
            setItemAmount(amount);
        }
    }, [cart]);

    // Fetch cart from API
    const fetchCart = async (userId) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/cart/${userId}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Cart API Response:', data);

            if (response.ok) {
                if (data.cartResponse && data.cartResponse.items) {
                    setCart(data.cartResponse.items);
                } else if (data.items) {
                    setCart(data.items);
                } else {
                    setCart([]);
                }
            } else {
                toast.error(data.message || "Failed to fetch cart");
                setCart([]);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            toast.error("Error fetching cart: " + error.message);
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    // add to cart
    const addToCart = async (product, quantity = 1) => {
        if (!user || !user._id) {
            toast.error("Please login to add items to cart");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: user._id,
                    productId: product._id,
                    quantity: quantity,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                await fetchCart(user._id);
                toast.success(`${product.title} added to cart successfully!`);
            } else {
                toast.error(data.message || "Failed to add item to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Error adding item to cart");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                fetchCart,
                addToCart,
                itemAmount,
                total,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;