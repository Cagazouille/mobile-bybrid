import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import firebase from "../firebase";
import Maps from "./Maps";

class GetMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      s: null
    };
    //  this.callDb = this.callDb.bind(this);
  }

  static callDb = async () => {
    console.log("begin callDB");

    var ref = firebase
      .app()
      .database()
      .ref("monid" + "/marker");
    /*var locations;*/
    const locations = {};
    const markers = [];
    locations.markers = markers;

    var uc = ref.on("value", function(snapshot) {
      /*Creation objet JSON pour donner a Map.js => Contient tous les pins du User dans la DB*/

      const loc = JSON.stringify(snapshot.val());
      var latitude;
      var longitude = "";

      /* Remplissage de l'objet JSON     */
      JSON.parse(loc, (key, value) => {
        if (typeof value === "number") {
          key === "latitude" ? (latitude = value) : (longitude = value);
          var location = {
            longitude: longitude,
            latitude: latitude
          };
          longitude === "" ? console.log() : locations.markers.push(location);
        }
      });
      console.log("-------Avant return-------");
      Maps._setMarker(locations);
      return locations;
      //      this.setState({ s: locations.markers });
      //    elem.setState({s: locations});
      //    Maps._setMarker(locations, elem);
    });
    console.log("-------TEST-------");
     console.log(locations.markers);
     console.log("-------TEST !-------");
    //this.setState({ s: locations.markers });
    //return locations;
  };

  render() {
    if (!this.state.s) {
      this.callDb();
    }
    // this.setState({ s: v});
    return <View />;

    if (!this.state.s) {
      return <View />;
    }
        console.log("rentre");
    const v = this.state.s;
    return (
      <View>
        {v.map((v, index) => (
          <MapView.Marker
            coordinate={{
              latitude: v.latitude,
              longitude: v.longitude
            }}
          />
        ))}
      </View>
    );
  }
}

export default GetMarker;
