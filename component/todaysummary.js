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
          <Text style={styles.title}>오늘 나의 수치는?</Text>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>몸무게: {this.props.weight}Kg</Text>
            <Text style={styles.title}>혈압: {this.props.BP}mmHg</Text>
            <Text style={styles.title}>혈당: {this.props.BS}Kg</Text>
          </View>
          <Text style={styles.title}>꼼꼼히 체크해요!</Text>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>냉온욕: {this.props.NOW}회</Text>
            <Text style={styles.title}>각탕: {this.props.GT}분</Text>
            <Text style={styles.title}>풍욕: {this.props.PW}분</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>앱솜관장: {this.props.EG}회</Text>
            <Text style={styles.title}>커피관장: {this.props.CG}회</Text>
            <Text style={styles.title}>맹물관장: {this.props.WG}회</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>발목펌프: {this.props.BPP}회</Text>
            <Text style={styles.title}>합장합척: {this.props.HH}회</Text>
            <Text style={styles.title}>등배운동: {this.props.DB}회</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>붕어운동: {this.props.BB}회</Text>
            <Text style={styles.title}>모관운동: {this.props.MM}회</Text>
          </View>
          <Text style={styles.title}>식단</Text>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>니시차: {this.props.Nisi}포</Text>
            <Text style={styles.title}>된장차: {this.props.Doenjang}포</Text>
            <Text style={styles.title}>장미소: {this.props.Miso}포</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>키토산: {this.props.Chitosan}알</Text>
            <Text style={styles.title}>파워플러스: {this.props.Power}포</Text>
            <Text style={styles.title}>블로썸: {this.props.Blossom}알</Text>
          </View>
          <View style={styles.threeCardGroup}>
            <Text style={styles.title}>사탕: {this.props.Candy}알</Text>
            <Text style={styles.title}>다비움: {this.props.Biwoom}통</Text>
            <Text style={styles.title}>우주밥상: {this.props.Space}포</Text>
          </View>
          <Text>현미밥, 야채 - 추가하기 눌러서 항목 추가</Text>
          <Text style={styles.title}>오늘 하루: </Text>
          <Text style={styles.title}>{this.props.memo}</Text>
        </View>
      </ScrollView>
    );
  }
};

export default TodaySummary;
