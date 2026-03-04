const BASE_URL = 'http://localhost:5000/api';

export const api = {
    login: async (email, password, role) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Include role if required by backend logic (though backend finds user by email)
                body: JSON.stringify({ email, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            return {
                user: {
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    avatar: data.avatar || null,
                },
                token: data.token,
            };
        } catch (error) {
            throw error;
        }
    },

    register: async (data, role) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    name: data.fullName || data.name, // Handle depending on form input names
                    role: role
                }),
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Registration failed');
            }

            return {
                user: {
                    id: responseData._id,
                    name: responseData.name,
                    email: responseData.email,
                    role: responseData.role,
                    avatar: responseData.avatar || null,
                },
                token: responseData.token,
            };
        } catch (error) {
            throw error;
        }
    },

    forgotPassword: async (email) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send reset email');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    resetPassword: async (token, password) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to reset password');
            }

            return data;
        } catch (error) {
            throw error;
        }
    },

    getProfile: async (token) => {
        try {
            const response = await fetch(`${BASE_URL}/auth/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch profile');
            }

            return {
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                avatar: data.avatar || null,
            };
        } catch (error) {
            throw error;
        }
    },

    // --- Dynamic Data Fetching ---
    getHospitals: async () => {
        const response = await fetch(`${BASE_URL}/hospitals`);
        if (!response.ok) throw new Error('Failed to fetch hospitals');
        return response.json();
    },
    getHospitalById: async (id) => {
        const response = await fetch(`${BASE_URL}/hospitals/${id}`);
        if (!response.ok) throw new Error('Failed to fetch hospital');
        return response.json();
    },
    getDoctors: async () => {
        const response = await fetch(`${BASE_URL}/doctors`);
        if (!response.ok) throw new Error('Failed to fetch doctors');
        return response.json();
    },
    getDoctorById: async (id) => {
        const response = await fetch(`${BASE_URL}/doctors/${id}`);
        if (!response.ok) throw new Error('Failed to fetch doctor');
        return response.json();
    },
    getDepartments: async () => {
        const response = await fetch(`${BASE_URL}/departments`);
        if (!response.ok) throw new Error('Failed to fetch departments');
        return response.json();
    },
    getFacilities: async () => {
        const response = await fetch(`${BASE_URL}/facilities`);
        if (!response.ok) throw new Error('Failed to fetch facilities');
        return response.json();
    },
    getReviews: async () => {
        const response = await fetch(`${BASE_URL}/reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        return response.json();
    },
    getAwards: async () => {
        const response = await fetch(`${BASE_URL}/awards`);
        if (!response.ok) throw new Error('Failed to fetch awards');
        return response.json();
    },

    // --- Facility Onboarding ---
    createFacility: async (data, token) => {
        try {
            const response = await fetch(`${BASE_URL}/facilities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message || 'Failed to create facility');
            return resData;
        } catch (error) {
            throw error;
        }
    },
    getMyFacility: async (token) => {
        try {
            const response = await fetch(`${BASE_URL}/facilities/my-facility`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message || 'Failed to fetch facility');
            return resData;
        } catch (error) {
            throw error;
        }
    },

    // --- Analytics ---
    getAdminAnalytics: async (token) => {
        try {
            const response = await fetch(`${BASE_URL}/analytics/my-analytics`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message || 'Failed to fetch analytics');
            return resData;
        } catch (error) {
            throw error;
        }
    },

    // --- Reviews ---
    getFacilityReviews: async (facilityId) => {
        try {
            const response = await fetch(`${BASE_URL}/reviews/facility/${facilityId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message || 'Failed to fetch reviews');
            return resData;
        } catch (error) {
            throw error;
        }
    },
    addReview: async (reviewData) => {
        try {
            const response = await fetch(`${BASE_URL}/reviews`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData)
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message || 'Failed to add review');
            return resData;
        } catch (error) {
            throw error;
        }
    },
    replyToReview: async (reviewId, reply, token) => {
        try {
            const response = await fetch(`${BASE_URL}/reviews/${reviewId}/reply`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ reply })
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message || 'Failed to reply to review');
            return resData;
        } catch (error) {
            throw error;
        }
    },
    deleteReview: async (reviewId, token) => {
        try {
            const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.message || 'Failed to delete review');
            return resData;
        } catch (error) {
            throw error;
        }
    }
};
