import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import firebase from '../firebase';


class createMarker extends Component {

  static callDb(){
    var ref = firebase.app().database().ref();

    var UCRef = firebase.database().ref("numberofusers");
    var uc =    UCRef.on('value', snapshot => {
      this.setState({usercount: snapshot.val()});
    });
    debugger;

    console.log('---------------');
    console.log(uc);
    console.log('---------------');

    var data = {
      content: {
          people: [
            {
              name: "Test",
              age : 24
            },
            {
              name: "Foo",
              age: 25
            }
          ]
       }
    }
    console.log(data);

    //ref.push(data);

  }

  render() {
      return (
            <View>
              {this.callDb()}
            </View>
      );
  }
}

export default createMarker;
