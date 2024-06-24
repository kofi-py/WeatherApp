// App.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
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
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Lato_400Regular,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    fetchWeatherData("New York");
  }, []);

  const fetchWeatherData = async (location) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=46cc74cfb474cdee46259cd9ff1861b1&q=${location}`
      );
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert(
        "Error",
        "Failed to fetch weather data. Please check the location and try again."
      );
    }
  };

  const handleLocationSubmit = () => {
    if (locationInput.trim()) {
      fetchWeatherData(locationInput);
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
        {weather && !loading && <WeatherCard weather={weather} />}
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
});
