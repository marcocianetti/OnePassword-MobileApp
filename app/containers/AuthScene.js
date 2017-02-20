'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Auth from '../components/Auth';
import * as AuthActions from '../actions/AuthActions'

function mapStateToProps(state) {
    return state.Auth;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(AuthActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
