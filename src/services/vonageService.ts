import { VONAGE_CONFIG } from "../config/vonage";
import axios from "axios";
// Initialize Vonage with Auth

// Initialize Vonage SDK

export interface VerifyRequestResponse {
  request_id: string;
  status: string;
  error_text?: string;
}

export interface VerifyCheckResponse {
  status: string;
  error_text?: string;
}

export interface VerifyCancelResponse {
  status: string;
  error_text?: string;
}

class VonageService {
  /**
   * Send OTP code to phone number
   */
  async sendOTP(phoneNumber: string): Promise<VerifyRequestResponse> {
    try {
      // According to the API docs, this should be a POST request with form data
      const formData = new URLSearchParams();
      formData.append("api_key", VONAGE_CONFIG.API_KEY);
      formData.append("api_secret", VONAGE_CONFIG.API_SECRET);
      formData.append("number", "905355141450");
      formData.append("brand", VONAGE_CONFIG.BRAND_NAME);
      formData.append("code_length", VONAGE_CONFIG.CODE_LENGTH.toString());
      formData.append("pin_expiry", VONAGE_CONFIG.TIMEOUT.toString());

      const response = await axios.post(
        "https://api.nexmo.com/verify/json",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("OTP started:", response.data);
      return response.data; // Contains request_id
    } catch (err: any) {
      console.error("Error sending OTP:", err.response?.data || err.message);
      throw err;
    }
  }
  /**
   * Verify OTP code
   */
  async verifyOTP(
    requestId: string,
    code: string
  ): Promise<VerifyCheckResponse> {
    try {
      const formData = new URLSearchParams();
      formData.append("api_key", VONAGE_CONFIG.API_KEY);
      formData.append("api_secret", VONAGE_CONFIG.API_SECRET);
      formData.append("request_id", requestId);
      formData.append("code", code);

      const response = await axios.post(
        "https://api.nexmo.com/verify/check/json",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("OTP verification result:", response.data);
      return response.data;
    } catch (err: any) {
      console.error("Error verifying OTP:", err.response?.data || err.message);
      throw err;
    }
  }
}

export const vonageService = new VonageService();
export default vonageService;
