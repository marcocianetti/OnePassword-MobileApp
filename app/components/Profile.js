'use strict';

import React, {
    Component,
    PropTypes
} from 'react';

import {
    NavigationBar,
    Title,
    Screen,
    Button,
    ListView
} from '@shoutem/ui';

import {
    View,
    Text
} from 'react-native';

import RegistrationPinDialog from './pin/RegistrationPinDialog';
import LoginPinDialog from './pin/LoginPinDialog';
import WebSiteListItem from './websites/WebSiteListItem';
import routes from '../utils/Routes';

// Stile
import styles from './Profile.Style.js';

export default class Profile extends Component {

    static propTypes = {
        getRegistrationPin: PropTypes.func.isRequired,
        getLoginPin: PropTypes.func.isRequired,
        getWebSitesList: PropTypes.func.isRequired,
        deleteWebsite: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showRegistrationPin: false,
            showLoginPin: false,
            selectedWebsite: null
        };
    }

    componentWillReceiveProps(props) {
        if(props.logoutState.loggedOut == true) {
            this.props.navigator.replace(routes['auth']);
        }
    }

    componentWillMount() {
        this.props.getWebSitesList();
    }

    _handleWebsiteRegistrationClick = () => {
        this.setState({
            showRegistrationPin: true
        }, () => {

            // Richiesta pin
            this.props.getRegistrationPin();
        });
    }

    _handleRegistrationPinDialogClosed = () => {
        this.setState({
            showRegistrationPin: false
        });
    }

    _handleWebsiteItemClick = (website) => {
        this.setState({
            showLoginPin: true,
            selectedWebsite: website
        });
    }

    _handleLoginPinDialogClosed = () => {
        this.setState({
            showLoginPin: false,
            selectedWebsite: null
        });
    }

    _handleLogoutClick = () => {
        this.props.logout();
    }

    _handleDeleteWebsite = (website) => {
        this.setState({
            showLoginPin: false,
            selectedWebsite: null
        }, () => {
            this.props.deleteWebsite(website._id);
        });
    }

    _renderWebsite = (website, sectionId, rowId) => {
        return(
            <WebSiteListItem
                website={ website }
                id={ rowId }
                itemClick={ this._handleWebsiteItemClick }/>
        );
    }

    render() {
        return(
            <Screen>

                <NavigationBar
                    styleName="inline"
                    centerComponent={
                        <Title>I TUOI SITI</Title>
                    }
                    leftComponent={
                        <Button onPress={ this._handleLogoutClick }>
                            <Text>Logout</Text>
                        </Button>
                    }
                    rightComponent={
                        <Button onPress={ this._handleWebsiteRegistrationClick }>
                            <Text>Aggiungi</Text>
                        </Button>
                    }
                />

                <ListView
                    data={ this.props.websites || [] }
                    loading={ this.props.loading }
                    renderRow={ this._renderWebsite }
                    onRefresh={ this.props.getWebSitesList } />

                <LoginPinDialog
                    website={ this.state.selectedWebsite }
                    getLoginPin={ this.props.getLoginPin }
                    deleteWebsite={ this._handleDeleteWebsite }
                    show={ this.state.showLoginPin }
                    loading={ this.props.loading }
                    onClosed={ this._handleLoginPinDialogClosed } />

                <RegistrationPinDialog
                    registrationPin={ this.props.registrationPin || "" }
                    show={ this.state.showRegistrationPin }
                    loading={ this.props.loading }
                    onClosed={ this._handleRegistrationPinDialogClosed } />

            </Screen>
        );
    }

}
