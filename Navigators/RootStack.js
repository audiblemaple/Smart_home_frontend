import React from "react";

// Colors
import {Colors} from "../Components/Styles";
const {primary, tertiary} = Colors;

// React navigation
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";

// Screens
import Signup from "../screens/SignUp";
import LogIn from "../screens/LogIn";
import Welcome from "../screens/Welcome";


const Stack = createStackNavigator();

const RootStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: 'transparent'
					},
					headerTintColor: tertiary,
					headerTransparent: true,
					headerTitle: '',
					headerLeftContainerStyle: {
						paddingLeft: 20
					}
				}}
				initialRouteName="Login"
			>
				<Stack.Screen name="Login" component={LogIn}/>
				<Stack.Screen name="Signup" component={Signup}/>
				<Stack.Screen options={{headerTintColor: primary}} name="Welcome" component={Welcome}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default RootStack;