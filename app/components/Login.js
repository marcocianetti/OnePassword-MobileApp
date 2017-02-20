'use strict';

import React, {
    Component,
    PropTypes
} from 'react';

import {
    TextInput
} from 'react-native';

import {
    NavigationBar,
    View,
    Text
} from '@shoutem/ui';

import Button from './generics/Button';
import Toolbar from './generics/Toolbar';
import routes from '../utils/Routes';

// Stile
import styles from './Login.Style.js';

export default class Login extends Component {

    static propTypes = {
        login: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = this._getInitialState();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.loading == false) {
            if(nextProps.login_success == false) {
                alert('Errore durante il login');
            } else if(nextProps.login_success == true) {
                this.props.navigator.push(routes['profile']);
            }
        }
    }

    _getInitialState() {
        return {
            email: "",
            password: "",
            loading: false
        }
    }

    _onEmailChange = (text) => {
        this.setState({
            email: text
        });
    }

    _onPasswordChange = (text) => {
        this.setState({
            password: text
        });
    }

    _handleLoginClick = () => {

        if(this.state.email.trim() == 0) {
            alert('Devi inserire una email')
            this.refs.email.focus()
            return;
        }

        if(this.state.password.trim() == 0) {
            alert('Devi inserire una password')
            this.refs.password.focus()
            return;
        }

        this.props.login(this.state.email.trim(), this.state.password.trim());
    }

    render() {
        return (
            <View>

                <NavigationBar
                    styleName="inline"
                    title="LOGIN" />

                <View style={{
                    padding: 20
                }}>

                    <TextInput
                        ref="email"
                        style={ styles.field }
                        placeholder="Email"
                        onChangeText={ this._onEmailChange }
                        editable={ !this.state.loading }
                        onSubmitEditing={() => {
                            this.refs.password.focus()
                        }} />

                    <TextInput
                        ref="password"
                        style={ styles.field }
                        placeholder="Password"
                        onChangeText={ this._onPasswordChange }
                        secureTextEntry={ true }
                        editable={ !this.state.loading }
                        onSubmitEditing={ this._handleLoginClick } />

                    <Button
                        buttonStyle={{
                            marginTop: 10,
                            alignSelf: 'flex-end',
                            backgroundColor: '#009688',
                            paddingLeft: 20,
                            paddingRight: 20
                        }}
                        textStyle={{
                            color: '#fff'
                        }}
                        text="accedi"
                        action={ this._handleLoginClick }
                        loading={ this.state.loading } />

                </View>

            </View>
    );
  }
}
