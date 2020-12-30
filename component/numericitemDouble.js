import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card, Input } from 'react-native-elements';

const styles = StyleSheet.create({
	card: {
		margin: 0,
		padding: 10,
		borderWidth: 0,
		borderColor: 'transparent',
		elevation: 0,
	},
	title: {
		width: 130,
		fontSize: 15,
	},
	divider: {
		marginTop: -7,
		marginBottom: 0
	},
	textdivider:{
		fontSize: 20,
		marginTop: 10
	},
	inputcontainer: {
		borderBottomWidth: 0
	},
	input: {
		textAlign: 'center'
	},
	container: {
		height: 45,
		width: 60
	},
	BPGroup: {
		flex: 1,
    	flexDirection: 'row',
	}
});

class NumericItemDouble extends Component {
	state = {
		item1: this.props.item.split('/')[0],
		item2: this.props.item.split('/')[1]
	}

	handleitem1 = (text) => {
		console.log(text)
		this.setState({ item1: text },() => {
			this.props.todo(this.state.item1 +"/"+ this.state.item2);
		});
	}

	handleitem2 = (text) => {
		console.log(text)
		this.setState({ item2: text },() => {
			this.props.todo(this.state.item1 +"/"+ this.state.item2);
		});
	}

	render() {
		return (
			<Card containerStyle={styles.card} >
	            <Card.Title style={styles.title} >{this.props.name}</Card.Title>
	            <Card.Divider style={styles.divider} />
	            <View style={styles.BPGroup}>
	            	<Input
			            containerStyle={styles.container}
			            inputContainerStyle={styles.inputcontainer}
		            	inputStyle= {styles.input}
				        placeholder= {this.state.item1}
				        keyboardType= 'numeric'
					    value= {this.state.item1}
				        onChangeText= {this.handleitem1}
				    />
				    <Text style={styles.textdivider}> / </Text>
				    <Input
			            containerStyle={styles.container}
			            inputContainerStyle={styles.inputcontainer}
		            	inputStyle= {styles.input}
				        placeholder= {this.state.item2}
				        keyboardType= 'numeric'
					    value= {this.state.item2}
				        onChangeText= {this.handleitem2}
				    />
				</View>
	        </Card>
		);
	}
};

export default NumericItemDouble;