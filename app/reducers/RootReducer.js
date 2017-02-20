'use strict';

import { CHANGE_SCENE } from '../actions/RootActions';
import routes from '../utils/Routes';

const initialState = {
    currentScene: routes["auth"]
};

export default function changeScene(state = initialState, action = {}) {

    switch (action.type) {
        case CHANGE_SCENE:
            return Object.assign({}, state, {
                currentScene: action.scene
            });

        default:
            return state;
  }
}
