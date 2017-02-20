'use strict';

import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducers from '../reducers/Reducers';
import RootScene from './RootScene';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <RootScene ref="rootScene" />
            </Provider>
        );
    }
}
