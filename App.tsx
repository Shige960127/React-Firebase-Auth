import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import SignUpScreen from "screens/SignUpScreen";
import SignInScreen from "screens/SignInScreen";
import WaveformScreen from "screens/WaveformScreen";
import TimerScreen from "screens/TimerScreen";
import HomeScreen from "screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import store, { AppDispatch } from "./src/stores/index";
import { UserState, getUser, checkLogin } from "./src/stores/user";
import { useSelector, Provider, useDispatch } from "react-redux";

export type RootStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Home: undefined;
  Waveform: undefined;
  Initial: undefined;
  Main: undefined;
  Timer: undefined;
};

export type RootReducer = {
  user: UserState;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}
const WaveformStack = createNativeStackNavigator();
function WaveformStackScreen() {
  return (
    <WaveformStack.Navigator>
      <WaveformStack.Screen name="Waveform" component={WaveformScreen} />
    </WaveformStack.Navigator>
  );
}
const TimerStack = createNativeStackNavigator();
function TimerStackScreen() {
  return (
    <TimerStack.Navigator>
      <TimerStack.Screen name="Tiemr" component={TimerScreen} />
    </TimerStack.Navigator>
  );
}

const MainScreen = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="HomeStack"
      component={HomeStackScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="WaveformStack"
      component={WaveformStackScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="TimerStack"
      component={TimerStackScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const InitialScreen = () => (
  <Stack.Navigator initialRouteName="SignIn">
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="SignIn" component={SignInScreen} />
  </Stack.Navigator>
);

const RootScreen = () => {
  const { status, isLogined } = useSelector(({ user }: RootReducer) => user);
  const dispatch = useDispatch<AppDispatch>();
  if (status === "initial") {
    dispatch(checkLogin());
  }
  return (
    <Stack.Navigator initialRouteName="Initial">
      {isLogined ? (
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <TailwindProvider utilities={utilities}>
        <NavigationContainer>
          <RootScreen />
        </NavigationContainer>
      </TailwindProvider>
    </Provider>
  );
}
