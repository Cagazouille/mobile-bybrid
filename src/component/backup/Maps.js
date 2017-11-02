import React, { Component } from "react";
import firebase from "firebase";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import MapView from "react-native-maps";
import { Constants, Location, Permissions } from "expo";
import createMarker from "./createMarker";
import getMarker from "./getMarker";

const util = require("util");

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationResult: null,
      s: null
    };
  }

  static navigationOptions = {
    title: "Map"
  };

  componentDidMount() {
    this._getLocationAsync();
    console.log(this.state.locationResult);
    //this.setState({s: getMarker.callDb()});
  }

  lam(data) {
    this.setState({s: data});
  }

  static _setMarker(data, elem) {
    this.lam(data);
  }

  _getMarkers(){
    const ret = getMarker.callDb();
    console.log("return " + ret);
  }

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

  createMarker(event) {
    createMarker.callDb("lalalalacom", event.nativeEvent);
  }

  checkVariable() {
    if (variableLoaded == true) {
      // Here is your next action
    }
  }

  render() {
    console.log("-------MAP-------");
    console.log(this.state.s);
    this._getMarkers(this);
    if (!this.state.s) {
      return <View />;
    }
    return (
      <View style={styles.conatiner}>
        <Text style={styles.text}>lala</Text>
        <MapView
          style={styles.map}
          onPress={e => this.createMarker(e)}
          region={{
            latitude: 59.3232332323,
            longitude: 18.0628292929,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}
        >
          {lal.map((lal, index) => (
            <MapView.Marker
              coordinate={{
                latitude: this.state.s.latitude,
                longitude: this.state.s.longitude
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
