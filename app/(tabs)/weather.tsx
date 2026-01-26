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

  const convertTemperature = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  let unitToggleText = `Toggle to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>Weather App</ThemedText>
      <Button onPress={toggleUnit} style={styles.toggleButton} title={<Text>Toggle to {unit === 'C' ? 'Fahrenheit' : 'Celsius'}</Text>}>
      </Button>
      <ThemedView style={styles.selectorContainer}>
        <ThemedText style={styles.label}>
          Select a city:
        </ThemedText>

        <View style={{ padding: 2, margin: 3 }}>
          <Picker
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
          >
            {weatherData.map((data, index) => (
            <Picker.Item key={index} value={data.city} label={data.city}>
              label={data.city}
            </Picker.Item>
          ))}
          </Picker>
          <ThemedText style={{ marginTop: 10 }}>Selected: {selectedCity}</ThemedText>
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
    padding: '20px',
    color: '#cacaca',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  toggleButton: {
    padding: '10px',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  selectorContainer: {
    marginBottom: '20px',
  },
  label: {
    marginRight: '10px',
    fontSize: '1rem',
  },
  selector: {
    padding: '5px',
    fontSize: '1rem',
  },
  weatherCard: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    margin: '10px',
    width: '200px',
    textAlign: 'left',
    background: '#111'
  },
  city: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  condition: {
    fontSize: '1rem',
    color: '#888',
  },
  temperature: {
    fontSize: '1.1rem',
    color: '#aaa',
  },
  loading: {
    fontSize: '1rem',
    color: '#999',
  },
});

export default WeatherApp;