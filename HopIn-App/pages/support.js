import React, { Component } from 'react';
import { View, Text,Linking } from 'react-native';

export default class support extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    url = "https://assistant-chat-us-south.watsonplatform.net/web/public/0a6bc6ae-106f-45d0-b016-e66fd7980e0d";
Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  }

  render() {
    return (
      <View>

      </View>
    );
  }
}
