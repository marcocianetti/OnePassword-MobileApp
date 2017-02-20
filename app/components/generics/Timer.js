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

export default class Timer extends Component {

    static propTypes = {
        duration: PropTypes.number.isRequired,
        regex: PropTypes.object,
        onTimeExpired: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = this._getInitialState();

        this._startTimer();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

    _getInitialState = () => {

        // Orario di partenza in millisecondi
        const now = new Date().getTime();

        // Orario termine in millisecondi
        const end = now + this.props.duration * 1000;

        return {
            start: now,
            end: end,
            timeLeft: this.props.duration
        };
    }

    _startTimer = () => {

        this.timer = setInterval(() => {

            // Aggiorna il tempo rimanente
            this._updateTimeLeft(() => {

                // Se il tempo è terminato allora elimina il timer
                if(this.state.timeLeft <= 0) {
                    clearInterval(this.timer);

                    // Chiama la callback se presente
                    if(this.props.onTimeExpired) {
                        this.props.onTimeExpired();
                    }
                }
            });

        }, 1000);

    }

    _updateTimeLeft = (callback) => {
        let timeLeft = Math.floor(
            (this.state.end - new Date().getTime()) / 1000
        );

        if(timeLeft < 0) {
            timeLeft = 0;
        }

        this.setState({
            timeLeft: timeLeft
        }, callback)
    }

    _getRegexTimeLeft = () => {
        const regex = new RegExp(this.props.regex.variable, 'g');
        return this.props.regex.string.replace(regex, this.state.timeLeft);
    }

    render() {

        let timeLeft = this.props.regex
            ? this._getRegexTimeLeft()
            : this.state.timeLeft;

        return(
            <Text>
                { timeLeft }
            </Text>
        );
    }
}

const styles = StyleSheet.create({
})
