/**
 * @format
 */
import React from "react";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Home from './components/Home/Home';
import Jump from './components/Home/Jump'


import {createBottomTabNavigator,createStackNavigator,createAppContainer,} from 'react-navigation';
console.disableYellowBox = true;

let NavConfig={
  Home:{
  	screen: Home,
    navigationOptions:{
        header:null
    }
  },
	Jump:{
		screen:Jump,
		navigationOptions:{
			header:null
		}
	}
}
const CreateNavigator = createStackNavigator(NavConfig);

AppRegistry.registerComponent(appName, () => CreateNavigator);
