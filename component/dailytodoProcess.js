import React, { useState, Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Modal, TouchableHighlight } from 'react-native';

import SQLite from 'react-native-sqlite-storage';

class DailyTodoProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.route.params.date, 
      dateString: this.props.route.params.dateString, 
      cycle: this.props.route.params.cycle, 
      jang: this.props.route.params.jang, 
      goal: this.props.route.params.goal, 

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
      temp: 0,

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
      addedVisible: false,
    }

    this.getDailyTodo();
  }

  getDailyTodo = async () => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    await SQLite.openDatabase(
    {
      name: 'diaryDB.db',
      createFromLocation: 1,
    },
    (DB) => {

      DB.transaction((tx) => {
        let selectQuery = `SELECT * FROM todo where date = "${this.state.date}"`;

        tx.executeSql(selectQuery, [], (tx, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            var todo = rows.item(i);
            let weight = todo.weight;
            let BP = todo.bPressure;
            let BS = todo.bSugar;
            let NOW = todo.chBath;
            let GT = todo.fBath;
            let PW = todo.wBath;
            let EG = todo.eAbsom;
            let CG = todo.eCoffee;
            let WG = todo.eWater;
            let BPP = todo.exer1;
            let HH = todo.exer2;
            let DB = todo.exer3;
            let BB = todo.exer4;
            let MM = todo.exer5;
            let temp = 0;

            let Nisi = todo.mNisi;
            let Doenjang = todo.mDoenjang;
            let Miso = todo.mMiso;
            let Chitosan = todo.mChitosan;
            let Power = todo.mPower;
            let Blossom = todo.mBlossom;
            let Candy = todo.mCandy;
            let Biwoom = todo.mBiwoom;
            let Space = todo.mSpace;
            let memo = todo.memo;

            this.setstate({ weight : weight, BP: BP, BS:BS, NOW: NOW, GT: GT, PW: PW, 
              EG: EG, CG: CG, WG: WG, BPP: BPP, HH: HH, DB: DB, BB: BB, MM: MM, temp: temp, 
              Nisi: Nisi, Doenjang: Doenjang, Miso: Miso, Chitosan: Chitosan, Power: Power,
              Blossom: Blossom, Candy: Candy, Biwoom: Biwoom, Space: Space, memo: memo
            }, () => { this.move(); });
          }
        });
      });
    });
  };

  move = async () => {
    this.props.navigation.navigate("DailyTodo", {
      date: this.state.pressedDate, dateString: this.state.pressedDateString, goal: this.state.goal, cycle: this.state.cycle, jang: this.state.jang,
      weight : this.state.weight, BP: this.state.BP, BS:this.state.BS, NOW: this.state.NOW, GT: this.state.GT, PW: this.state.PW, 
      EG: this.state.EG, CG: this.state.CG, WG: this.state.WG, BPP: this.state.BPP, HH: this.state.HH, DB: this.state.DB, BB: this.state.BB, MM: this.state.MM, temp: this.state.temp, 
      Nisi: this.state.Nisi, Doenjang: this.state.Doenjang, Miso: this.state.Miso, Chitosan: this.state.Chitosan, Power: this.state.Power,
      Blossom: this.state.Blossom, Candy: this.state.Candy, Biwoom: this.state.Biwoom, Space: this.state.Space, memo: this.state.memo
    });
  };
/*
  componentDidMount = () => {
    this.props.navigation.addListener(
      'focus',
      payload => {
        this.props.navigation.goBack();
      }
    );
  };
*/
  render() {
    return null;
  }
};

export default DailyTodoProcess;
