"use server";

import URLS from "@/lib/constants/urls";
import { apiClient } from "@/lib/utils/apiClient";

export async function signUp(payload) {
  try {
    const url = URLS.AUTH.SIGNUP;
    const options = {
      method: "POST",
      body: JSON.stringify(payload),
    };
    const response = await apiClient(url, options);
    if (!response?.success) {
        return { success: false, message: response?.message || 'Something went wrong', };
    }
    return { success: true, data: response,message: response?.message || 'User registered successfully' };
  } catch (error) {
    console.log("signup error")
  }
}
