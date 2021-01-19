import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Modal, TouchableHighlight } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { RadioButton } from 'react-native-paper';
import MemoItemFixed from './memoitemfixed.js';
import NumericItemFixed from './numericitemfixed.js';

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
    marginTop: 40
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  textBold: {
    marginTop: 30,
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: '#cdd9f1',
    padding: 3,
    paddingLeft: 7,
    paddingRight: 7,
  },
  modalText: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center"
  },
  modalTextContent:{
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18
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

class EditEvent extends Component {
  state = {
    idx: this.props.route.params.idx,
    startdate: this.props.route.params.startdate,
    enddate: this.props.route.params.enddate,
    type: this.props.route.params.type,
    startWeight: this.props.route.params.cweight,
    goalWeight: this.props.route.params.gweight,
    endWeight: this.props.route.params.eweight,
    startBPressure: this.props.route.params.cbp,
    goalBPressure: this.props.route.params.gbp,
    endBPressure: this.props.route.params.ebp,
    startBSugar: this.props.route.params.cbs,
    goalBSugar: this.props.route.params.gbs,
    endBSugar: this.props.route.params.ebs,
    goal: this.props.route.params.goal,
    betweenVisible: false,
    deletedVisible: false,
    tVisible: true,
    ttVisible: false,
    tttVisible: false,
    ttttVisible: false
  }

  deleteEvent = async () => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    await SQLite.openDatabase(
      {
        name: 'diaryDB.db',
        createFromLocation: 1,
      },
      (DB) => {        
        DB.transaction((tx) => {
          tx.executeSql(`DELETE FROM event where idx = ${this.state.idx}`).then(() => {
            this.setState({ deletedVisible: true });
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
  var handleToUpdate = this.props.handleToUpdate;

    return (
      <ScrollView >
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.deletedVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.betweenView}>
              <Text style={styles.modalText}>삭제되었습니다.</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#cdd9f1", padding: 10, paddingRight: 40, paddingLeft: 40 }}
                onPress={() => {
                  this.setState({deletedVisible: !this.state.deletedVisible});
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
                disabled = {this.state.tVisible}
                status={this.state.type === 1 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({type:1, tVisible:true, ttVisible:false, tttVisible:false, ttttVisible:false})}
              />
              <Text>10일 단식</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value = "second"
                disabled = {this.state.tVisible}
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
                disabled = {this.state.tVisible}
                status={this.state.type === 3 ? 'checked' : 'unchecked'}
                onPress={() => this.setState({type:3, tVisible:false, ttVisible:false, tttVisible:true, ttttVisible:false})}
              />
              <Text>21일 단식</Text>
            </View>
            <View style={styles.radioItem}>
              <RadioButton
                value = "forth"
                disabled = {this.state.tVisible}
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
          <Text style={styles.modalTextContent}>{moment(this.state.startdate).format("YYYY년 MM월 DD일")}</Text>
          <Text style={styles.modalText}>현재 수치 및 목표 수치</Text>
          <View style={styles.threeCardGroup}>
            <NumericItemFixed name={'현재 체중'} style={styles.threeCard} todo={this.getCW} item ={this.state.startWeight}/>
            <NumericItemFixed name={'현재 혈압'} style={styles.threeCard} todo={this.getCBP} item ={this.state.startBPressure}/>
            <NumericItemFixed name={'현재 혈당'} style={styles.threeCard} todo={this.getCBS} item ={this.state.startBSugar}/>
          </View>
          <View style={styles.threeCardGroup}>
            <NumericItemFixed name={'목표 체중'} style={styles.threeCard} todo={this.getGW} item ={this.state.goalWeight}/>
            <NumericItemFixed name={'목표 혈압'} style={styles.threeCard} todo={this.getGBP} item ={this.state.goalBPressure}/>
            <NumericItemFixed name={'목표 혈당'} style={styles.threeCard} todo={this.getGBS} item ={this.state.goalBSugar}/>
          </View>
          <View style={styles.threeCardGroup}>
            <NumericItemFixed name={'최종 체중'} style={styles.threeCard} todo={this.getEW} item ={this.state.endWeight}/>
            <NumericItemFixed name={'최종 혈압'} style={styles.threeCard} todo={this.getEBP} item ={this.state.endBPressure}/>
            <NumericItemFixed name={'최종 혈당'} style={styles.threeCard} todo={this.getEBS} item ={this.state.endBSugar}/>
          </View>
          <Text style={styles.modalText}>단식 목표</Text>
          <MemoItemFixed memo={this.getMemo} item ={this.state.goal}/>
          <View style={styles.threeCardGroup}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#cdd9f1", marginBottom: 15, flex: 1, margin: 8 }}
              onPress={this.deleteEvent}
            >
            <Text style={styles.textStyle}>삭제하기</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#cdd9f1", marginBottom: 15, flex: 1, margin: 8 }}
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

export default EditEvent;
