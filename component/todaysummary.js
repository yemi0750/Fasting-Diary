import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, Modal, TouchableHighlight } from 'react-native';

const styles = StyleSheet.create({
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

class TodaySummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date, 
      dateString: this.props.dateString, 
      jang: this.props.jang, 
      goal: this.props.goal, 

      weight: this.props.weight,
      BP: this.props.BP,
      BS: this.props.BS,
      NOW: this.props.NOW,
      GT: this.props.GT,
      PW: this.props.PW,
      EG: this.props.EG,
      CG: this.props.CG,
      WG: this.props.WG,
      BPP: this.props.BPP,
      HH: this.props.HH,
      DB: this.props.DB,
      BB: this.props.BB,
      MM: this.props.MM,
      temp: this.props.temp,

      Nisi: this.props.Nisi,
      Doenjang : this.props.Doenjang,
      Miso : this.props.Miso,
      Chitosan : this.props.Chitosan, 
      Power : this.props.Power,
      Blossom : this.props.Blossom,
      Candy : this.props.Candy,
      Biwoom : this.props.Biwoom,
      Space : this.props.Space,

      memo : this.props.memo,
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.content}>
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
            <Text style={styles.title}>몸무게: {this.state.weight}Kg</Text>
            <Text style={styles.title}>혈압: {this.state.BP}mmHg</Text>
            <Text style={styles.title}>혈당: {this.state.BS}Kg</Text>
          </View>
          <Text style={styles.title}>꼼꼼히 체크해요!</Text>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>냉온욕: {this.state.NOW}회</Text>
            <Text style={styles.title}>각탕: {this.state.GT}분</Text>
            <Text style={styles.title}>풍욕: {this.state.PW}분</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>앱솜관장: {this.state.EG}회</Text>
            <Text style={styles.title}>커피관장: {this.state.CG}회</Text>
            <Text style={styles.title}>맹물관장: {this.state.WG}회</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>발목펌프: {this.state.BPP}회</Text>
            <Text style={styles.title}>합장합척: {this.state.HH}회</Text>
            <Text style={styles.title}>등배운동: {this.state.DB}회</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>붕어운동: {this.state.BB}회</Text>
            <Text style={styles.title}>모관운동: {this.state.MM}회</Text>
          </View>
          <Text style={styles.title}>식단</Text>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>니시차: {this.state.Nisi}포</Text>
            <Text style={styles.title}>된장차: {this.state.Doenjang}포</Text>
            <Text style={styles.title}>장미소: {this.state.Miso}포</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>키토산: {this.state.Chitosan}알</Text>
            <Text style={styles.title}>파워플러스: {this.state.Power}포</Text>
            <Text style={styles.title}>블로썸: {this.state.Blossom}알</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>사탕: {this.state.Nisi}알</Text>
            <Text style={styles.title}>다비움: {this.state.Doenjang}통</Text>
            <Text style={styles.title}>우주밥상: {this.state.Miso}포</Text>
          </View>
          <Text>현미밥, 야채 - 추가하기 눌러서 항목 추가</Text>
          <Text style={styles.title}>오늘 하루: {this.state.memo}</Text>
        </View>
      </ScrollView>
    );
  }
};

export default TodaySummary;
