import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL + "/auth";

export const registerAPI = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error("Register API Error:", error);
    throw error;
  }
};

export const loginAPI = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, data);

    if (response.data.success && response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user || {}));
    }

    return response.data;
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
};

export const getProfileAPI = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/profile`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Get Profile API Error:", error);
    throw error;
  }
};

export const logoutAPI = async () => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
};