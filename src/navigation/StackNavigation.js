import { createStackNavigator } from '@react-navigation/stack';

import Onboard from '../screens/Onboard';
import Home from '../screens/Home';
import Info from '../screens/Info';

import PlaceDetails from '../screens/PlaceDetails';
import Map from '../screens/Map';
import SavedPlaces from '../screens/SavedPlaces';
import PlacesRecommends from '../screens/PlacesRecommends';
import Quiz from '../screens/Quiz';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Info" component={Info} />
      <Stack.Screen name="PlacesRecommends" component={PlacesRecommends} />
      <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="SavedPlaces" component={SavedPlaces} />
      <Stack.Screen name="Quiz" component={Quiz} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
