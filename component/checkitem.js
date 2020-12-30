import React, {Component} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { Switch } from 'react-native-paper';

const styles = StyleSheet.create({
  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor:'#eee',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20
  },
  itemInput: {
  	width: 70,
  	paddingRight: 20
  },
  itemName: {
  	fontSize: 17,
  }
});

class CheckItem extends Component {
	state = {
	    isEnabled: false
	}

	toggleSwitch = () => {
		this.setState({ isEnabled: !this.state.isEnabled });
		console.log(this.state.isEnabled);
		//db에 저장
		//.replace(/[^0-9]/g, '')
	}

	render() {
		return (
			<View style={styles.elem}>
	            <View style={styles.item}>
	            	<Text style={styles.itemName}>{this.props.name}</Text>
	            </View>
	            <View style={styles.itemInput}>
	            	<Switch
				        onValueChange={this.toggleSwitch}
				        value={this.state.isEnabled}
			        />
	            </View>
	        </View>
		);
	}
};

export default CheckItem;