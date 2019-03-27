/*
  *@name Home.js
  *@author 程浩
  *@date 2019.3.26
  *@desc  Home界面
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,StatusBar,TouchableWithoutFeedback} from 'react-native';

import BaseComponent from '../../tools/BaseComponent';

export default class Home extends BaseComponent{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		let thiz = this;
		let a=[1,2,3,4]
		thiz.log("aaaaaa",BaseComponent.STATUSBAR_HEIGHT);
	}
	render(){
		let thiz = this;
		return (
			<TouchableWithoutFeedback onPress={()=>{
				thiz.navigate('Jump',{title:'aaa'});
				thiz.save('save',"aaa");
			}}>
				<View style={{width:BaseComponent.W,height:BaseComponent.H,backgroundColor:'red'}}>
					<StatusBar backgroundColor="blue"barStyle="light-content"/>
				</View>
			</TouchableWithoutFeedback>	
		)
	}
}