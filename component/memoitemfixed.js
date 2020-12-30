import React, {Component} from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Card } from 'react-native-elements';

const styles = StyleSheet.create({
	card: {
		margin: 0,
		padding: 10,
		width: '95%'
	},
	input: {
		textAlign: 'left',
		borderBottomWidth: 0
	}
});

class MemoItemFixed extends Component {
	state = {
		item: this.props.item
	}

	handleitem = (text) => {
		console.log(text)
		this.setState({ item: text },() => {
			this.props.memo(this.state.item);
		});
	}

	render() {
		return (
			<Card containerStyle={styles.card} >
				<TextInput
		            style= {styles.input}
		            multiline
		            numberOfLines= {4}
				    placeholder= {this.state.item}
				    onChangeText= {this.handleitem}
				    value= {this.state.item}
				    editable={false}
				    selectTextOnFocus={false}
				/>
			</Card>
		);
	}
};

export default MemoItemFixed;