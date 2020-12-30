import React, { useState, Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Modal, TouchableHighlight } from 'react-native';
import NumericItem from './numericitem.js';
import NumericItemDouble from './numericitemDouble.js';
import CountItem from './countitem.js';
import MemoItem from './memoitem.js';

import SQLite from 'react-native-sqlite-storage';

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
  contenttext: {
    margin: 14,
    marginBottom: 30,
    paddingTop: 10
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
  date: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: '#cdd9f1'
  },
  goal: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
    padding: 5,
    backgroundColor: '#cdd9f1',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 17,
  },
  textBold: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  title: {
    margin: 18,
    fontSize: 17,
    textAlign: 'center'
  },
  threeCardGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20
  },
  threeCard: {
    flex: 1,
    margin: 0,
    padding: 0
  }
});

class DailyTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.route.params.date, 
      dateString: this.props.route.params.dateString, 
      cycle: this.props.route.params.cycle, 
      jang: this.props.route.params.jang, 
      goal: this.props.route.params.goal, 

      weight: this.props.route.params.weight,
      BP: this.props.route.params.BP,
      BS: this.props.route.params.BS,
      NOW: this.props.route.params.NOW,
      GT: this.props.route.params.GT,
      PW: this.props.route.params.PW,
      EG: this.props.route.params.EG,
      CG: this.props.route.params.CG,
      WG: this.props.route.params.WG,
      BPP: this.props.route.params.BPP,
      HH: this.props.route.params.HH,
      DB: this.props.route.params.DB,
      BB: this.props.route.params.BB,
      MM: this.props.route.params.MM,
      temp: this.props.route.params.temp,

      Nisi: this.props.route.params.Nisi,
      Doenjang : this.props.route.params.Doenjang,
      Miso : this.props.route.params.Miso,
      Chitosan : this.props.route.params.Chitosan, 
      Power : this.props.route.params.Power,
      Blossom : this.props.route.params.Blossom,
      Candy : this.props.route.params.Candy,
      Biwoom : this.props.route.params.Biwoom,
      Space : this.props.route.params.Space,

      memo : this.props.route.params.memo,
      addedVisible: false,
    }
  }

  getWeight = (weight) => {
    this.setState({weight:Number(weight)});
  }

  getBP = (BP) => {
    this.setState({BP:BP});
  }

  getBS = (BS) => {
    this.setState({BS:Number(BS)});
  }

  getNOW = (NOW) => {
    this.setState({NOW:Number(NOW)});
  }

  getGT = (GT) => {
    this.setState({GT:Number(GT)});
  }

  getPW = (PW) => {
    this.setState({PW:Number(PW)});
  }
  
  getEG = (EG) => {
    this.setState({EG:Number(EG)});
  }

  getCG = (CG) => {
    this.setState({CG:Number(CG)});
  }

  getWG = (WG) => {
    this.setState({WG:Number(WG)});
  }
  
  getBPP = (BPP) => {
    this.setState({BPP:Number(BPP)});
  }

  getHH = (HH) => {
    this.setState({HH:Number(HH)});
  }

  getDB = (DB) => {
    this.setState({DB:Number(DB)});
  }
  
  getBB = (BB) => {
    this.setState({BB:Number(BB)});
  }

  getMM = (MM) => {
    this.setState({MM:Number(MM)});
  }

  gettemp = (temp) => {
    this.setState({temp:Number(temp)});
  }

  getNisi = (Nisi) => {
    this.setState({Nisi:Number(Nisi)});
  }

  getDoenjang = (Doenjang) => {
    this.setState({Doenjang:Number(Doenjang)});
  }

  getMiso = (Miso) => {
    this.setState({Miso:Number(Miso)});
  }
  
  getChitosan = (Chitosan) => {
    this.setState({Chitosan:Number(Chitosan)});
  }

  getPower = (Power) => {
    this.setState({Power:Number(Power)});
  }

  getBlossom = (Blossom) => {
    this.setState({Blossom:Number(Blossom)});
  }
  
  getCandy = (Candy) => {
    this.setState({Candy:Number(Candy)});
  }

  getBiwoom = (Biwoom) => {
    this.setState({Biwoom:Number(Biwoom)});
  }

  getSpace = (Space) => {
    this.setState({Space:Number(Space)});
  }

  getMemo = (text) => {
    this.setState({memo:text});
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

        DB.transaction((tx) => {
          tx.executeSql(`INSERT OR REPLACE INTO todo (date, weight, bPressure, bSugar, chBath, fBath, wBath, eAbsom, eCoffee, eWater, exer1, exer2, exer3, exer4, exer5, mNisi, mDoenjang, mMiso, mChitosan, mPower, mBlossom, mCandy, mBiwoom, mSpace, memo) VALUES ("${this.state.date}", ${this.state.weight}, "${this.state.BP}", ${this.state.BS}, ${this.state.NOW}, ${this.state.GT}, ${this.state.PW}, ${this.state.EG}, ${this.state.CG}, ${this.state.WG}, ${this.state.BPP}, ${this.state.HH}, ${this.state.DB}, ${this.state.BB}, ${this.state.MM}, ${this.state.Nisi}, ${this.state.Doenjang}, ${this.state.Miso}, ${this.state.Chitosan}, ${this.state.Power}, ${this.state.Blossom}, ${this.state.Candy}, ${this.state.Biwoom}, ${this.state.Space}, "${this.state.memo}")`)
          .then(() => {
            console.log('insert transaction done');
          })
          .catch((error) => {
            console.log('insert transaction fail: ', error);
          });
          this.setState({ addedVisible: true });
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
      <ScrollView style={styles.content}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addedVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.betweenView}>
              <Text style={styles.modalText}>수정되었습니다.</Text>
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
        <View style={styles.contenttext}>
          <View style={styles.date}>
            <Text style={styles.textBold}>{this.state.date}</Text>
            <Text style={styles.textBold}>{this.state.dateString}</Text>
          </View>
          <View style={styles.goal}>
            <Text style={styles.text}>{this.state.goal}</Text>
          </View>
          <Text style={styles.title}>오늘 나의 수치는?</Text>
          <View style={styles.threeCardGroup}>
            <NumericItem name={'몸무게'} style={styles.threeCard} todo={this.getWeight} item={this.state.weight}/>
            <NumericItemDouble name={'혈압'} style={styles.threeCard}  todo={this.getBP} item={this.state.BP}/>
            <NumericItem name={'혈당'} style={styles.threeCard} todo={this.getBS} item={this.state.BS}/>
          </View>
          <Text style={styles.title}>꼼꼼히 체크해요!</Text>
          <View style={styles.threeCardGroup}>
            <CountItem name={'냉온욕'} style={styles.threeCard} count={this.getNOW} item={this.state.NOW} />
            <CountItem name={'각탕'} style={styles.threeCard} count={this.getGT} item={this.state.GT} />
            <CountItem name={'풍욕'} style={styles.threeCard} count={this.getPW} item={this.state.PW} />
          </View>
          <View style={styles.threeCardGroup}>
            <CountItem name={'앱솜관장'} style={styles.threeCard} count={this.getEG} item={this.state.EG} />
            <CountItem name={'커피관장'} style={styles.threeCard} count={this.getCG} item={this.state.CG} />
            <CountItem name={'맹물관장'} style={styles.threeCard} count={this.getWG} item={this.state.WG} />
          </View>
          <View style={styles.threeCardGroup}>
            <CountItem name={'발목펌프'} style={styles.threeCard} count={this.getBPP} item={this.state.BPP} />
            <CountItem name={'합장합척'} style={styles.threeCard} count={this.getHH} item={this.state.HH} />
            <CountItem name={'등배운동'} style={styles.threeCard} count={this.getDB} item={this.state.DB} />
          </View>
          <View style={styles.threeCardGroup}>
            <CountItem name={'붕어운동'} style={styles.threeCard} count={this.getBB} item={this.state.BB} />
            <CountItem name={'모관운동'} style={styles.threeCard} count={this.getMM} item={this.state.MM} />
            <CountItem name={'뿅'} style={styles.threeCard} count={this.gettemp} item={this.state.temp} />
          </View>
          <Text style={styles.title}>식단</Text>
          <View style={styles.threeCardGroup}>
            <NumericItem name={'니시차'} style={styles.threeCard} todo={this.getNisi} item={this.state.Nisi}/>
            <NumericItem name={'된장차'} style={styles.threeCard}  todo={this.getDoenjang} item={this.state.Doenjang}/>
            <NumericItem name={'장미소'} style={styles.threeCard} todo={this.getMiso} item={this.state.Miso}/>
          </View>
          <View style={styles.threeCardGroup}>
            <NumericItem name={'키토산'} style={styles.threeCard} todo={this.getChitosan} item={this.state.Chitosan}/>
            <NumericItem name={'파워플러스'} style={styles.threeCard}  todo={this.getPower} item={this.state.Power}/>
            <NumericItem name={'블로썸'} style={styles.threeCard} todo={this.getBlossom} item={this.state.Blossom}/>
          </View>
          <View style={styles.threeCardGroup}>
            <NumericItem name={'사탕'} style={styles.threeCard} todo={this.getCandy} item={this.state.Candy}/>
            <NumericItem name={'다비움'} style={styles.threeCard}  todo={this.getBiwoom} item={this.state.Biwoom}/>
            <NumericItem name={'우주밥상'} style={styles.threeCard} todo={this.getSpace} item={this.state.Space}/>
          </View>
          <Text>현미밥, 야채 - 추가하기 눌러서 항목 추가</Text>
          <Text style={styles.title}>오늘 하루는 어땠나요?</Text>
          <MemoItem memo={this.getMemo} item={this.state.memo}/>
          <View style={styles.threeCardGroup}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#cdd9f1", marginBottom: 15, flex: 1, margin: 17 }}
              onPress={this.addEvent}
            >
            <Text style={styles.textStyle}>확인</Text>
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

export default DailyTodo;
