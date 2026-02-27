
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
    login: async (email, password, role) => {
        await delay(1000); // Simulate network latency

        // Mock validation
        if (email === 'test@example.com' && password === 'password') {
            return {
                user: {
                    id: '1',
                    name: 'Test User',
                    email,
                    role,
                    avatar: 'https://i. Pravatar.cc/150?u=test',
                },
                token: 'mock-jwt-token',
            };
        }

        // Allow any login for demo purposes if not specific test case
        return {
            user: {
                id: Date.now().toString(),
                name: 'Demo User',
                email,
                role,
                avatar: `https://i.pravatar.cc/150?u=${email}`,
            },
            token: 'mock-jwt-token-' + Date.now(),
        };
    },

    register: async (data, role) => {
        await delay(1500);
        // Simulate successful registration
        return {
            user: {
                id: Date.now().toString(),
                ...data,
                role,
                avatar: `https://i.pravatar.cc/150?u=${data.email}`,
            },
            token: 'mock-jwt-token-' + Date.now(),
        };
    },

    forgotPassword: async (email) => {
        await delay(1000);
        return { message: 'Password reset link sent to your email.' };
    }
};
