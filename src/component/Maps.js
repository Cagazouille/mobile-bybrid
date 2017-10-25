import React, { Component } from 'react';
import firebase from 'firebase';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import MapView from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

const util = require('util');

class Maps extends Component {
    static navigationOptions = {
        title: 'Map',
    };
    state = {
        locationResult: null
        };

        componentDidMount() {
            this._getLocationAsync();
            console.log(this.state.locationResult);
            }

            _getLocationAsync = async () => {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
            this.setState({
            locationResult: 'Permission to access location was denied',
            });
            }
            console.log("lool");
            let location = await Location.getCurrentPositionAsync({});
            this.setState({ locationResult: JSON.stringify(location) });
            };

    render() {
        return (
            <View style={styles.conatiner}>

              <Text style={styles.text}>lala</Text>
              <MapView style={styles.map}
                region={{
                    latitude: 59.3232332323,
                    longitude:18.0628292929,
                    latitudeDelta:0.1,
                    longitudeDelta:0.1
                }}>

                <MapView.Marker
                  coordinate={{latitude: 37.78825,
                  longitude: -122.4324}}
                  title={"title"}
                  description={"description"}
                />
              </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height: "100%",
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    text: {
        height: "100%",
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
})
export default Maps;
