export const isSessionValid = () => {
    const sessionData = localStorage.getItem('userSession');

    if (!sessionData) {
        return false;
    }

    try {
        const { expiry } = JSON.parse(sessionData);
        const now = new Date().getTime();

        // Check if session has expired
        if (now > expiry) {
            // Clear expired session
            localStorage.removeItem('userSession');
            localStorage.removeItem('token');
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
};

export const clearSession = () => {
    localStorage.removeItem('userSession');
    localStorage.removeItem('token');
};