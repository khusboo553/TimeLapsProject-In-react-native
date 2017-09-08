import React, { Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,TabBarIOS,TouchableHighlight,ListView,Alert
} from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer'
import TimeFormatter from 'minutes-seconds-milliseconds';

var firstTime;
var mainTimer;
var isRunning;
var lapTimer;
var mainTimerStart;
var lapTimerStart;
var i=1;
 var prevLap;
var laps=[];
var ResultLaps=[];
var ds=new ListView.DataSource({
  rowHasChanged:(row1,row2)=>row1!==row2,
});

export default class TimerClass extends Component {
  constructor(props) {
      super(props);
      this.state = {
        dataSource:ds.cloneWithRows(laps),
        mainTimerStart:null,
        lapTimerStart:null,
        mainTimer:null,
        lapTimer:null,

        isRunning:false,

      };
    // this.toggleTimer = this.toggleTimer.bind(this);
    // this.resetTimer = this.resetTimer.bind(this);
    // this.toggleStopwatch = this.toggleStopwatch.bind(this);
    // this.resetStopwatch = this.resetStopwatch.bind(this);

}
  // toggleTimer() {
  //   this.setState({timerStart: !this.state.timerStart, timerReset: false});
  // }
  //
  // resetTimer() {
  //   this.setState({timerStart: false, timerReset: true});
  // }

  // toggleStopwatch() {
  //   this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
  // }
  //
  // resetStopwatch() {
  //   this.setState({stopwatchStart: false, stopwatchReset: true});
  // }

  // getFormattedTime(time) {
  //   this.currentTime = time;
  //   CurrTimeLaps=time;
  // };
  handleStartStop(){
     var {isRunning,firstTime,mainTimer,lapTimer}=this.state;

    if (this.state.isRunning) {
      // for (var i = 0; i < laps.length; i++) {
        var result=ResultLaps[0]+ResultLaps[1];
        for (var i =2; i < ResultLaps.length; i++) {
        result=result+ResultLaps[i];
      }
      Alert.alert(
    'Congratulation!!!',
    TimeFormatter(result),
    [

    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: false }
    );
      console.log(TimeFormatter(result));
      clearInterval(this.interval);
      this.setState({
         isRunning:false
      });
      return;
    }
    this.setState({
      isRunning:true,
      mainTimerStart:new Date(),
      lapTimerStart:new Date(),
    });
    this.interval=setInterval(()=>{
      this.setState({

        mainTimer:new Date()-this.state.mainTimerStart+mainTimer,
        lapTimer:new Date()-this.state.lapTimerStart+lapTimer,
      });
    },30);

  }
  handleReset(){
      laps=[];
      ResultLaps=[];
    this.setState({
      mainTimerStart:null,
      lapTimerStart:null,
      mainTimer:0,
      lapTimer:0,
      dataSource:ds.cloneWithRows(laps),
    })

  }
  handleLap(){
     var {isRunning,mainTimerStart}=this.state;
     if (i==1) {
       console.log(TimeFormatter(this.state.lapTimer));
       prevLap=this.state.lapTimer;
       laps.push({name:'Lap->1',value:TimeFormatter(prevLap)})
      ResultLaps.push(this.state.lapTimer);
       i++;
     }else {
       var currentLap=this.state.lapTimer-prevLap;
       prevLap=this.state.lapTimer;

       console.log(TimeFormatter(prevLap));
       console.log(TimeFormatter(currentLap));
       laps.push({name:("Lap->"+i),value:TimeFormatter(currentLap)})
       i++;
         ResultLaps.push(currentLap);
      //  laps.push(TimeFormatter(currentLap));
     }
     console.log(laps);
     this.setState({
        dataSource:ds.cloneWithRows(laps),
     });

    //  if (mainTimerStart && !isRunning) {
    //    laps:[],
    //    this.setState({
    //      mainTimerStart:null,
    //      lapTimerStart:null,
    //      mainTimer:0,
    //      lapTimer:0,
    //    })

  }
  takeLaps(){
    console.log("++++++++++");
    if (CurrTimeLaps&&!PrevTimeLaps) {
    console.log(CurrTimeLaps);
     PrevTimeLaps=CurrTimeLaps;

  }else {

  var dt=TimeFormatter(this.state.mainTime);
   console.log(dt);

  }


  }
  render() {
    return(
      <View>
      <View style={styles.begContainer}>
      </View>
      <View style={styles.MainContainer}>
      <Text style={{fontSize:40}}>TIMER</Text>
      <View style={styles.timerWrapper}>
         <View style={styles.timerWrapperInner}>
         <Text style={styles.lapTimer}>{TimeFormatter(this.state.lapTimer)} </Text>
         <Text style={styles.mainTimer}>{TimeFormatter(this.state.mainTimer)} </Text>
      </View>
      </View>
      <View style={styles.buttonWrapper}>
      <TouchableHighlight underlayColor='#777' onPress={this.handleLap.bind(this)} style={styles.button}>
      <Text>Lap</Text>
      </TouchableHighlight>

      <TouchableHighlight underlayColor='#777' onPress={this.handleReset.bind(this)} style={styles.button}>
      <Text>Reset</Text>
      </TouchableHighlight>

      <TouchableHighlight underlayColor='#ddd' onPress={this.handleStartStop.bind(this)} style={styles.button}>
      <Text style={[styles.startBtn,isRunning && styles.stopBtn]}>{this.state.isRunning ? 'Stop':'Start'}</Text>
      </TouchableHighlight>

      </View>

      </View>

      <View style={styles.lapsWrapper}>
      <ListView
        enableEmptySections={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData)=>(
          <View style={styles.lapRow}>
          <Text style={styles.lapNumber}>{rowData.name}</Text>
          <Text style={styles.lapTime}>{rowData.value}></Text>
          </View>
        )}
        />
        </View>
      </View>
    );
  }
}
const handleTimerComplete = () => alert("custom completion function");

const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 7,
  }
};
const styles=StyleSheet.create(
  {
    begContainer:{
      height:40,
      backgroundColor:'powderblue',
    },
    MainContainer:{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'skyblue',
    },
    timerWrapper:{
      //  justifyContent:'center',
      //  flex:1,
    },
    timerWrapperInner:{

    },
    lapTimer:{

    },
    mainTimer:{
      fontSize:60,
    },
    startBtn:{
      color:'#00cc00'
    },
    stopBtn:{
      color:'red'
    },
    buttonWrapper:{
      flexDirection:'row',
      justifyContent:'space-around',
      paddingTop:15,
      paddingBottom:30,
    },
    button:{
      height:80,
      width:80,
      borderRadius:40,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center'
    },
    lapsWrapper:{
      marginTop:40,
    },
    lapRow:{
      flexDirection:'row',
      justifyContent:'space-around',
      height:40,
      paddingTop:10,
      borderBottomWidth:0.5,
      borderBottomColor:'#ddd'
    },
    lapNumber:{
      fontSize:15,
      color:'#777'
    },
    lapTime:{
      color:'#000',
      fontSize:20,
      fontWeight:'300'
    }

  }
)


// <Timer totalDuration={this.state.totalDuration} msecs start={this.state.timerStart}
//   reset={this.state.timerReset}
//   options={options}
//   handleFinish={handleTimerComplete}
//   getTime={this.getFormattedTime} />
// <TouchableHighlight onPress={this.toggleTimer}>
//   <Text style={{fontSize: 30}}>{!this.state.timerStart ? "Start" : "Stop"}</Text>
// </TouchableHighlight>
// <TouchableHighlight onPress={this.resetTimer}>
//   <Text style={{fontSize: 30}}>Reset</Text>
// </TouchableHighlight>
