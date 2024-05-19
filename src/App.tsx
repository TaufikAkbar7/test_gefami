import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import HomeScreen from './presentation/home/HomeScreen';
import OneScreen from './presentation/screen1/OneScreen';
import TwoScreen from './presentation/screen2/TwoScreen';
import ThreeScreen from './presentation/screen3/ThreeScreen';
import FourScreen from './presentation/screen4/FourScreen';

const Stack = createNativeStackNavigator();
const screens = [
  {
    name: 'Home',
    title: 'Home Screen',
    component: HomeScreen
  },
  {
    name: 'One',
    title: 'Answer Question 1-2',
    component: OneScreen
  },
  {
    name: 'Two',
    title: 'Answer Question 3-6',
    component: TwoScreen
  },
  {
    name: 'Three',
    title: 'Answer Question 7-8',
    component: ThreeScreen
  },
  {
    name: 'Four',
    title: 'Answer Question 9',
    component: FourScreen
  },
]

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator>
        {screens.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{title: screen.title}}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
