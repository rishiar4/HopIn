import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, PermissionsAndroid } from 'react-native'

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'


export default class Home extends Component {

constructor(){
    super();
    
}

componentDidMount() {
  

  
}



    static navigationOptions = {
        title: 'Welcome',
    };

    render() {
        return (
            <View style={{flex:1,flexDirection:'row'}}>
                {/* <Text> textInComponent </Text>

                <Button
                    title="Go to Settings"
                    onPress={() => this.props.navigation.push('setting', { name: 'Jane' })}
                /> */}

                <MapView
                    style={{ flex:5 }}
                    region={{
                        latitude: 42.882004,
                        longitude: 74.582748,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}

                />

                <View style={{flex:1}}>

                    <Button title="wow" onPress={this.abc}></Button>
                    <Button
                    title="Go to Settings"
                    onPress={() => this.props.navigation.push('setting', { name: 'Jane' })}
                />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
