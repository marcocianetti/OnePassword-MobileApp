'use strict';

import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class Button extends Component {

    static propTypes = {
        action: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        caps: PropTypes.bool,
        loading: PropTypes.bool,
        buttonStyle: PropTypes.object,
        textStyle: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    _createButtonText = () => {
        return (
            <Text style={[ styles.text, this.props.textStyle ]}>
                {
                    this.props.caps == false
                        ? this.props.text
                        : this.props.text.toUpperCase()
                }
            </Text>
        );
    }

    render() {
        let buttonText = this._createButtonText();

        if(this.props.loading == true) {
            return buttonText;
        } else {
            return (
                <TouchableOpacity
                    onPress={ this.props.action }
                    style={[ styles.button, this.props.buttonStyle ]}>
                    { buttonText }
                </TouchableOpacity>
            );
        }

  }
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 3,
        borderRadius: 50
    },
    text: {
        padding: 10
    }
})
