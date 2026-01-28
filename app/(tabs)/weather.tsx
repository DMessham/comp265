import React, { useState } from 'react';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from "@/components/themed-view";

import { Picker } from '@react-native-picker/picker';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';

function alertMSG(temp:number) {
  if(temp < -260) {
    return(`THE UNIVERSE HAS BROKEN, GOOD LUCK!`)
  }else if(temp == -69 || temp == 69){
    return("nice")
  }else if(temp < -50){
    return(`🧊🧊🧊\n"It's the end of the world as we know it\n It's the end of the world as we know it\n It's the end of the world as we know it, and I feel fine"\nfrom R.E.M`)
  }else if(temp < -45){
    return("Congrats on the new record! Try not to freeze!")
  }else if(temp < -32){
    return("Cover up exposed skin to avoid frostbite, Exposed skin can freeze in less than 3 minutes")
  }else if(temp < -20){
    return("Cover up exposed skin to avoid frostbite.")
  }else if(temp < -5){
    return("Remember to wear layers you can remove if you start to overheat, especially if you plan on being physically active.")
  }else if(temp < 5){
    return("Watch out for ice!\nRemember to wear layers you can remove if you start to overheat, especially if you plan on being physically active.")
  }else if(temp < 9){
    return("Remember to wear layers you can remove if you start to overheat, especially if you plan on being physically active.")
  }else if(temp < 15){
    return("It's a nice day today, Maybe wear a light sweater")
  }else if(temp < 20){
    return("Spending a lot of time outdoors? Remember to bring water")
  }else if(temp < 25){
    return("Spending time outdoors? Remember to bring water & electrolytes")
  }else if(temp < 30){
    return("Remember to take breaks when outside and get some electrolytes with your water!")
  }else if(temp < 45){
    return("Take frequent breaks from the outdoors and remember to get some electrolytes with your water!")
  }else if(temp > 60){
    return(`Are you on fire yet?\n"It's the end of the world as we know it\nIt's the end of the world as we know it\nIt's the end of the world as we know it, and I feel fine"\n from R.E.M`)
  }else if(temp > 45){
    return("Congrats on the new record! Try not to overheat!")
  }else if(temp == 420){
    return("Heeyyy man")
  }else if(temp == 666){
    return("REPENT!!! THE END IS NIGH\NAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
  } else{
    return("We don't know what to say!\nSomething has broken, Please let us know about this, and include info about your location, internet connection, and device so we can fix it.")
  }
}


function WeatherApp() {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Saskatoon'); // Default city

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny', feelsLikeC: 26 },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: -200, condition: 'Rainy' },
    { city: 'Moose Jaw', temperatureC: -61, condition: null},
  ];

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (tempC: number) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  let weatherAlert = null

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.header}>
        DMessham StormTrac
        
      </ThemedText>
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

          <ThemedText>
            {alertMSG(selectedWeather.temperatureC)}
          </ThemedText>

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
    marginBottom: 32,
    fontWeight: 800,
    backgroundColor: '#2D3a2d',
    minHeight: 116,
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
    ...StyleSheet.absoluteFillObject,
    top: 72,
    height: 56
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