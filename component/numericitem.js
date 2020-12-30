import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Input } from 'react-native-elements';

const styles = StyleSheet.create({
	card: {
		margin: 0,
		padding: 10,
		borderWidth: 0,
		borderColor: 'transparent',
		elevation:0
	},
	title: {
		width: 70,
		fontSize: 15
	},
	divider: {
		marginTop: -7,
		marginBottom: 0
	},
	inputcontainer: {
		borderBottomWidth: 0
	},
	input: {
		textAlign: 'center'
	},
	container: {
		height: 45
	}
});

class NumericItem extends Component {
	state = {
		item: this.props.item
	}

	handleitem = (item) => {
		console.log(item)
		this.setState({ item: item },() => {
			this.props.todo(this.state.item);
		});
	}

	render() {
		return (
			<Card containerStyle={styles.card} >
	            <Card.Title style={styles.title} >{this.props.name}</Card.Title>
	            <Card.Divider style={styles.divider} />
	            <Input
		            containerStyle={styles.container}
		            inputContainerStyle={styles.inputcontainer}
	            	inputStyle= {styles.input}
			        placeholder= {String(this.state.item)}
			        keyboardType= 'numeric'
				    value= {String(this.state.item)}
			        onChangeText= {this.handleitem}
			    />
	        </Card>
		);
	}
};

export default NumericItem;