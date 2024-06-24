// components/WeatherBackground.js
import React from "react";
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const WeatherBackground = ({ condition, children }) => {
  const getGradientColors = (condition) => {
    switch (condition) {
      case "Sunny":
        return ["#FFD700", "#FFA500"];
      case "Cloudy":
        return ["#D3D3D3", "#808080"];
      case "Rainy":
        return ["#87CEEB", "#4682B4"];
      default:
        return ["#ffffff", "#000000"];
    }
  };

  return (
    <LinearGradient
      colors={getGradientColors(condition)}
      style={styles.background}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});

export default WeatherBackground;
