import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import { Colors } from '@/constants/theme';

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}></Text>
            <Button title="toggle farenheit"></Button>
        </View>
    )
}


const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    text: {
        color: '#cacaca',
    },
    container: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: 'absolute',
    },
  });
  