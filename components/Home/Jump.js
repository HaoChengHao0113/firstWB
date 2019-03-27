/*
  *@name Home.js
  *@author 程浩
  *@date 2019.3.26
  *@desc  Home界面
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,StatusBar,TouchableWithoutFeedback} from 'react-native';

import BaseComponent from '../../tools/BaseComponent';

export default class Jump extends BaseComponent{
	constructor(props){
		super(props);
	}

	componentWillMount(){
		let thiz = this;
		thiz.log("aaaaaa",BaseComponent.STATUSBAR_HEIGHT);
	}
	render(){
		let thiz= this;
		return (
			<TouchableWithoutFeedback onPress={()=>{
				// thiz.goBack();
				thiz.load('save',function(ret){
					thiz.log('--------ret-------------------',ret);
				})
			}}>
				<View style={{width:BaseComponent.W,height:BaseComponent.H,backgroundColor:'yellow'}}>
				</View>
			</TouchableWithoutFeedback>	
		)
	}
}