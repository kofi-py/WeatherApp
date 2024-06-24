// App.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import WeatherBackground from "./components/WeatherBackground";
import * as SplashScreen from "expo-splash-screen";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { Lato_400Regular } from "@expo-google-fonts/lato";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [weather, setWeather] = useState(null);
  const [locationInput, setLocationInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Lato_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=ce862c3fba774039958125829242406fa&q=${location}`
      );
      setWeather(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        setError(
          "Failed to fetch weather data. Please check the location and try again."
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        setError("No response from the server. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSubmit = () => {
    if (locationInput.trim()) {
      fetchWeatherData(locationInput.trim());
      setLocationInput("");
    } else {
      Alert.alert(
        "Invalid Input",
        "Please enter a valid ZIP code or city name."
      );
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <WeatherBackground condition={weather?.current.condition.text || "Sunny"}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter ZIP code or city name"
          value={locationInput}
          onChangeText={setLocationInput}
        />
        <Button title="Get Weather" onPress={handleLocationSubmit} />
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text style={styles.errorText}>{error}</Text>}
        {weather && !loading && !error && <WeatherCard weather={weather} />}
      </View>
    </WeatherBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Lato_400Regular",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    marginVertical: 10,
  },
});
