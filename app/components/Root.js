'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Text, Navigator } from 'react-native';
import SplashScreen from './SplashScreen'
import UserStorage from '../storages/UserStorage';
import routes from '../utils/Routes';

export default class RootScene extends Component {

    static propTypes = {
        changeScene: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props)

        let firstRoute;
        this.state = {}

        // Controlla se l'utente è già loggato
        UserStorage.getToken()
            .then((token) => {

                if(token === null) {
                    firstRoute = routes['auth'];
                } else {
                    firstRoute = routes['profile'];
                }

                this.setState({
                    currentScene: firstRoute
                });

            });
    }

    changeScene = (route, navigator) => {
        return React.createElement(route.scene, {
            navigator: navigator
        });
    }

    render() {
        if(this.state.currentScene != null) {
            return <Navigator
                    ref='navigator'
                    initialRoute={ this.state.currentScene }
                    renderScene={ this.changeScene } />
        } else {
            return <SplashScreen img="logo_scritta"/>
        }
    }

}
