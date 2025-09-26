import axios from "axios";
import { VONAGE_CONFIG } from "../config/vonage";
import { VerifyCheckResponse, VerifyRequestResponse } from "../types";

async function sleep(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendOTP(
  phoneNumber: string
): Promise<VerifyRequestResponse> {
  try {
    await sleep(1000);

   /*  const requestData = {
      api_key: VONAGE_CONFIG.API_KEY,
      api_secret: VONAGE_CONFIG.API_SECRET,
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
    ); */

    console.log("OTP started:");
    return {
      request_id: "1234567890",
      status: "0",
    };
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
    await sleep(1000);

    const requestData = {
      api_key: VONAGE_CONFIG.API_KEY,
      api_secret: VONAGE_CONFIG.API_SECRET,
      request_id: requestId,
      code: code,
    };

   /*  const response = await axios.post(
      "https://api.nexmo.com/verify/check/json",
      requestData,
      {
        headers: {
          "Content-Type": "applicatiron/json",
        },
      }
    ); */

    console.log("OTP verification result:");
    return {
      status: "0",
    };
  } catch (err: any) {
    console.error("Error verifying OTP:", err.response?.data || err.message);
    throw err;
  }
}
