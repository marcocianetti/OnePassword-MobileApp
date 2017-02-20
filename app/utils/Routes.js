import AuthScene from '../containers/AuthScene';
import ProfileScene from '../containers/ProfileScene';

export default routes = {
    'auth': {
        name: 'Auth',
        scene: AuthScene
    },
    'profile': {
        name: 'Profile',
        scene: ProfileScene
    }
};
