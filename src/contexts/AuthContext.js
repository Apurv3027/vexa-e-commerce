import React, { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    // Check for existing token on app start
    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Send OTP
    const sendOtp = async (phoneNumber) => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/send-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phoneNumber: `+91${phoneNumber}` }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("OTP sent successfully!");
                return { success: true };
            } else {
                toast.error(data.message || "Failed to send OTP");
                return { success: false, error: data.message };
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
            toast.error("Failed to send OTP");
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Verify OTP and login
    const verifyOtp = async (phoneNumber, otp) => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phoneNumber: `+91${phoneNumber}`,
                    otp
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store token and user data
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                setToken(data.token);
                setUser(data.user);

                toast.success("Login successful!");
                return { success: true, user: data.user };
            } else {
                toast.error(data.message || "Invalid OTP");
                return { success: false, error: data.message };
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            toast.error("Failed to verify OTP");
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
        toast.success("Logged out successfully!");
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!token && !!user;
    };

    const value = {
        user,
        token,
        loading,
        sendOtp,
        verifyOtp,
        logout,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;