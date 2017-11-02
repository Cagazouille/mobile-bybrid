import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import firebase from "firebase";
import Background from "./Background";
import { TitledInput } from "./TitledInput";
import Spinner from "./Spinner";
const util = require("util");
import createMarker from "./createMarker";

class LoginForm extends Component {
  constructor() {
    super();

    console.ignoredYellowBox = ["Setting a timer"];
  }

  state = { email: "", password: "", error: "", loading: false };
  navigates = null;
  alreadyPressed = 0;
  static navigationOptions = {
    title: "Login"
  };

  onLoginPress() {
    this.setState({ error: "", loading: true });

  //  mail = "lala@lala.com";
  //  this.navigates("Maps", { mail });

    const { email, password } = this.state;
    var mail = this.state.email;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ error: "", loading: false });
        this.navigates("Maps", { mail });
      })
      .catch(() => {
        //Login was not successful, let's create a new account
        console.log("Creation de compte");
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ error: "", loading: false });
          })
          .catch(error => {
            console.log(error);
            this.setState({ error: "Authentication failed.", loading: false });
          });
      });
  }
  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onLoginPress.bind(this)} title="Log in" />;
  }
  test() {
    console.log("testttttt");
  }
  inputFocused(refName) {
    console.log("lolololol");
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        React.findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
  }

  render() {
    var { navigate } = this.props.navigation;
    this.navigates = navigate;

    return (
      <View>
        <Image source={require("./img/big-one.jpg")} style={styles.logo}>
          <TouchableOpacity style={styles.block} onClick={this.test()}>
            <ScrollView ref="scrollView">
              <View style={styles.content}>
                <TitledInput
                  label="Email Address"
                  placeholder="you@domain.com"
                  value={this.state.email}
                  onChangeText={email => this.setState({ email })}
                />
                <TitledInput
                  label="Password"
                  autoCorrect={false}
                  placeholder="*******"
                  secureTextEntry
                  value={this.state.password}
                  onChangeText={password => this.setState({ password })}
                />
                {this.renderButtonOrSpinner()}
                <Text style={styles.errorTextStyle}>{this.state.error}</Text>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </Image>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  container: {
    flex: 1
  },
  content: {
    // justifyContent: 'center',
    alignSelf: "center",
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.4)"
  },
  logo: {
    // flex: 1,
    alignSelf: "stretch",
    width: null,
    justifyContent: "center"
  },
  block: {
    top: 0
  },
  contentContainer: {
    marginVertical: 100
  }
};

export default LoginForm;
