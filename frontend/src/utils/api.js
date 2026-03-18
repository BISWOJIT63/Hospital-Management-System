const BASE_URL = "http://localhost:5000/api";

export const api = {
  login: async (email, password, role) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return {
        user: {
          id: data._id,
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          avatar: data.avatar || null,
          phone: data.phone || null,
          gender: data.gender || null,
          dob: data.dob || null,
          bloodGroup: data.bloodGroup || null,
          status: data.status || null,
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          name: data.fullName || data.name,
          role: role,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Registration failed");
      }

      return {
        user: {
          id: responseData._id,
          _id: responseData._id,
          name: responseData.name,
          email: responseData.email,
          role: responseData.role,
          avatar: responseData.avatar || null,
          phone: responseData.phone || null,
          status: responseData.status || null,
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  getProfile: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch profile");
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
  updateProfile: async (token, profileData) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  getHospitals: async () => {
    const response = await fetch(`${BASE_URL}/hospitals`);
    if (!response.ok) throw new Error("Failed to fetch hospitals");
    return response.json();
  },
  getHospitalById: async (id) => {
    const response = await fetch(`${BASE_URL}/hospitals/${id}`);
    if (!response.ok) throw new Error("Failed to fetch hospital");
    return response.json();
  },
  getClinics: async () => {
    const response = await fetch(`${BASE_URL}/clinics`);
    if (!response.ok) throw new Error("Failed to fetch clinics");
    return response.json();
  },
  getClinicById: async (id) => {
    const response = await fetch(`${BASE_URL}/clinics/${id}`);
    if (!response.ok) throw new Error("Failed to fetch clinic");
    return response.json();
  },
  getDoctors: async () => {
    const response = await fetch(`${BASE_URL}/doctors`);
    if (!response.ok) throw new Error("Failed to fetch doctors");
    return response.json();
  },
  getDoctorById: async (id) => {
    const response = await fetch(`${BASE_URL}/doctors/${id}`);
    if (!response.ok) throw new Error("Failed to fetch doctor");
    return response.json();
  },
  getDoctorProfile: async (token) => {
    try {
      const response = await fetch(
        `${BASE_URL}/doctors/profile?t=${Date.now()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to fetch doctor profile");
      return data;
    } catch (error) {
      throw error;
    }
  },
  submitDoctorRegistration: async (data, token) => {
    try {
      const response = await fetch(`${BASE_URL}/doctors/register-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok)
        throw new Error(responseData.message || "Failed to submit details");
      return responseData;
    } catch (error) {
      throw error;
    }
  },
  getDepartments: async () => {
    const response = await fetch(`${BASE_URL}/hospitals/all/departments`);
    if (!response.ok) throw new Error("Failed to fetch departments");
    return response.json();
  },
  getFacilities: async () => {
    const response = await fetch(`${BASE_URL}/hospitals/all/facilities`);
    if (!response.ok) throw new Error("Failed to fetch facilities");
    return response.json();
  },
  getReviews: async () => {
    const response = await fetch(`${BASE_URL}/hospitals/all/reviews`);
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return response.json();
  },
  getAwards: async () => {
    const response = await fetch(`${BASE_URL}/hospitals/all/awards`);
    if (!response.ok) throw new Error("Failed to fetch awards");
    return response.json();
  },

  createFacility: async (data, token) => {
    try {
      const response = await fetch(`${BASE_URL}/facilities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to create facility");
      return resData;
    } catch (error) {
      throw error;
    }
  },
  getMyFacility: async (token) => {
    try {
      const response = await fetch(
        `${BASE_URL}/facilities/my-facility?t=${Date.now()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch facility");
      return resData;
    } catch (error) {
      throw error;
    }
  },
  updateFacilityStatus: async (id, status, token) => {
    try {
      const response = await fetch(`${BASE_URL}/facilities/${id}/status?t=${Date.now()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to update facility status");
      return resData;
    } catch (error) {
      throw error;
    }
  },
  deleteFacility: async (id, token) => {
    try {
      const response = await fetch(`${BASE_URL}/facilities/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to delete facility");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  getSuperAdminDashboard: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/analytics/superadmin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch superadmin dashboard");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  getServiceReviews: async (serviceId) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/service/${serviceId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch service reviews");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  getFacilityReviews: async (facilityId) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/facility/${facilityId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch facility reviews");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  getDoctorReviews: async (doctorId) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/doctor/${doctorId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch doctor reviews");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  addReview: async (reviewData) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to add review");
      return resData;
    } catch (error) {
      throw error;
    }
  },
  replyToReview: async (reviewId, reply, token) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/${reviewId}/reply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply }),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to reply to review");
      return resData;
    } catch (error) {
      throw error;
    }
  },
  deleteReview: async (reviewId, token) => {
    try {
      const response = await fetch(`${BASE_URL}/reviews/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to delete review");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  // Appointment Endpoints
  createAppointment: async (appointmentData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(appointmentData),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to create appointment");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  getMyAppointments: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/appointments/my-appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch appointments");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  updateAppointmentStatus: async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/appointments/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ status }),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(
          resData.message || "Failed to update appointment status",
        );
      return resData;
    } catch (error) {
      throw error;
    }
  },

  updateAppointmentPaymentStatus: async (id, paymentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/appointments/${id}/payment`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ paymentStatus }),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to update payment status");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  getHospitalById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/hospitals/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch hospital");
      return resData.data || resData;
    } catch (error) {
      throw error;
    }
  },

  getDoctorById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/doctors/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch doctor");
      return resData.data || resData;
    } catch (error) {
      throw error;
    }
  },

  getDoctorAnalytics: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/analytics/doctor-analytics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch doctor analytics");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  getAdminAnalytics: async (token) => {
    try {
      const response = await fetch(`${BASE_URL}/analytics/my-analytics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch admin analytics");
      return resData;
    } catch (error) {
      throw error;
    }
  },

  // Service Endpoints
  getServices: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(
        `${BASE_URL}/services${query ? "?" + query : ""}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        },
      );
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch services");
      return resData.data || resData;
    } catch (error) {
      throw error;
    }
  },

  getServiceById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/services/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to fetch service");
      return resData.data || resData;
    } catch (error) {
      throw error;
    }
  },

  createService: async (serviceData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(serviceData),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to create service");
      return resData.data || resData;
    } catch (error) {
      throw error;
    }
  },

  updateService: async (id, serviceData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(serviceData),
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to update service");
      return resData.data || resData;
    } catch (error) {
      throw error;
    }
  },

  deleteService: async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/services/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      const resData = await response.json();
      if (!response.ok)
        throw new Error(resData.message || "Failed to delete service");
      return resData;
    } catch (error) {
      throw error;
    }
  },
};
