'use strict';

import React, { Component, PropTypes } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Toolbar extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        action: PropTypes.func,
        caps: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    _createToolbar = () => {
        return (
            <View style={ styles.toolbar }>
                <Text style={ styles.text }>
                    {
                        this.props.caps == false
                            ? this.props.text
                            : this.props.text.toUpperCase()
                    }
                </Text>
            </View>
        );
    }

    render() {

        let toolbar = this._createToolbar();

        if (this.props.action != undefined) {
            return (
                <TouchableOpacity
                    onPress={ this.props.action }>
                    { toolbar }
                </TouchableOpacity>
            );
        } else {
            return (toolbar);
        }
        
    }
}

const styles = StyleSheet.create({
    toolbar: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#333'
    },
    text: {
        color: '#FFF',
        padding: 10
    }
})
