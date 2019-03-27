/*
  *@name BaseComponent.js
  *@author 程浩
  *@date 2019.3.26
  *@desc  基于Component封装了一些常用的方法.
*/
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,DeviceEventEmitter,StatusBar,AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';


export default class BaseComponent extends Component{
	static W=Dimensions.get('screen').width;//获取屏幕的宽
	static H=Dimensions.get('screen').height;//获取屏幕的高
	static OS=Platform.OS;//判断是android还是ios
  static STATUSBAR_HEIGHT=StatusBar.currentHeight;//获取android手机状态栏高度

	constructor(props){
		super(props);
    this.config={
      isLog:true,//打印日志开关
    }

    // 初始化持久化存储实例
    this.storage = new Storage({
        // 最大容量，默认值1000条数据循环存储
        size: 1000,
        
        // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
        // 如果不指定则数据只会保存在内存中，重启后即丢失
        storageBackend: AsyncStorage,
        
        // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
        defaultExpires: null,
        
        // 读写时在内存中缓存数据。默认启用。
        enableCache: false,
        
        // 如果storage中没有相应数据，或数据已过期，
        // 则会调用相应的sync方法，无缝返回最新数据。
        // sync方法的具体说明会在后文提到
        // 你可以在构造函数这里就写好sync的方法
        // 或是在任何时候，直接对storage.sync进行赋值修改
        // 或是写到另一个文件里，这里require引入
        sync: null
        
    });

    // 获取页面参数和导航器
    if(this.props.navigation){
      this.params = this.props.navigation.state.params;
    }
    this.goBack = this.goBack.bind(this);
    this.goPage = this.goPage.bind(this);
    this.backTo = this.backTo.bind(this);
	}

  navigate(name,params){
    if(this.props.navigation){
      this.props.navigation.navigate(name,params);
    }
  }

  /**
   * @method goBack
   * @params
   * @return
   * @desc 返回之前的页面
   */
  goBack(){
    if(this.props.navigation){
      this.props.navigation.goBack();
    }

    // 默认返回当前指针，方便链式操作
    return this;
  }

    /**
   * @method backTo
   * @params key->指定页面
   * @return
   * @desc 返回到之前打开的指定页面
   */
  backTo(key){
    if(this.props.navigation){
      this.props.navigation.goBack(key);
    }
    return this;
  }

  /**
   * @method goPage
   * @params
   * @return
   * @desc 打开新页面
   */
  goPage(page,params){
    if(this.navigate){
      this.navigate(page,params);
    }

    // 默认返回当前指针，方便链式操作
    return this;
  }

/*
  *@name log函数
  *@author 程浩
  *@date 2019.3.26
  *@desc  打印一些日志
*/
	log(mark,data){
    if(this.config.isLog){
  		if(mark&&data){
  			if(data instanceof Array || data instanceof Object){
          console.log("@"+mark+" "+JSON.stringify(data));
        }else{
          console.log("@"+mark+" "+data);
        }
  		}else{
        console.log(mark);
      }
    }
	}
  /**
   * @method save
   * @params key->数据键；value->值
   * @return 
   * @desc 保存数据到本地，封装于AsyncStroage
   */
  save(key,value){

    if(this.storage){

      let val = {};
      
      val.value = value;

      this.storage.save({
          key: key,// 注意:请不要在key中使用_下划线符号!
          data: val,
          
          // 如果不指定过期时间，则会使用defaultExpires参数
          // 如果设为null，则永不过期
          expires: null
       });
    }

    // 默认返回当前指针，方便链式操作
    return this;
  }

  /**
   * @method load
   * @params key->数据键；callback->回调函数
   * @return 
   * @desc 获取指定键名的数据
   */
  load(key,callback){

    if(this.storage){
      this.storage.load({
          key: key,
      }).then(ret => {
          // 如果找到数据，则在then方法中返回
          callback(ret.value,null);
      }).catch(err => {
          // 如果没有找到数据且没有sync方法，
          // 或者有其他异常，则在catch中返回
        callback(null,err);
      });
    }

    // 默认返回当前指针，方便链式操作
    return this;
  }

  /**
   * @method remove
   * @params key->数据键
   * @return 
   * @desc 删除指定键名的数据
   */
  remove(key){

    if(this.storage){
      this.storage.remove({
          key: key
      });
    }

    // 默认返回当前指针，方便链式操作
    return this;

  }

/*
  *@name select函数
  *@author 程浩
  *@date 2019.3.26
  *@desc  判断是android还是ios平台
*/  
  select(data){
    return Platform.select(data);
  }
/*
  *@name emit函数
  *@author 程浩
  *@date 2019.3.26
  *@desc  发送消息
*/  
  emit(key,data){
    DeviceEventEmitter.emit(key,data);
  }

/*
  *@name listen函数
  *@author 程浩
  *@date 2019.3.26
  *@desc  监听消息
*/
  listen(key,callback){
    if(callback){
      DeviceEventEmitter.addListener(key,callback)
    }
  }
}