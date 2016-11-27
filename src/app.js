import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { Header, Button, Spinner } from './components/common';
import LoginForm  from './components/LoginForm';

class App extends Component {
    state = { loggedIn: null }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyCnGttGMOAUgtGeRSJ384Kf41xnB9Qfdk0',
            authDomain: 'auth-16df1.firebaseapp.com',
            databaseURL: 'https://auth-16df1.firebaseio.com',
            storageBucket: 'auth-16df1.appspot.com',
            messagingSenderId: '481014181261'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                this.setState({ loggedIn: true});
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <View style={{ flexDirection: 'row' }} >
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </View>
                );
            case false:
                return <LoginForm />;
            default:
                return <Spinner size="large" />;
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                { this.renderContent() }
            </View>
        );
    }
}

export default App;