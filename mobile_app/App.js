import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
const io = require('socket.io-client');

const IP_SERVIDOR='192.168.0.169:3000'

pad = function(number) {
  var s = String(number);
  if(s.length==1){
    s = "0" + s;
  } 
  return s;
}

getHour = function(data){
  var dateObject = new Date(data.time)
  var hours = dateObject.getHours()
  return pad(hours)
}
getMinute = function(data){
  var dateObject = new Date(data.time)
  var minute = dateObject.getMinutes()
  return pad(minute)
}
getSecond = function(data){
  var dateObject = new Date(data.time)
  var second = dateObject.getSeconds()
  return pad(second)
}

export default class App extends React.Component {
  state = {
    isConnected: false,
    fazenda1: null,
    fazenda2: null,
    fazenda3: null,
  };
  componentDidMount() {
    
    const socket = io('http://'+IP_SERVIDOR, {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      this.setState({ isConnected: true });
    });

    socket.on('fazenda1', fazenda => {
      var aux1 = this.getValueAndAppend(fazenda,this.state.fazenda1)
      this.setState(previousState => (
        { fazenda1: aux1 }
      ))
    });

    socket.on('fazenda2', fazenda => {
      var aux2 = this.getValueAndAppend(fazenda,this.state.fazenda2)
      this.setState(previousState => (
        { fazenda2: aux2 }
      ))
    });

    socket.on('fazenda3', fazenda => {
      var aux3 = this.getValueAndAppend(fazenda,this.state.fazenda3)
      this.setState(previousState => (
        { fazenda3: aux3 }
      ))
    });


  }

  getValueAndAppend(value,state){
    var data = value.data
    var time = value.time
    const max_len =5
    var aux = state
      if(aux ==null){
        aux=[value]
      }
      else{
        aux.unshift(value)
      }

      if(aux.length>max_len){
        aux.splice(-1,1)
      }
      return aux;
  }
  

  render() {
    var faz3 =null
    if(this.state.fazenda3 != null){
      faz3 = this.state.fazenda3.map((data,index)=> <Text key={index}>{getHour(data)}:{getMinute(data)}:{getSecond(data)}    {data.data}</Text>)
    }
    var faz1 =null
    if(this.state.fazenda1 != null){
      faz1 = this.state.fazenda1.map((data,index)=> <Text key={index}>{getHour(data)}:{getMinute(data)}:{getSecond(data)}    {data.data}</Text>)
    }
    var faz2 =null
    if(this.state.fazenda2 != null){
      faz2 = this.state.fazenda2.map((data,index)=> <Text key={index}>{getHour(data)}:{getMinute(data)}:{getSecond(data)}    {data.data}</Text>)
    }
    
    return (
      <View style={styles.container}>
        {/* <Text>connected: {this.state.isConnected ? 'true' : 'false'}</Text> */}
        <View style={styles.farmItem}>
          <Text>FAZENDA 1</Text>
          <View style={styles.farmList}>
            {this.state.fazenda1 && faz1}
          </View>
        </View>
        <View style={styles.farmItem}>
          <Text>FAZENDA 2</Text>
          <View style={styles.farmList}>
            {this.state.fazenda2 && faz2}
          </View>
        </View>
        <View style={styles.farmItem}>
          <Text>FAZENDA 3</Text>
          <View style={styles.farmList}>
            {this.state.fazenda3 && faz3}
            
          </View>
          
        </View>
        
        
        

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
  },
  farmItem: {
    flex: 1,
    backgroundColor: '#74a6f7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  farmList: {
    flex: 1,
    backgroundColor: '#74a6f7',
    alignItems: 'center',
    justifyContent: 'center',

  }
});