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
  content: {
    margin: 10,
    fontSize: 17,
    textAlign: 'center'
  }
});

class TodaySummary extends Component {

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.content}>
        <View style={styles.contenttext}>
          <View style={styles.date}>
            <Text style={styles.textBold}>{this.props.pressedDate}</Text>
            <Text style={styles.textBold}>{this.props.pressedDateString}</Text>
          </View>
          <View style={styles.goal}>
            <Text style={styles.text}>{this.props.goal}</Text>
          </View>
          <Text style={styles.title}>📍 현재</Text>
          <Text style={styles.content}>체중 {this.props.weight}Kg  |  혈압 {this.props.BP}mmHg  |  혈당 {this.props.BS}mg/dL</Text>
          <Text style={styles.title}>💊 섭취</Text>
          <Text style={styles.content}>니시차 {this.props.Nisi}포  |  된장차 {this.props.Doenjang}포  |  장미소 {this.props.Miso}포</Text>
          <Text style={styles.content}>키토산 {this.props.Chitosan}알  |  파워플러스 {this.props.Power}포  |  블로썸 {this.props.Blossom}알</Text>
          <Text style={styles.content}>사탕 {this.props.Candy}알  |  다비움 {this.props.Biwoom}통  |  우주밥상 {this.props.Space}포</Text>
          <Text>현미밥, 야채 - 추가하기 눌러서 항목 추가</Text>
          <Text style={styles.title}>💪 운동 및 요법</Text>
          <Text style={styles.content}>냉온욕 {this.props.NOW}회  |  각탕 {this.props.GT}분  |  풍욕 {this.props.PW}분</Text>
          <Text style={styles.content}>앱솜관장 {this.props.EG}회  |  커피관장 {this.props.CG}회  |  맹물관장 {this.props.WG}회</Text>
          <Text style={styles.content}>발목펌프 {this.props.BPP}회  |  합장합척 {this.props.HH}회  |  등배운동 {this.props.DB}회</Text>
          <Text style={styles.content}>붕어운동 {this.props.BB}회  |  모관운동 {this.props.MM}회</Text>
          <Text style={styles.title}>✏ 오늘의 한 마디</Text>
          <Text style={styles.content}>{this.props.memo}</Text>
        </View>
      </ScrollView>
    );
  }
};

export default TodaySummary;
