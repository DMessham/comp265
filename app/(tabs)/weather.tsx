import React, { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";

import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';


function WeatherApp() {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Saskatoon'); // Default city

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny', feelsLikeC: 26 },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
    { city: 'Moose Jaw', temperatureC: -261, condition: null },
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
      <ThemedText style={styles.header}>DMessham StormTrac</ThemedText>
        <View style={styles.selectorContainer}>
          <ThemedText style={styles.label}>
            Select a city:
          </ThemedText>
          <Picker
            style={styles.dropdown}
            selectedValue={selectedCity}
            onValueChange={(itemValue) => setSelectedCity(itemValue)}
          >
          {weatherData.map((data, index) => (
            <Picker.Item key={index} value={data.city} label={data.city}>
            </Picker.Item>
          ))}
          </Picker>
            
        </View>
      {selectedWeather ? (
        <ThemedView style={styles.weatherCard}>
          <ThemedText style={styles.city}>{selectedWeather.city}</ThemedText>
          <ThemedText style={styles.temperature}>
            {convertTemperature(selectedWeather.temperatureC)}°{unit}
            <Button 
              onPress={toggleUnit} 
              style={styles.toggleButton} 
              title={`${unit === 'C' ? 'C' : 'F'}`}>
            </Button>
          </ThemedText>
          <ThemedText style={styles.condition}>{selectedWeather.condition}</ThemedText>
        </ThemedView>
      ) : (
        <ThemedText style={styles.loading}>No weather data available for "{selectedCity}" right now.</ThemedText>
      )}
    </ThemedView>
  );


}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    color: '#cacaca',
    flex: 1,
  },
  header: {
    fontSize: 32,
    padding: 16,
    paddingTop: 42,
    paddingBottom: 48,
    marginBottom: 32,
    fontWeight: 800,
    backgroundColor: '#2D3a2d',
  },
  dropdown: {
    color: '#eee',
    flex:2,
  },
  toggleButton: {
    padding: 12,
    cursor: 'pointer',
  },
  selectorContainer: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 5,
    backgroundColor: '#222',
    paddingLeft: 12,
    flexDirection: 'row',
    margin:12,
    position: "absolute",
    top: 72
  },
  label: {
    marginRight: 10,
    fontSize: 16,
    verticalAlign: "middle",
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
    padding: 12,
    margin: 12,
    textAlign: 'left',
  },
  city: {
    fontWeight: 'bold',
    fontSize: 19,
    lineHeight:22,
    color: '#888',
  },
  condition: {
    color: '#ccc',
    fontSize: 24,
    lineHeight:28,
  },
  temperature: {
    fontWeight: 'bold',
    color: '#e9e9e9',
    fontSize: 36,
    lineHeight:42,
    marginTop:52,
    flexDirection: 'row',
  },
  loading: {
    color: '#999',
  },
});

export default WeatherApp;