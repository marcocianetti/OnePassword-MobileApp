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

import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modalbox';
import PinView from './PinView';

export default class LoginPinDialog extends Component {

    static propTypes = {
        getLoginPin: PropTypes.func.isRequired,
        deleteWebsite: PropTypes.func.isRequired,
        show: PropTypes.bool.isRequired,
        loading: PropTypes.bool,
        onClosed: PropTypes.func
    };

    _createPinView = () => {
            return(
                this.props.loading
                    ? <Text styleName='h-center'>
                        Caricamento in corso...
                    </Text>
                    : this.props.website.loginPin
                        ? <PinView
                            pin={ this.props.website.loginPin.pin }
                            createdAt={ this.props.website.loginPin.createdAt }
                            duration={ this.props.website.loginPin.duration } />
                        : null
            );
    }

    _handleGetLoginPin = () => {
        this.props.getLoginPin(this.props.website);
    }

    _handleDeleteWebsite = () => {
        this.props.deleteWebsite(this.props.website);
    }

    render() {

        let websiteName =  this.props.website
        ? this.props.website.home.toUpperCase()
        : null;

        return(
            <Modal
                style={{ height: 300 }}
                isOpen={ this.props.show }
                backButtonClose={ true }
                onClosed={ this.props.onClosed }>

                    <NavigationBar
                        styleName="inline"
                        title="PIN - LOGIN" />

                    <View
                        style={{
                            flex: 1,
                            padding: 16,
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>

                        <Text
                            styleName='h-center'>
                            { websiteName }
                        </Text>

                        { this.props.website
                            ? this._createPinView()
                            : null
                        }

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                            <Button
                                style={{
                                    backgroundColor: '#F44336',
                                    alignSelf: 'flex-end'
                                }}
                                onPress={ this._handleDeleteWebsite }>
                                <Text style={{
                                    color: "#fff",
                                }}>
                                    ELIMINA SITO
                                </Text>
                            </Button>
                            <Button
                                style={{
                                    backgroundColor: '#009688',
                                    alignSelf: 'flex-start'
                                }}
                                onPress={ this._handleGetLoginPin }>
                                <Text style={{
                                    color: "#fff",
                                }}>
                                    RICHIEDI PIN
                                </Text>
                            </Button>
                        </View>

                </View>

            </Modal>
        );
    }

}
