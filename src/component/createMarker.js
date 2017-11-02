import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import firebase from "../firebase";

class createMarker extends Component {
  constructor(props) {
    super(props);
    this.isObject = this.isObject.bind(this);
  }

  isObject(a) {
    return !!a && a.constructor === Object;
  }

  static callDb(event, emaill) {
    var id;
    var i = 0;
    var email = "";
    email = emaill;

    while (email[i] && email[i] !== "@") {
      i++;
    }
    email = email.substring(0, i);

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        id = user.uid;
        //   User is signed in.
      } else {
        // No user is signed in.
      }
    });

    var ref = firebase
      .app()
      .database()
      .ref(email + "/marker/-KxNEB0AC0qTQa6nZBDu/");
    var newMarker = {
      content: {
        position: [
          {
            longitude: event.coordinate.longitude,
            latitude: event.coordinate.latitude
          }
        ]
      }
    };
     ref.push(newMarker);
  }

  render() {
    return <View>{this.callDb()}</View>;
  }
}

export default createMarker;
