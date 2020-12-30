import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Input } from 'react-native-elements';
import moment from 'moment';

const styles = StyleSheet.create({
	title: {
		width: '100%',
		fontSize: 15
	},
	divider: {
		marginTop: -7,
		marginBottom: 0
	},
});

class EventItem extends Component {
	render() {
		return (
			<View>
				<Text style={styles.title} >{moment(this.props.startdate).format('YYYY년 MM월 DD일')} ~ {moment(this.props.enddate).format('YYYY년 MM월 DD일')}</Text>
		        <Text style={styles.textitem}>{this.props.typeString}</Text>
		        <Text style={styles.textitem}>시작 수치 : {this.props.cweight}kg ㆍ {this.props.cbp}mmHg ㆍ {this.props.cbs}mg/dL </Text>
		        <Text style={styles.textitem}>목표 수치 : {this.props.gweight}kg ㆍ {this.props.gbp}mmHg ㆍ {this.props.gbs}mg/dL </Text>
		        <Text style={styles.textitem}>최종 수치 : {this.props.eweight}kg ㆍ {this.props.ebp}mmHg ㆍ {this.props.ebs}mg/dL </Text>
		        <Text style={styles.textitem}>목표 : {"\n"}{this.props.goal} </Text>
		    </View>
		);
	}
};

export default EventItem;