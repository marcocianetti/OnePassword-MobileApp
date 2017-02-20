'use strict';

import React, { Component, PropTypes } from 'react';
import { View, Image } from 'react-native';

export default class Login extends Component {

    static propTypes = {
        img: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center' }}>
                <Image
                    style={{ height: 200, width: 200 }}
                    source={{ uri: this.props.img }}
                />
            </View>
    );
  }
}
