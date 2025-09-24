 export const VONAGE_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_VONAGE_API_KEY || "aedba2c7",
  API_SECRET: process.env.EXPO_PUBLIC_VONAGE_API_SECRET || "xOn0iSVLjgBaHISs",

  BRAND_NAME: "Transform Credit",

  CODE_LENGTH: 6,
  TIMEOUT: 300, // 5 minutes in seconds
  MAX_ATTEMPTS: 3,
};
