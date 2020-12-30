import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Input } from 'react-native-elements';
import { RNNumberStepper } from 'react-native-number-stepper';

const styles = StyleSheet.create({
	card: {
		margin: 10,
		padding: 10,
		borderWidth: 0,
		borderColor: 'transparent',
		elevation:0,
	},
	title: {
		width: 110,
		fontSize: 15,
		textAlign:'center'
	},
	divider: {
		marginTop: 10,
		marginBottom: 10
	},
	container: {
		height: 45
	}
});

class CountItem extends Component {
	state = {
		item: this.props.item
	}

	handleitem = (item) => {
		console.log(item)
		this.setState({ item: item },() => {
			this.props.count(this.state.item);
		});
	}

	render() {
		return (
			<View containerStyle={styles.card} >
	            <Text style={styles.title} >{this.props.name}</Text>
	            <Card.Divider style={styles.divider} />
	            <RNNumberStepper
		            size={5}
				    value={this.state.item}
				    maxValue={20}
				    autoRepeat={true}
				    buttonsBackgroundColor={'#cdd9f1'}
				    labelBackgroundColor={'#cdd9f1'}
			        onChange= {this.handleitem}
			        buttonsContainerWidth={30}
			    />
	        </View>
		);
	}
};

export default CountItem;