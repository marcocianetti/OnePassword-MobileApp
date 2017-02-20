'use strict';

import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet
} from 'react-native';

import {
    View,
    Text
} from '@shoutem/ui';

import Timer from '../generics/Timer';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';

const timeLeftRegex = {
    string: "Il pin scadrà tra %var secondi",
    variable: "%var"
};

export default class PinView extends Component {

    static propTypes = {
        pin: PropTypes.string.isRequired,
        duration: PropTypes.number.isRequired,
        createdAt: PropTypes.number
    };

    constructor(props) {
        super(props);

        let left;

        if(props.createdAt) {
            const now = new Date().getTime();
            left = Math.floor(((props.createdAt + props.duration * 1000) - now) / 1000);
        } else {
            left = props.duration;
        }

        let validPin = left > 0;

        this.state = {
            validPin: validPin,
            timeLeft: left
        }
    }

    _handlePinExpired = () => {
        this.setState({
            validPin: false,
            timeLeft: 0
        });
    };

    _createPinView = () => {
        if(this.state.validPin) {
            return(
                <View>
                    <Text style={ StyleSheet.flatten(styles.pin) }>
                        { this.props.pin }
                    </Text>
                    <Timer
                        duration={ this.state.timeLeft }
                        regex={ timeLeftRegex }
                        onTimeExpired={ this._handlePinExpired } />
                </View>
            );
        } else {
            return(
                <Text style={ StyleSheet.flatten(styles.pin) }>
                    Il pin { this.props.pin } non è più valido, richiedine un altro
                </Text>
            );
        }
    }

    render() {
        return(
            <View style={ StyleSheet.flatten(styles.container) }>
                { this._createPinView() }
            </View>
        );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16
  },
  pin: {
      fontSize: 25
  },
  duration: {
      fontSize: 10
  }
});
