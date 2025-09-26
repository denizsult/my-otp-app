import axios from "axios";
import { VONAGE_CONFIG } from "../config/vonage";
import { VerifyCheckResponse, VerifyRequestResponse } from "../types";
import { useApiConfigStore } from "../stores/apiConfigStore";

async function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendOTP(
  phoneNumber: string
): Promise<VerifyRequestResponse> {
  try {
    const { apiKey, apiSecret } = useApiConfigStore.getState();
    
    if (!apiKey || !apiSecret) {
      throw new Error("API credentials not configured. Please set up your API key and secret.");
    }

    const requestData = {
      api_key: apiKey,
      api_secret: apiSecret,
      number: phoneNumber,
      brand: VONAGE_CONFIG.BRAND_NAME,
      code_length: VONAGE_CONFIG.CODE_LENGTH,
      pin_expiry: VONAGE_CONFIG.TIMEOUT,
    };

    const response = await axios.post(
      "https://api.nexmo.com/verify/json",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OTP started:");
    return response.data;
  } catch (err: any) {
    console.error("Error sending OTP:", err.response?.data || err.message);
    throw err;
  }
}

export async function verifyOTP(
  requestId: string,
  code: string
): Promise<VerifyCheckResponse> {
  try {
    const { apiKey, apiSecret } = useApiConfigStore.getState();
    
    if (!apiKey || !apiSecret) {
      throw new Error("API credentials not configured. Please set up your API key and secret.");
    }

    const requestData = {
      api_key: apiKey,
      api_secret: apiSecret,
      request_id: requestId,
      code: code,
    };

    const response = await axios.post(
      "https://api.nexmo.com/verify/check/json",
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OTP verification result:");
    return response.data;
  } catch (err: any) {
    console.error("Error verifying OTP:", err.response?.data || err.message);
    throw err;
  }
}
