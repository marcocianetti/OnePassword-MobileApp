'use strict';

import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    TextInput,
    Image,
    Text
} from 'react-native';

import Modal from 'react-native-modalbox';
import Login from './Login';
import Button from './generics/Button';
import routes from '../utils/Routes';

// Stile
import styles from './Auth.Style.js';

export default class Auth extends Component {

    static propTypes = {
        registration: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = this._getInitialState();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.error != null) {
            if(nextProps.error == 'login_failed') {
                alert('Email e/o password errati');
            } else if(nextProps.error == 'user_already_registered') {
                alert('Utente già registrato, esegui l\'accesso');
            } else {
                alert('Errore');
            }
            return;
        }

        if(nextProps.token != null) {
            this.props.navigator.replace(routes['profile']);
        }
    }

    _getInitialState() {
        return {
            email: "",
            password: "",
            loading: false,
            loginVisible: false
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

    _handleRegistrationClick = () => {

        // Controllo mail
        if(this.state.email.trim() == 0) {
            alert('Devi inserire una email')
            this.refs.email.focus()
            return;
        }

        // Controllo password
        if(this.state.password.trim() == 0) {
            alert('Devi inserire una password')
            this.refs.password.focus()
            return;
        }

        // Esegue la registrazione
        this.props.registration(this.state.email.trim(), this.state.password.trim());
    }

    _handleShowLogin = () => {
        this.setState({
            loginVisible: true
        });
    }

    _handleLoginClick = (email, password) => {

        // Esegue il login
        this.props.login(email, password);
    }

    _createLogin = () => {
        return (
            <Modal style={{ height: 300 }}
                    isOpen={ this.state.loginVisible }
                    backButtonClose={ true }
                    swipeThreshold={ 100 }
                    backdropOpacity={ 0.6 }>

                <Login login={ this._handleLoginClick } />

            </Modal>
        );
    }

    render() {

        var login = this._createLogin();

        return (
            <View style={ styles.container }>

                <Image
                    style={{
                        height: 100,
                        width: 100
                    }}
                    source={{ uri: 'logo' }} />

                <Text style={{
                    color: 'black',
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom:20
                }}>
                    One Password
                </Text>

                <Text style={{
                    color: 'black',
                    fontSize: 20,
                    marginBottom:20
                }}>
                    Registrazione
                </Text>

                <TextInput
                    ref="email"
                    style={ styles.field }
                    placeholder="Email"
                    onChangeText={ this._onEmailChange }
                    editable={ !this.state.loading }
                    onSubmitEditing={ () => {
                        this.refs.password.focus()
                    } } />

                <TextInput
                    ref="password"
                    style={ styles.field }
                    placeholder="Password"
                    onChangeText={ this._onPasswordChange }
                    editable={ !this.state.loading }
                    secureTextEntry={ true }
                    onSubmitEditing={ () => {
                        this._handleRegistrationClick
                    } } />

                <Button
                    buttonStyle={{
                        marginTop: 20,
                        marginBottom: 20,
                        backgroundColor: '#009688',
                        paddingLeft: 20,
                        paddingRight: 20
                    }}
                    textStyle={{
                        color: '#fff'
                    }}
                    text="registrati"
                    action={ this._handleRegistrationClick }
                    loading={ this.state.loading } />

                <Button
                    text="Hai già un account? Effettua l'accesso"
                    action={ this._handleShowLogin }
                    loading={ this.state.loading }
                    caps={ false }/>

                { login }

            </View>
    );
  }
}
