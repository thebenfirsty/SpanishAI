import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './StartScreen';
import BaristaScreen from './BaristaScreen';
import PrivacySupport from "./privacy.js";


const Stack = createNativeStackNavigator();

const App = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="Ordering Coffee" component={BaristaScreen} />
          <Stack.Screen name="Privacy and Support" component={PrivacySupport} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default App;

