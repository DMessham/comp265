import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'lightgray', justifyContent: 'center', alignItems: 'center' }}>
        <Text>This text is inside a SafeAreaView</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;