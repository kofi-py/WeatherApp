// components/WeatherCard.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "react-native-elements";

const WeatherCard = ({ weather }) => {
  return (
    <Card containerStyle={styles.card}>
      <View style={styles.container}>
        <Text style={styles.title}>{weather.location.name}</Text>
        <Text style={styles.temp}>{weather.current.temp_c}°C</Text>
        <Image
          source={{ uri: `https:${weather.current.condition.icon}` }}
          style={styles.icon}
        />
        <Text style={styles.condition}>{weather.current.condition.text}</Text>
        <Text style={styles.details}>
          Humidity: {weather.current.humidity}%
        </Text>
        <Text style={styles.details}>
          Wind Speed: {weather.current.wind_kph} kph
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#ffffff",
    borderColor: "#ffffff",
  },
  container: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    fontSize: 24,
    marginBottom: 10,
    color: "#333",
  },
  temp: {
    fontFamily: "Lato_400Regular",
    fontSize: 48,
    marginBottom: 5,
    color: "#333",
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  condition: {
    fontFamily: "Lato_400Regular",
    fontSize: 16,
    color: "#666",
  },
  details: {
    fontFamily: "Lato_400Regular",
    fontSize: 14,
    color: "#666",
  },
});

export default WeatherCard;
