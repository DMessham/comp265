import React, { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";

import { Picker } from '@react-native-picker/picker';

import { View, Text, StyleSheet, Button } from 'react-native';

import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Switch,
    TextInput
} from "react-native";


function WeatherApp() {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Saskatoon'); // Default city

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
  ];

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (tempC: number) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>Weather App</ThemedText>
      <ThemedView style={styles.selectorContainer}>
        
        <Button 
          onPress={toggleUnit} 
          style={styles.toggleButton} 
          title={<Text>Switch to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}</Text>}>
        </Button>

        <View style={{ padding: 2, margin: 3 }}>
          <ThemedText style={styles.label}>
            Select a city:
          </ThemedText>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
          >
          {weatherData.map((data, index) => (
            <Picker.Item key={index} value={data.city} label={data.city}>
            </Picker.Item>
          ))}
          </Picker>
        </View>
      </ThemedView>
      {selectedWeather ? (
        <ThemedView style={styles.weatherCard}>
          <ThemedText style={styles.city}>{selectedWeather.city}</ThemedText>
          <ThemedText style={styles.condition}>{selectedWeather.condition}</ThemedText>
          <ThemedText style={styles.temperature}>
            {convertTemperature(selectedWeather.temperatureC)}°{unit}
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedText style={styles.loading}>No weather data available</ThemedText>
      )}
    </ThemedView>
  );


}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: 20,
    color: '#cacaca',
  },
  header: {
    fontSize: 32,
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    marginBottom: 20,
    cursor: 'pointer',
  },
  selectorContainer: {
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
    fontSize: 14,
  },
  selector: {
    padding: 5,
    fontSize: 15,
  },
  weatherCard: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 5,
    backgroundColor: '#222',
    padding: 10,
    margin: 5,
    width: 200,
    textAlign: 'left',
  },
  city: {
    fontWeight: 'bold',
  },
  condition: {
    color: '#888',
  },
  temperature: {
    color: '#aaa',
  },
  loading: {
    color: '#999',
  },
});

export default WeatherApp;