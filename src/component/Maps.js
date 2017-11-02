import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Array
} from "react-native";
import MapView from "react-native-maps";
import { Constants, Location, Permissions } from "expo";
import createMarker from "./createMarker";
import GetMarker from "./GetMarker";

const util = require("util");

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: null,
      s: null,
      user: null
    };
    this.lab = this.lab.bind(this);
  }

  static navigationOptions = {
    title: "Map"
  };

  componentDidMount() {
    this._getLocationAsync();
    this._getMarkers();
  }

  lab(snapshot) {
    const locations = {};
    const markers = [];
    locations.markers = markers;

    if (snapshot.val() === null) {
      return;
    }

    const loc = JSON.stringify(snapshot.val());
    var latitude;
    var longitude = "";

    JSON.parse(loc, (key, value) => {
      if (typeof value === "number") {
        key === "latitude" ? (latitude = value) : (longitude = value);
        var location = {
          longitude: longitude,
          latitude: latitude
        };
        if (key === "longitude") {
          locations.markers.push(location);
        }
      }
    });
    this.setState({ s: locations.markers });
  }

  static _setMarker(data) {}

  _getMarkers = async () => {
    var email;

    var i = 0;

    while (
      this.props.navigation.state.params.mail[i] &&
      this.props.navigation.state.params.mail[i] !== "@"
    ) {
      i++;
    }
    email = this.props.navigation.state.params.mail.substring(0, i);

    var ref = firebase
      .app()
      .database()
      .ref(email + "/marker");
    /*var locations;*/
    const locations = {};
    const markers = [];
    locations.markers = markers;

    ref.on("value", this.lab);
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        locationResult: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location) });
  };

  createMarker(event, mail) {
    console.log("event = ");
    console.log(event.nativeEvent);
    createMarker.callDb(event.nativeEvent, mail);
  }

  isArray(a) {
    return !!a && a.constructor === Array;
  }

  render() {
    console.log("-------MAP-------");
    console.log(this.props.navigation.state.params.mail);
    var mail = this.props.navigation.state.params.mail;
    if (!this.state.s) {
      return (
        <MapView
          style={styles.map}
          onPress={e => this.createMarker(e, mail)}
          region={{
            latitude: 59.3232332323,
            longitude: 18.0628292929,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        />
      );
    }
    const v = this.state.s;
    console.log("___________________ BDD _______________________")
    console.log(v);
    console.log("___________________ BDD _______________________")
    return (
      <View style={styles.conatiner}>
        <Text style={styles.text}>lala</Text>
        <MapView
          style={styles.map}
          onPress={e => this.createMarker(e, mail)}
          region={{
            latitude: 59.3232332323,
            longitude: 18.0628292929,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
          {v.map((v, index) => (
            <MapView.Marker
              coordinate={{
                latitude: v.latitude,
                longitude: v.longitude
              }}
              key={index}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  text: {
    height: "100%"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
export default Maps;
