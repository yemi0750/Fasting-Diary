import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Modal, TouchableHighlight } from 'react-native';
import { Calendar, CalendarList } from 'react-native-calendars';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import TodaySummary from './todaysummary.js';

import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignSelf: 'stretch',
    marginRight: 7,
    marginTop: 10,
    marginBottom: 10
  },
  calendar: {
    height: 380,
    marginTop: 10
  },
  content: {
    borderTopWidth: 4,
    borderColor: "#F5F5F5",
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingRight: 10,
    paddingLeft: 10
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedDate: moment().format('YYYY-MM-DD'),
      pressedDateString:'',
      selectedDate: '',
      markedDates:{},

      date: moment().format('YYYY-MM-DD'),
      dateString: "단식일정 없음", 
      jang: false, 
      goal: "", 

      weight: 0,
      BP: '0/0',
      BS: 0,
      NOW: 0,
      GT: 0,
      PW: 0,
      EG: 0,
      CG: 0,
      WG: 0,
      BPP: 0,
      HH: 0,
      DB: 0,
      BB: 0,
      MM: 0,

      Nisi: 0,
      Doenjang : 0,
      Miso : 0,
      Chitosan : 0, 
      Power : 0,
      Blossom : 0,
      Candy : 0,
      Biwoom : 0,
      Space : 0,

      memo : '',
    }

    this.getToday();
    this.getAllEvent();
  }

  //TodaySummary section. -ing
  getToday = async () => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    await SQLite.openDatabase(
    {
        name: 'diaryDB.db',
        createFromLocation: 1,
    },
    (DB) => {
      console.log("success opening diaryDB in newevent");

      DB.transaction((tx) => {
        let selectQuery = `SELECT type, startDate, goal, goalWeight, goalBPressure, goalBSugar FROM event where startdate <= "${moment(this.state.pressedDate).add(1, 'days').format("YYYY-MM-DD")}" and enddate >= "${this.state.pressedDate}"`;
        let goal = '';
        let jang = false;
        
        tx.executeSql(selectQuery, [], (tx, results) => {
          const rows = results.rows.item(0);
          if (rows != undefined) {
            const type = rows.type;
            const startdate = rows.startDate;
            goal = "목표: "+"\n"+rows.goal+"\n"+"목표 수치: "+rows.goalWeight+"kg ㆍ "+rows.goalBPressure+"mmHg ㆍ "+rows.goalBSugar+"mg/dL";
            const diff = moment(this.state.date).diff(moment(startdate), 'days');

            switch(type) {
              case 1:
                if(diff == -1 ){
                  jang = true;
                }
                if(diff < 10) {
                  this.setState({ dateString: '본단식 '+(diff+1)+'일 차' });
                  cycle = 'bon';
                  if(diff == 4) jang = true;
                }
                else if (diff < 20) {
                  this.setState({ dateString: '회복식 '+(diff-9)+'일 차' });
                  cycle = 'hoi';
                  if(diff % 5 == 1) jang = true;
                }
                else if (diff < 47) {
                  this.setState({ dateString: '조절식 '+(diff-19)+'일 차' });
                  cycle = 'jo';
                  if(diff % 5 == 1) jang = true;
                }
                else if (diff == 47) {
                  this.setState({ dateString: '마무리 단식ㆍ본단식' });
                  cycle = 'bon';
                }
                else if (diff == 48) {
                  this.setState({ dateString: '마무리 단식ㆍ회복식' });
                  cycle = 'hoi';
                }
                else {
                  this.setState({ dateString: '마무리 단식ㆍ조절식' });
                  cycle = 'jo';
                }
                break;

              case 2:
                if(diff == -1 ){
                  jang = true;
                }
                if(diff < 14) {
                  this.setState({ dateString: '본단식 '+(diff+1)+'일 차' });
                  cycle = 'bon';
                  if(diff == 4) jang = true;
                }
                else if (diff < 24) {
                  this.setState({ dateString: '회복식 '+(diff-13)+'일 차' });
                  cycle = 'hoi';
                  if(diff % 5 == 0) jang = true;
                }
                else if (diff < 51)  {
                  this.setState({ dateString: '조절식 '+(diff-23)+'일 차' });
                  cycle = 'jo';
                  if(diff % 5 == 0) jang = true;
                }
                else if (diff == 51) {
                  this.setState({ dateString: '마무리 단식ㆍ본단식' });
                  cycle = 'bon';
                }
                else if (diff == 52) {
                  this.setState({ dateString: '마무리 단식ㆍ회복식' });
                  cycle = 'hoi';
                }
                else {
                  this.setState({ dateString: '마무리 단식ㆍ조절식' });
                  cycle = 'jo';
                }
                break;

              case 3:
                if(diff == -1 ){
                  jang = true;
                }
                if(diff < 21) {
                  this.setState({ dateString: '본단식 '+(diff+1)+'일 차' });
                  cycle = 'bon';
                  if(diff == 4) jang = true;
                }
                else if (diff < 31) {
                  this.setState({ dateString: '회복식 '+(diff-20)+'일 차' });
                  cycle = 'hoi';
                  if(diff % 5 == 2) jang = true;
                }
                else if (diff < 58)  {
                  this.setState({ dateString: '조절식 '+(diff-30)+'일 차' });
                  cycle = 'jo';
                  if(diff % 5 == 2) jang = true;
                }
                else if (diff == 58) {
                  this.setState({ dateString: '마무리 단식ㆍ본단식' });
                  cycle = 'bon';
                }
                else if (diff == 59) {
                  this.setState({ dateString: '마무리 단식ㆍ회복식' });
                  cycle = 'hoi';
                }
                else {
                  this.setState({ dateString: '마무리 단식ㆍ조절식' });
                  cycle = 'jo';
                }
                break;

              case 4:
                if(diff == -1 ){
                  jang = true;
                }
                if(diff < 30) {
                  this.setState({ dateString: '본단식 '+(diff+1)+'일 차' });
                  cycle = 'bon';
                  if(diff == 4) jang = true;
                }
                else if (diff < 50) {
                  this.setState({ dateString: '회복식 '+(diff-29)+'일 차' });
                  cycle = 'hoi';
                  if(diff % 5 == 1) jang = true;
                }
                else if (diff < 77)  {
                  this.setState({ dateString: '조절식 '+(diff-49)+'일 차' });
                  cycle = 'jo';
                  if(diff % 5 == 1) jang = true;
                }
                else if (diff == 77) {
                  this.setState({ dateString: '마무리 단식ㆍ본단식' });
                  cycle = 'bon';
                }
                else if (diff == 78) {
                  this.setState({ dateString: '마무리 단식ㆍ회복식' });
                  cycle = 'hoi';
                }
                else {
                  this.setState({ dateString: '마무리 단식ㆍ조절식' });
                  cycle = 'jo';
                }
                break;
            }
          }
          selectQuery = `SELECT * FROM todo where date = "${this.state.pressedDate}"`;

          tx.executeSql(selectQuery, [], (tx, results) => {
            const todo = results.rows.item(0);

            if (todo != undefined) {
              let weight = (todo.weight!=null ? todo.weight : 0);
              let BP = (todo.bPressure!=null ? todo.bPressure : '0/0');
              let BS = (todo.bSugar!=null ? todo.bSugar : 0);
              let NOW = (todo.chBath!=null ? todo.chBath : 0);
              let GT = (todo.fBath!=null ? todo.fBath : 0);
              let PW = (todo.wBath!=null ? todo.wBath : 0);
              let EG = (todo.eAbsom!=null ? todo.eAbsom : 0);
              let CG = (todo.eCoffee!=null ? todo.eCoffee : 0);
              let WG = (todo.eWater!=null ? todo.eWater : 0);
              let BPP = (todo.exer1!=null ? todo.exer1 : 0);
              let HH = (todo.exer2!=null ? todo.exer2 : 0);
              let DB = (todo.exer3!=null ? todo.exer3 : 0);
              let BB = (todo.exer4!=null ? todo.exer4 : 0);
              let MM = (todo.exer5!=null ? todo.exer5 : 0);
              let temp = 0;

              let Nisi = (todo.mNisi!=null ? todo.mNisi : 0);
              let Doenjang = (todo.mDoenjang!=null ? todo.mDoenjang : 0);
              let Miso = (todo.mMiso!=null ? todo.mMiso : 0);
              let Chitosan = (todo.mChitosan!=null ? todo.mChitosan : 0);
              let Power = (todo.mPower!=null ? todo.mPower : 0);
              let Blossom = (todo.mBlossom!=null ? todo.mBlossom : 0);
              let Candy = (todo.mCandy!=null ? todo.mCandy : 0);
              let Biwoom = (todo.mBiwoom!=null ? todo.mBiwoom : 0);
              let Space = (todo.mSpace!=null ? todo.mSpace : 0);
              let memo = (todo.memo!=null ? todo.memo : '');

              this.setState(() => {
                return {goal: goal, jang: jang,
                weight : weight, BP: BP, BS:BS, NOW: NOW, GT: GT, PW: PW, 
                EG: EG, CG: CG, WG: WG, BPP: BPP, HH: HH, DB: DB, BB: BB, MM: MM, temp: temp, 
                Nisi: Nisi, Doenjang: Doenjang, Miso: Miso, Chitosan: Chitosan, Power: Power,
                Blossom: Blossom, Candy: Candy, Biwoom: Biwoom, Space: Space, memo: memo}
              });
            }
          });
        });
      });
    });
  };

  //Calendar section
  getAllEvent = async () => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    const boncolor = '#f4bdb6';
    const hoicolor = '#fcddae';
    const jocolor = '#dae9d2';
    const jangcolor = 'black';
    let markedDates = {};

    await SQLite.openDatabase(
    {
      name: 'diaryDB.db',
      createFromLocation: 1,
    },
    (DB) => {
      console.log("success opening diaryDB in newevent")

      DB.transaction((tx) => {
        let selectQuery = `SELECT type, startDate, endDate FROM event`;

        tx.executeSql(selectQuery, [], (tx, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            var event = rows.item(i);
            const type = event.type;
            const startDate = event.startDate;
            const endDate = event.endDate;

            markedDates[moment(startDate).subtract(1,'days').format('YYYY-MM-DD')] = {marked: true, dotColor: jangcolor};
            markedDates[moment(startDate).format('YYYY-MM-DD')]={startingDay: true, endingDay: false, color: boncolor};
            markedDates[moment(endDate).subtract(2,'days').format('YYYY-MM-DD')]={color: boncolor};
            markedDates[moment(endDate).subtract(1,'days').format('YYYY-MM-DD')]={color: hoicolor};
            markedDates[moment(endDate).format('YYYY-MM-DD')]={startingDay: false, endingDay: true, color: jocolor};
            switch(type) {
              case 1:
                for (let j = 1; j < 10; j++) {
                  if (j == 4){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: boncolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: boncolor}; 
                  }
                }
                for (let j = 10; j < 20; j++) {
                  if (j % 5 == 1){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: hoicolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: hoicolor}; 
                  }
                }
                for (let j = 20; j < 47; j++) {
                  if (j % 5 == 1){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: jocolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: jocolor}; 
                  }
                }
                break;

              case 2:
                for (let j = 1; j < 14; j++) {
                  if (j == 4){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: boncolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: boncolor}; 
                  }
                }
                for (let j = 14; j < 24; j++) {
                  if (j % 5 == 0){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: hoicolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: hoicolor}; 
                  }
                }
                for (let j = 24; j < 51; j++) {
                  if (j % 5 == 0){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: jocolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: jocolor}; 
                  }
                }
                break;

              case 3:
                for (let j = 1; j < 21; j++) {
                  if (j == 4){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: boncolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: boncolor}; 
                  }
                }
                for (let j = 21; j < 31; j++) {
                  if (j % 5 == 2){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: hoicolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: hoicolor}; 
                  }
                }
                for (let j = 31; j < 58; j++) {
                  if (j % 5 == 2){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: jocolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: jocolor}; 
                  }
                }
                break;

              case 4:
                for (let j = 1; j < 30; j++) {
                  if (j == 4){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: boncolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: boncolor}; 
                  }
                }
                for (let j = 30; j < 50; j++) {
                  if (j % 5 == 1){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: hoicolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: hoicolor}; 
                  }
                }
                for (let j = 50; j < 77; j++) {
                  if (j % 5 == 1){
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: jocolor, marked: true, dotColor: jangcolor}; 
                  }else{
                    markedDates[moment(startDate).add(j,'days').format('YYYY-MM-DD')] = {color: jocolor}; 
                  }
                }
                break;
            }
          }
          
          this.setState({ markedDates : markedDates });

        });
      });
    });
  };

  //handle day press event
  dayPress = async (day) => {
    this.setState({ pressedDate: moment(day.dateString).format('YYYY-MM-DD') }, () => {
      this.setState({ selectedDate: this.state.pressedDate });
    });

    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    await SQLite.openDatabase(
    {
        name: 'diaryDB.db',
        createFromLocation: 1,
    },
    (DB) => {
      console.log("success opening diaryDB in newevent")

      var cycle = '';
      var jang = false;
      var goal = "단식일정 없음";

      DB.transaction((tx) => {
        let selectQuery = `SELECT type, startDate, goal, goalWeight, goalBPressure, goalBSugar FROM event where startdate <= "${moment(this.state.pressedDate).add(1, 'days').format("YYYY-MM-DD")}" and enddate >= "${this.state.pressedDate}"`;

        tx.executeSql(selectQuery, [], (tx, results) => {
          const rows = results.rows.item(0);
          if (rows == undefined){
            this.setState({ pressedDateString: '' });
          }
          else {
            const type = rows.type;
            const startdate = rows.startDate;
            goal = "목표: "+"\n"+rows.goal+"\n"+"목표 수치: "+rows.goalWeight+"kg ㆍ "+rows.goalBPressure+"mmHg ㆍ "+rows.goalBSugar+"mg/dL";
            const diff = moment(this.state.pressedDate).diff(moment(startdate), 'days');

            switch(type) {
              case 1:
                if(diff == -1 ){
                  jang = true;
                }
                if(diff < 10) {
                  this.setState({ pressedDateString: '본단식 '+(diff+1)+'일 차' });
                  cycle = 'bon';
                  if(diff == 4) jang = true;
                }
                else if (diff < 20) {
                  this.setState({ pressedDateString: '회복식 '+(diff-9)+'일 차' });
                  cycle = 'hoi';
                  if(diff % 5 == 1) jang = true;
                }
                else if (diff < 47) {
                  this.setState({ pressedDateString: '조절식 '+(diff-19)+'일 차' });
                  cycle = 'jo';
                  if(diff % 5 == 1) jang = true;
                }
                else if (diff == 47) {
                  this.setState({ pressedDateString: '마무리 단식ㆍ본단식' });
                  cycle = 'bon';
                }
                else if (diff == 48) {
                  this.setState({ pressedDateString: '마무리 단식ㆍ회복식' });
                  cycle = 'hoi';
                }
                else {
                  this.setState({ pressedDateString: '마무리 단식ㆍ조절식' });
                  cycle = 'jo';
                }
                break;

              case 2:
                if(diff == -1 ){
                  jang = true;
                }
                if(diff < 14) {
                  this.setState({ pressedDateString: '본단식 '+(diff+1)+'일 차' });
                  cycle = 'bon';
                  if(diff == 4) jang = true;
                }
                else if (diff < 24) {
                  this.setState({ pressedDateString: '회복식 '+(diff-13)+'일 차' });
                  cycle = 'hoi';
                  if(diff % 5 == 0) jang = true;
                }
                else if (diff < 51)  {
                  this.setState({ pressedDateString: '조절식 '+(diff-23)+'일 차' });
                  cycle = 'jo';
                  if(diff % 5 == 0) jang = true;
                }
                else if (diff == 51) {
                  this.setState({ pressedDateString: '마무리 단식ㆍ본단식' });
                  cycle = 'bon';
                }
                else if (diff == 52) {
                  this.setState({ pressedDateString: '마무리 단식ㆍ회복식' });
                  cycle = 'hoi';
                }
                else {
                  this.setState({ pressedDateString: '마무리 단식ㆍ조절식' });
                  cycle = 'jo';
                }
                break;

              case 3:
                if(diff == -1 ){
                  jang = true;
                }
                if(diff < 21) {
                  this.setState({ pressedDateString: '본단식 '+(diff+1)+'일 차' });
                  cycle = 'bon';
                  if(diff == 4) jang = true;
                }
                else if (diff < 31) {
                  this.setState({ pressedDateString: '회복식 '+(diff-20)+'일 차' });
                  cycle = 'hoi';
                  if(diff % 5 == 2) jang = true;
                }
                else if (diff < 58)  {
                  this.setState({ pressedDateString: '조절식 '+(diff-30)+'일 차' });
                  cycle = 'jo';
                  if(diff % 5 == 2) jang = true;
                }
                else if (diff == 58) {
                  this.setState({ pressedDateString: '마무리 단식ㆍ본단식' });
                  cycle = 'bon';
                }
                else if (diff == 59) {
                  this.setState({ pressedDateString: '마무리 단식ㆍ회복식' });
                  cycle = 'hoi';
                }
                else {
                  this.setState({ pressedDateString: '마무리 단식ㆍ조절식' });
                  cycle = 'jo';
                }
                break;

              case 4:
                if(diff == -1 ){
                  jang = true;
                }
                if(diff < 30) {
                  this.setState({ pressedDateString: '본단식 '+(diff+1)+'일 차' });
                  cycle = 'bon';
                  if(diff == 4) jang = true;
                }
                else if (diff < 50) {
                  this.setState({ pressedDateString: '회복식 '+(diff-29)+'일 차' });
                  cycle = 'hoi';
                  if(diff % 5 == 1) jang = true;
                }
                else if (diff < 77)  {
                  this.setState({ pressedDateString: '조절식 '+(diff-49)+'일 차' });
                  cycle = 'jo';
                  if(diff % 5 == 1) jang = true;
                }
                else if (diff == 77) {
                  this.setState({ pressedDateString: '마무리 단식ㆍ본단식' });
                  cycle = 'bon';
                }
                else if (diff == 78) {
                  this.setState({ pressedDateString: '마무리 단식ㆍ회복식' });
                  cycle = 'hoi';
                }
                else {
                  this.setState({ pressedDateString: '마무리 단식ㆍ조절식' });
                  cycle = 'jo';
                }
                break;
            }
          }
          selectQuery = `SELECT * FROM todo where date = "${this.state.pressedDate}"`;

          tx.executeSql(selectQuery, [], (tx, results) => {
            const todo = results.rows.item(0);

            if (todo == undefined){
              this.props.navigation.navigate("DailyTodo", {
                date: this.state.pressedDate, dateString: this.state.pressedDateString, goal: goal, jang: jang, cycle: cycle,
                  weight : 0, BP: '0/0', BS:0, NOW: 0, GT: 0, PW: 0, 
                  EG: 0, CG: 0, WG: 0, BPP: 0, HH: 0, DB: 0, BB: 0, MM: 0, temp: 0, 
                  Nisi: 0, Doenjang: 0, Miso: 0, Chitosan: 0, Power: 0,
                  Blossom: 0, Candy: 0, Biwoom: 0, Space: 0, memo: ''
                });
              }
            else {
              let weight = (todo.weight!=null ? todo.weight : 0);
              let BP = (todo.bPressure!=null ? todo.bPressure : '0/0');
              let BS = (todo.bSugar!=null ? todo.bSugar : 0);
              let NOW = (todo.chBath!=null ? todo.chBath : 0);
              let GT = (todo.fBath!=null ? todo.fBath : 0);
              let PW = (todo.wBath!=null ? todo.wBath : 0);
              let EG = (todo.eAbsom!=null ? todo.eAbsom : 0);
              let CG = (todo.eCoffee!=null ? todo.eCoffee : 0);
              let WG = (todo.eWater!=null ? todo.eWater : 0);
              let BPP = (todo.exer1!=null ? todo.exer1 : 0);
              let HH = (todo.exer2!=null ? todo.exer2 : 0);
              let DB = (todo.exer3!=null ? todo.exer3 : 0);
              let BB = (todo.exer4!=null ? todo.exer4 : 0);
              let MM = (todo.exer5!=null ? todo.exer5 : 0);
              let temp = 0;

              let Nisi = (todo.mNisi!=null ? todo.mNisi : 0);
              let Doenjang = (todo.mDoenjang!=null ? todo.mDoenjang : 0);
              let Miso = (todo.mMiso!=null ? todo.mMiso : 0);
              let Chitosan = (todo.mChitosan!=null ? todo.mChitosan : 0);
              let Power = (todo.mPower!=null ? todo.mPower : 0);
              let Blossom = (todo.mBlossom!=null ? todo.mBlossom : 0);
              let Candy = (todo.mCandy!=null ? todo.mCandy : 0);
              let Biwoom = (todo.mBiwoom!=null ? todo.mBiwoom : 0);
              let Space = (todo.mSpace!=null ? todo.mSpace : 0);
              let memo = (todo.memo!=null ? todo.memo : '');

              this.props.navigation.navigate("DailyTodo", {
                date: this.state.pressedDate, dateString: this.state.pressedDateString, goal: goal, jang: jang, cycle: cycle, 
                cycle: cycle, jang: jang,
                weight : weight, BP: BP, BS:BS, NOW: NOW, GT: GT, PW: PW, 
                EG: EG, CG: CG, WG: WG, BPP: BPP, HH: HH, DB: DB, BB: BB, MM: MM, temp: temp, 
                Nisi: Nisi, Doenjang: Doenjang, Miso: Miso, Chitosan: Chitosan, Power: Power,
                Blossom: Blossom, Candy: Candy, Biwoom: Biwoom, Space: Space, memo: memo
              });
            }
          });
        });
      });
    });
  };

  //navigation settings. focus listener & top icons
  componentDidMount = () => {
    this.props.navigation.addListener( 'focus', payload => {
      this.getAllEvent();
      this.getToday();
    });

    this.props.navigation.setOptions({
      headerLeft: () => 
        <View style={styles.iconContainer}>
          <Button type="clear"
            icon={<Icon name={'menu'} size={23} containerStyle={styles.icon}/>}
            onPress={() => this.props.navigation.navigate('EventList')}
          />
        </View>
      ,
      headerRight: () => 
        <View style={styles.iconContainer}>
          <Button type="clear"
            icon={<Icon name={'help-circle'} size={23}/>}
            onPress={this.infoPress}
          />
          <Button type="clear"
            icon={<Icon name={'plus'} size={23}/>}
            onPress={() => this.props.navigation.navigate('NewEvent')}
          />
        </View>
      ,
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { date, dateString, jang, goal, weight, BP, BS, NOW ,GT ,PW ,EG ,CG ,WG ,BPP ,HH ,DB ,BB, MM, Nisi, Doenjang, Miso, Chitosan, Power, Blossom, Candy, Biwoom, Space, memo } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <Calendar
          displayLoadingIndicator = { true }
          current = {moment().format('YYYY-MM-DD')}
          style={styles.calendar}
          monthFormat={'yyyy년 MM월'}
          onDayPress={this.dayPress}
          markedDates={{ ...this.state.markedDates, [this.state.selectedDate]:{...this.state.markedDates[this.state.selectedDate], textColor:'#4174D9' }}}
          markingType={'period'}
          theme={{ textMonthFontSize: 18, todayTextColor: '#4174D9', arrowColor: '#cdd9f1', 
            'stylesheet.day.period': {base: {overflow: 'hidden', height: 34, alignItems: 'center', width: 38 }},
            'stylesheet.calendar.header': { week: { margin: 15, marginBottom: 0, flexDirection: 'row', justifyContent: 'space-between' } }}}
        />
        <TodaySummary 
          date={this.state.date} dateString= {this.state.dateString} jang= {this.state.jang} goal= {this.state.goal} 
          weight= {this.state.weight} BP= {this.state.BP} BS={ this.state.BS} NOW= {this.state.NOW} GT= {this.state.GT} PW= {this.state.PW}
          EG= {this.state.EG} CG= {this.state.CG} WG= {this.state.WG} BPP={ this.state.BPP} HH= {this.state.HH} DB={this.state.DB} BB={this.state.BB} MM = {this.state.MM}
          Nisi= {this.state.Nisi} Doenjang={this.state.Doenjang} Miso={this.state.Miso} Chitosan={this.state.Chitosan}  Power={this.state.Power} 
          Blossom= {this.state.Blossom} Candy={this.state.Candy} Biwoom={this.state.Biwoom} Space={this.state.Space} memo={this.state.memo} />
      </SafeAreaView>
    );
  }
};

export default Home;
