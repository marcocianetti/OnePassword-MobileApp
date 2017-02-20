'use strict';

import React, {
    Component,
    PropTypes
} from 'react';

import {
    NavigationBar,
    Button,
    View,
    Text
} from '@shoutem/ui';

import Modal from 'react-native-modalbox';
import PinView from './PinView';

export default class RegistrationPinDialog extends Component {

    static propTypes = {
        registrationPin: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
        onClosed: PropTypes.func
    };

    constructor(props) {
        super(props);
    }

    _createPinView = () => {
            return(
                this.props.loading
                    ? <Text styleName='h-center'>
                        Caricamento in corso...
                    </Text>
                    : this.props.registrationPin
                        ? <PinView
                            pin={ this.props.registrationPin }
                            duration={ 60 } />
                        : null
            );
    }

    render() {
        return(
            <Modal
                style={{ height: 300 }}
                isOpen={ this.props.show }
                backButtonClose={ true }
                onClosed={ this.props.onClosed }>

                <NavigationBar
                    styleName="inline"
                    centerComponent={<Text>PIN - REGISTRAZIONE</Text>} />

                    <View
                        style={{
                            flex: 1,
                            padding: 16,
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>

                        { this._createPinView() }

                    </View>

            </Modal>
        );
    }

}
