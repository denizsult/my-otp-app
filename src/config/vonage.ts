 export const VONAGE_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_VONAGE_API_KEY || "fd9e816e",
  API_SECRET: process.env.EXPO_PUBLIC_VONAGE_API_SECRET || "8(TF7Q9wxv3%l",

  BRAND_NAME: "Transform Credit",

  CODE_LENGTH: 6,
  TIMEOUT: 300, // 5 minutes in seconds
  MAX_ATTEMPTS: 3,
};
