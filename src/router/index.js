import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Login,
  ForgotPassword,
  Home,
  TaskDetail,
  UpdateTask,
  SplashScreen,
  UpdateProfile,
} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateTask"
        component={UpdateTask}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
