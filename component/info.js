import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Info extends Component {
    
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>생활단식 소개!</Text>
            </View>
        );
    }
};

export default Info;