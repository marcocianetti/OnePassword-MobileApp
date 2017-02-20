'use strict';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Profile from '../components/Profile';
import * as ProfileActions from '../actions/ProfileActions'

function mapStateToProps(state) {
    return state.Profile;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ProfileActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
