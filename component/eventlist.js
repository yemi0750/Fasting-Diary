import React, { Component } from 'react';
import { StyleSheet, ScrollView, FlatList, View, Text, Modal,TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import EventItem from './eventitem.js';

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
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15
  },
  openButton2: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    paddingRight: 40,
    paddingLeft: 40
  },
  modalText: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: "center"
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },
  listitem: {
    width: '95%',
  },
  threeCardGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    marginRight: 30,
    marginLeft: 30
  }
});

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventlist: [],
      type: 1,
      idx: 0,
      startdate:'',
      enddate:'',
      goal:'',
      cweight:0,
      cbp: '0/0',
      cbs: 0,
      gweight:0,
      gbp: '0/0',
      gbs: 0,
      eweight:0,
      ebp: '0/0',
      ebs: 0,
      menuvisible: [],
      weight:[],
      bpressure:[],
      bsugar:[],
      day:[]
    }
    this.getAllEvent();
  }

  getAllEvent = async () => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    var eventlist = [];

    await SQLite.openDatabase(
    {
      name: 'diaryDB.db',
      createFromLocation: 1,
    },
    (DB) => {
      console.log("success opening diaryDB in newevent")

      DB.transaction((tx) => {
        let selectQuery = `SELECT * FROM event ORDER BY startDate DESC`;

        tx.executeSql(selectQuery, [], (tx, results) => {
          const rows = results.rows;
          var menuvisible = new Array(rows.length).fill(false);
          this.setState({ menuvisible: menuvisible });

          for (let i = 0; i < rows.length; i++) {
            var event = rows.item(i);

            var typeString = '';
            switch(event.type) {
              case 1:
                typeString = "10일 단식";
                break;
              case 2:
                typeString = "14일 단식";
                break;
              case 3:
                typeString = "21일 단식";
                break;
              case 4:
                typeString = "30일 단식";
                break;
            }

            var type = event.type;
            var idx = event.idx;
            var startdate = event.startDate;
            var enddate = event.endDate;
            var goal = (event.goal!=null ? event.goal : '');
            var cweight = (event.startWeight!=null ? event.startWeight : 0);
            var cbp = (event.startBPressure!=null ? event.startBPressure : '0/0');
            var cbs = (event.startBSugar!=null ? event.startBSugar : 0);
            var gweight = (event.goalWeight!=null ? event.goalWeight : 0);
            var gbp = (event.goalBPressure!=null ? event.goalBPressure : '0/0');
            var gbs = (event.goalBSugar!=null ? event.goalBSugar : 0);
            var eweight = (event.endWeight!=null ? event.endWeight : 0);
            var ebp = (event.endBPressure!=null ? event.endBPressure : '0/0');
            var ebs = (event.endBSugar!=null ? event.endBSugar : 0);

            let temp = {i: i, idx: idx, typeString: typeString, type: type, startdate:startdate, enddate:enddate, goal:goal,cweight:cweight, cbp:cbp, cbs: cbs, gweight:gweight, gbp:gbp, gbs: gbs,eweight:eweight, ebp:ebp, ebs: ebs };
            
            eventlist[i]=temp;
          }
          
          this.setState({ eventlist : eventlist }, () => {
          });

        });
      });
    });
  };
/*
  getFigures = async () => {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    await SQLite.openDatabase(
    {
      name: 'diaryDB.db',
      createFromLocation: 1,
    },
    (DB) => {
      console.log("success opening diaryDB in newevent")

      var day=[];
      for (var i = 1; i<=moment(this.state.enddate).diff(moment(this.state.startdate), 'days')+1 ; i++) {
        day=[...day, i.toString()];
      }
      var w= [];
      var bp = [];
      var bs = [];

      DB.transaction((tx) => {
        let selectQuery = `SELECT weight, bPressure, bSugar, date FROM todo where date between "${this.state.startdate}" and "${this.state.enddate}" order by date asc`;

        tx.executeSql(selectQuery, [], (tx, results) => {
          const rows = results.rows;
          for (let i = 0; i < rows.length; i++) {
            var event = rows.item(i);

            var date = event.date;
            const diff = moment(date).diff(moment(this.state.startdate), 'days');
            var zerolist = new Array(diff - w.length).fill(0);
            var zerostrlist = new Array(diff - w.length).fill('0/0');
            w = w.concat(zerolist);
            bp = bp.concat(zerostrlist);
            bs = bs.concat(zerolist);

            var weight = event.weight;
            var bPressure = event.bPressure;
            var bSugar = event.bSugar;
            
            w.push(weight);
            bp.push(bPressure);
            bs.push(bSugar);

            if(i == rows.length-1){
              const diff = moment(this.state.enddate).diff(moment(date), 'days');
              zerolist = new Array(diff).fill(0);
              zerostrlist = new Array(diff).fill('0/0');
              w = w.concat(zerolist);
              bp = bp.concat(zerostrlist);
              bs = bs.concat(zerolist);
            }
            
          }

          this.setState({ weight : w, bPressure:bp,bSugar: bs, day: day}, () => {
            this.props.navigation.navigate('ChartEvent', {
              goal: this.state.goal, startdate: this.state.startdate, enddate: this.state.enddate, 
              startWeight: this.state.cweight, startBPressure: this.state.cbp, startBSugar: this.state.cbs,
              goalWeight: this.state.gweight, goalBPressure: this.state.gbp, goalBSugar: this.state.gbs,
              endWeight: this.state.eweight, endBPressure: this.state.ebp, endBSugar: this.state.ebs,
              Weight: this.state.weight, BPressure: this.state.bPressure, BSugar: this.state.bSugar, day:this.state.day
            });
          });
        });
      });
    });
  };
*/
  onItemClickHandler = (i) => {
    this.setState({ idx: this.state.eventlist[i].idx,
      type: this.state.eventlist[i].type, startdate: this.state.eventlist[i].startdate, enddate: this.state.eventlist[i].enddate, goal: this.state.eventlist[i].goal,
      cweight: this.state.eventlist[i].cweight, cbp: this.state.eventlist[i].cbp, cbs: this.state.eventlist[i].cbs,
      gweight: this.state.eventlist[i].gweight, gbp: this.state.eventlist[i].gbp, gbs: this.state.eventlist[i].gbs,
      eweight: this.state.eventlist[i].eweight, ebp: this.state.eventlist[i].ebp, ebs: this.state.eventlist[i].ebs,
    }, () => {
      this.props.navigation.navigate('EditEvent', {
        type: this.state.type, idx: this.state.idx, goal: this.state.goal,
        startdate: this.state.startdate,enddate: this.state.enddate, 
        cweight: this.state.cweight, cbp: this.state.cbp, cbs: this.state.cbs,
        gweight: this.state.gweight, gbp: this.state.gbp, gbs: this.state.gbs,
        eweight: this.state.eweight, ebp: this.state.ebp, ebs: this.state.ebs
      });
    });
  };

  onItemDeleteHandler = (i) => {
    this.setState({ idx: this.state.eventlist[i].idx,
      type: this.state.eventlist[i].type, startdate: this.state.eventlist[i].startdate, enddate: this.state.eventlist[i].enddate, goal: this.state.eventlist[i].goal,
      cweight: this.state.eventlist[i].cweight, cbp: this.state.eventlist[i].cbp, cbs: this.state.eventlist[i].cbs,
      gweight: this.state.eventlist[i].gweight, gbp: this.state.eventlist[i].gbp, gbs: this.state.eventlist[i].gbs,
      eweight: this.state.eventlist[i].eweight, ebp: this.state.eventlist[i].ebp, ebs: this.state.eventlist[i].ebs,
    }, () => {
      this.props.navigation.navigate('DeleteEvent', {
        type: this.state.type, idx: this.state.idx, goal: this.state.goal,
        startdate: this.state.startdate,enddate: this.state.enddate, 
        cweight: this.state.cweight, cbp: this.state.cbp, cbs: this.state.cbs,
        gweight: this.state.gweight, gbp: this.state.gbp, gbs: this.state.gbs,
        eweight: this.state.eweight, ebp: this.state.ebp, ebs: this.state.ebs
      });
    });
  };

  onItemChartHandler = (i) => {
    this.setState({ idx: this.state.eventlist[i].idx,
      startdate: this.state.eventlist[i].startdate, enddate: this.state.eventlist[i].enddate, goal: this.state.eventlist[i].goal,
      cweight: this.state.eventlist[i].cweight, cbp: this.state.eventlist[i].cbp, cbs: this.state.eventlist[i].cbs,
      gweight: this.state.eventlist[i].gweight, gbp: this.state.eventlist[i].gbp, gbs: this.state.eventlist[i].gbs,
      eweight: this.state.eventlist[i].eweight, ebp: this.state.eventlist[i].ebp, ebs: this.state.eventlist[i].ebs,
    }, () => {
      //this.getFigures();
      console.log("chart clicked");
    });
  };

  setmenuvisible = (i) => {
    this.state.menuvisible[i]=!this.state.menuvisible[i];
    this.setState({ menuvisible: this.state.menuvisible });
  };

  menuGroup =(i) => {
    if(this.state.menuvisible[i]) {
      return (
        <View style={styles.threeCardGroup} >
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#cdd9f1", flex: 1, margin: 8 }}
            onPress={() => this.onItemClickHandler(i)}
          >
            <Text style={styles.textStyle}>수정하기</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#cdd9f1", flex: 1, margin: 8 }}
            onPress={() => this.onItemDeleteHandler(i)}
          >
            <Text style={styles.textStyle}>삭제하기</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#cdd9f1", flex: 1, margin: 8 }}
            onPress={() => this.onItemChartHandler(i)}
          >
            <Text style={styles.textStyle}>차트보기</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return null;
    }
  };

  componentDidMount = () => {
    this.props.navigation.addListener(
      'focus',
      payload => {
        this.getAllEvent();
      }
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView>
        <View style={styles.centeredView}>
          <FlatList
            keyExtractor={item => item.i.toString()}
            data={this.state.eventlist}
            style={styles.listitem} 
            renderItem={({item}) => 
              <ListItem bottomDivider onPress={() => this.setmenuvisible(item.i)}>
                <ListItem.Content>
                  <EventItem 
                    typeString={item.typeString} startdate={item.startdate} enddate={item.enddate} goal={item.goal}
                    cweight={item.cweight} cbp={item.cbp} cbs={item.cbs} 
                    gweight={item.gweight} gbp={item.gbp} gbs={item.gbs}
                    eweight={item.eweight} ebp={item.ebp} ebs={item.ebs}
                  />
                  {this.menuGroup(item.i)}
                </ListItem.Content>
              </ListItem>
            }
          />
          <TouchableHighlight
            style={{ ...styles.openButton2, backgroundColor: "#cdd9f1", marginBottom: 15, flex: 1, margin: 17 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textStyle}>닫기</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
};

export default EventList;
