import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/login/LoginScreen';
import SignUpScreen from './src/screens/signup/SignUpScreen';
import SplashScreen from './src/screens/splash/SplashScreen';
import PostScreen from './src/screens/posts/PostsScreen';
import { PostContextProvider } from './src/store/post_context';
import UserProfileScreen from './src/screens/userProfile/UserProfileScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PostContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Posts" component={PostScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PostContextProvider>
  );
}