import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Modal, FlatList } from "react-native";
import { ChevronDown, Phone, Check } from "lucide-react-native";
import { useOTPStore } from "../stores/otpStore";

interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

interface PhoneInputProps {
  placeholder?: string;
  disabled?: boolean;
}

const countries: Country[] = [
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
];

export default function PhoneInput({
  placeholder = "Enter phone number",
  disabled = false,
}: PhoneInputProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const { phoneNumber, countryCode, setPhoneNumber, setCountryCode } = useOTPStore();
  
  const selectedCountry = countries.find(country => country.dialCode === countryCode) || countries[0];

  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.dialCode);
    setModalVisible(false);
  };

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const digits = text.replace(/\D/g, "");
    return digits;
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  return (
    <View className="w-full">
      <View className="relative">
        {/* Main Input Container */}
        <View
          className={`
            flex-row items-center border rounded-lg px-3 py-3 bg-white
            border-gray-200
            ${disabled ? "opacity-50" : ""}
          `}
        >
          {/* Country Code Button */}
          <Pressable
            onPress={() => !disabled && setModalVisible(true)}
            disabled={disabled}
            className="flex-row items-center mr-3"
          >
            <View className="flex-row items-center">
              <Text className="text-lg mr-2">{selectedCountry.flag}</Text>
              <Text className="text-black text-base font-medium mr-1">
                {selectedCountry.dialCode}
              </Text>
              <ChevronDown size={16} color="#666666" />
            </View>
          </Pressable>

          {/* Separator */}
          <View className="w-px h-6 bg-gray-200 mr-3" />

          {/* Phone Number Input */}
          <View className="flex-1 mb-1">
            <TextInput
              value={phoneNumber}
              onChangeText={handlePhoneChange}
              placeholder={placeholder}
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              autoComplete="tel"
              editable={!disabled}
              className="text-black text-base font-normal"
              style={{ fontFamily: "System" }}
            />
          </View>

          {/* Phone Icon */}
          <Phone size={20} color="#9CA3AF" />
        </View>

      </View>

      {/* Helper Text */}
      <Text className="text-gray-500 text-xs mt-2 ml-1">
        Enter your phone number with country code
      </Text>

      {/* Country Selection Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-4">
          <View className="bg-white rounded-lg w-full max-w-sm max-h-96">
            {/* Modal Header */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-black">Select Country</Text>
              <Pressable
                onPress={() => setModalVisible(false)}
                className="p-1"
              >
                <Text className="text-gray-500 text-lg">✕</Text>
              </Pressable>
            </View>

            {/* Country List */}
            <FlatList
              data={countries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => handleCountrySelect(item)}
                  className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100"
                >
                  <View className="flex-row items-center">
                    <Text className="text-lg mr-3">{item.flag}</Text>
                    <View>
                      <Text className="text-black font-medium">{item.name}</Text>
                      <Text className="text-gray-500 text-sm">{item.dialCode}</Text>
                    </View>
                  </View>
                  {selectedCountry.code === item.code && (
                    <Check size={20} color="#000000" />
                  )}
                </Pressable>
              )}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
