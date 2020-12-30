import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Modal,TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';
import MemoItem from './memoitem.js';
import NumericItem from './numericitem.js';
import NumericItemDouble from './numericitemDouble.js';

import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30
  },
  betweenView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  radio: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center"
  },
  typeTextGroup:{
    flex: 1,
    flexDirection: 'row',
  },
  typeText: {
    marginTop: 8
  },
  typeTextBold:{
    marginTop: 8,
    fontWeight: "bold"
  },
  threeCardGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 30,
    marginLeft: 30
  },
  threeCard: {
    flex: 1,
    margin: 5,
    padding: 0
  }
});

class NewEvent extends Component {

  state = {
    date: new Date,
    startdate: '',
    enddate: '',
    type: 1,
    startWeight: 0,
    goalWeight: 0,
    endWeight: 0,
    startBPressure: '0/0',
    goalBPressure: '0/0',
    endBPressure: '0/0',
    startBSugar: 0,
    goalBSugar: 0,
    endBSugar: 0,
    goal: '',
    betweenVisible: false,
    addedVisible: false,
    tVisible: true,
    ttVisible: false,
    tttVisible: false,
    ttttVisible: false
  }

  getMemo = (text) => {
    this.setState({goal:text});
  }

  getCW = (weight) => {
    this.setState({startWeight:Number(weight)});
  }

  getCBP = (BP) => {
    this.setState({startBPressure:BP});
  }

  getCBS = (BS) => {
    this.setState({startBSugar:Number(BS)});
  }

  getGW = (weight) => {
    this.setState({goalWeight:Number(weight)});
  }

  getGBP = (BP) => {
    this.setState({goalBPressure:BP});
  }

  getGBS = (BS) => {
    this.setState({goalBSugar:Number(BS)});
  }

  handledate = (date) => {
    this.setState({date: new Date(date)});
  }

  addEvent = async () => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    await SQLite.openDatabase(
      {
        name: 'diaryDB.db',
        createFromLocation: 1,
      },
      (DB) => {
        console.log("success opening diaryDB in newevent")

        //enddate 계산
        var enddate = '';
        switch(this.state.type) {
          case 1:
            enddate = moment(this.state.date).add(49, 'days').format('YYYY-MM-DD');
            break;
          case 2:
            enddate = moment(this.state.date).add(53, 'days').format('YYYY-MM-DD');
            break;
          case 3:
            enddate = moment(this.state.date).add(60, 'days').format('YYYY-MM-DD');
            break;
          case 4:
            enddate = moment(this.state.date).add(79, 'days').format('YYYY-MM-DD');
            break;
        }
        this.setState({enddate: enddate},() => {
          this.setState({startdate: moment(this.state.date).format('YYYY-MM-DD')}, () => {
            DB.transaction((tx) => {
              let selectQuery = `SELECT count(*) AS C FROM event where startdate <= "${this.state.enddate}" and enddate >= "${this.state.startdate}"`;

              tx.executeSql(selectQuery, [], (tx, results) => {
                const rows = results.rows.item(0);
                console.log("row.C : ", rows.C);
                if(rows.C === 0){
                  tx.executeSql(`INSERT INTO event (type, startDate, endDate, startWeight, goalWeight, endWeight, startBPressure, goalBPressure, endBPressure, startBSugar, goalBSugar, endBSugar, goal) VALUES (${this.state.type}, "${this.state.startdate}", "${this.state.enddate}", ${this.state.startWeight}, ${this.state.goalWeight}, ${this.state.endWeight}, "${this.state.startBPressure}", "${this.state.goalBPressure}", "${this.state.endBPressure}", ${this.state.startBSugar}, ${this.state.goalBSugar}, ${this.state.endBSugar}, "${this.state.goal}")`)
                  .then(() => {
                    console.log('insert transaction done');
                  })
                  .catch((error) => {
                    console.log('insert transaction fail: ', error);
                  });
                  this.setState({ addedVisible: true });
                }
                else {
                  this.setState({ betweenVisible: true });
                }
              });
            });
          });
        });
      },
      error => {
        console.error(error);
      }
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.betweenVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.betweenView}>
              <Text style={styles.modalText}>기존 단식 일정과 겹쳐서 추가할 수 없습니다.{"\n"}새로운 날짜를 선택해주세요.</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#cdd9f1", padding: 10, paddingRight: 40, paddingLeft: 40 }}
                onPress={() => {
                  this.setState({betweenVisible: !this.state.betweenVisible});
                }}
              >
                <Text style={styles.textStyle}>돌아가기</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addedVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.betweenView}>
              <Text style={styles.modalText}>추가되었습니다.</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#cdd9f1", padding: 10, paddingRight: 40, paddingLeft: 40 }}
                onPress={() => {
                  this.setState({addedVisible: !this.state.addedVisible},() => {
                  });
                  navigation.goBack();
                }}
              >
                <Text style={styles.textStyle}>확인</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={styles.centeredView}>
          <Text style={styles.modalText}>단식 종류</Text>
          <View style={styles.radio}>
            <View style={styles.radioItem}>
              <RadioButton 
                value = 'first'
                status={this.state.type === 1 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({type:1, tVisible:true, ttVisible:false, tttVisible:false, ttttVisible:false})}
              />
              <Text>10일 단식</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value = "second"
                status={this.state.type === 2 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({type:2, tVisible:false, ttVisible:true, tttVisible:false, ttttVisible:false})}
              />
              <Text>14일 단식</Text>
            </View>
          </View>
          <View style={styles.radio}>
            <View style={styles.radioItem}>
              <RadioButton
                value = "third"
                status={this.state.type === 3 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({type:3, tVisible:false, ttVisible:false, tttVisible:true, ttttVisible:false})}
              />
              <Text>21일 단식</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value = "forth"
                status={this.state.type === 4 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({type:4, tVisible:false, ttVisible:false, tttVisible:false, ttttVisible:true})}
              />
              <Text>30일 단식</Text>
            </View>
          </View>
          {this.state.tVisible ? 
            <View style={styles.typeTextGroup} >
              <Text style={styles.typeText}>본 단식 10일ㆍ회복식 10일ㆍ조절식 30일 ： 총 </Text>
              <Text style={styles.typeTextBold}>50일</Text>
              <Text style={styles.typeText}> 소요</Text>
            </View>
           : null}
          {this.state.ttVisible ? 
            <View style={styles.typeTextGroup}>
              <Text style={styles.typeText}>본 단식 14일ㆍ회복식 10일ㆍ조절식 30일 ： 총 </Text>
              <Text style={styles.typeTextBold}>54일</Text>
              <Text style={styles.typeText}> 소요</Text>
            </View>
           : null}
          {this.state.tttVisible ? 
            <View style={styles.typeTextGroup}>
              <Text style={styles.typeText}>본 단식 21일ㆍ회복식 10일ㆍ조절식 30일 ： 총 </Text>
              <Text style={styles.typeTextBold}>61일</Text>
              <Text style={styles.typeText}> 소요</Text>
            </View>
           : null}
          {this.state.ttttVisible ? 
            <View style={styles.typeTextGroup}>
              <Text style={styles.typeText}>본 단식 30일ㆍ회복식 20일ㆍ조절식 30일 ： 총 </Text>
              <Text style={styles.typeTextBold}>80일</Text>
              <Text style={styles.typeText}> 소요</Text>
            </View>
           : null}
          <Text style={styles.modalText}>단식 시작일</Text>
          <DatePicker
            mode= 'date'
            date={this.state.date}
            onDateChange={this.handledate}
          />
          <Text style={styles.modalText}>현재 수치 및 목표 수치</Text>
          <View style={styles.threeCardGroup}>
            <NumericItem name={'현재 몸무게'} style={styles.threeCard} todo={this.getCW} item={this.state.startWeight}/>
            <NumericItemDouble name={'현재 혈압'} style={styles.threeCard} todo={this.getCBP} item={this.state.startBPressure}/>
            <NumericItem name={'현재 혈당'} style={styles.threeCard} todo={this.getCBS} item={this.state.startBSugar}/>
          </View>
          <View style={styles.threeCardGroup}>
            <NumericItem name={'목표 몸무게'} style={styles.threeCard} todo={this.getGW} item={this.state.goalWeight}/>
            <NumericItemDouble name={'목표 혈압'} style={styles.threeCard} todo={this.getGBP} item={this.state.goalBPressure}/>
            <NumericItem name={'목표 혈당'} style={styles.threeCard} todo={this.getGBS} item={this.state.goalBSugar}/>
          </View>
          <Text style={styles.modalText}>단식 목표</Text>
          <MemoItem memo={this.getMemo} item={this.state.goal}/>
          <View style={styles.threeCardGroup}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#cdd9f1", marginBottom: 15, flex: 1, margin: 17 }}
              onPress={this.addEvent}
            >
            <Text style={styles.textStyle}>추가하기</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#cdd9f1", marginBottom: 15, flex: 1, margin: 17 }}
              onPress={() => navigation.goBack()}
            >
            <Text style={styles.textStyle}>닫기</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
};

export default NewEvent;
