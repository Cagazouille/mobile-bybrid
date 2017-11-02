import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";
import firebase from "../firebase";
import Maps from './Maps';

class getMarker extends Component {


  static callDb(elem) {
    console.log("begin callDB");

    var ref = firebase
      .app()
      .database()
      .ref("monid" + "/marker");
    /*var locations;*/

    var uc = ref.on("value", function(snapshot) {


      const characters = [
        {
          name: 'Kevin',
          image: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-12/8/10/asset/buzzfeed-prod-fastlane03/sub-buzz-3484-1481210659-5.png',
          coordinate: [ 40.764466, -73.974488 ],
          good: true,
        },
        {
          name: 'Uncle Frank',
          image: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-12/8/10/asset/buzzfeed-prod-fastlane02/sub-buzz-25788-1481210705-7.png',
          coordinate: [ 40.764656, -73.980907 ],
          good: false,
        },
        {
          name: 'Aunt Leslie',
          image: 'https://img.buzzfeed.com/buzzfeed-static/static/2016-12/8/10/asset/buzzfeed-prod-fastlane01/sub-buzz-5211-1481210889-4.png',
          coordinate: [ 40.764838, -73.981193 ],
          good: false,
        },

      ];

      //console.log(characters);

      /*Creation objet JSON pour donner a Map.js => Contient tous les pins du User dans la DB*/
      const locations = {};
      const markers = [];
      locations.markers = markers;

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
      console.log(locations.markers);
  //    elem.setState({s: locations});
  //    Maps._setMarker(locations, elem);
      return locations.markers;
    });
  }

  render() {
    return <View>{this.callDb()}</View>;
  }
}

export default getMarker;
