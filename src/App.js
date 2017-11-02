import React, { Component } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Config from "react-native-config";
import { StackNavigator } from "react-navigation";
import LoginForm from "./component/LoginForm";
import Maps from "./component/Maps";
import firebase from "firebase";
import Test from "./component/test";

const Navigation = StackNavigator(
  {
    LoginForm: { screen: LoginForm },
    Maps: { screen: Maps }
  },
  { headerMode: "screen" }
);

class App extends Component {
  componentWillMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }
  }

  render() {
    return <Navigation />;
  }
}

export default App;
