export const CHANGE_SCENE = 'change_scene';

export function changeScene(scene) {
    return function(dispatch) {
        dispatch({
            type: CHANGE_SCENE,
            scene: scene
        })
    }
}
