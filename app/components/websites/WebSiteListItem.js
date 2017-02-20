'use strict';

import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import {
    Image
} from '@shoutem/ui';

export default class WebSiteListItem extends Component {

    static propTypes = {
        itemClick: PropTypes.func.isRequired,
        website: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    handleItemClick = () => {
        this.props.itemClick(this.props.website)
    }

    render() {

        const websiteIcon = this.props.website.icon
            ? this.props.website.icon
            : 'http://masir.net/iagh/images/icon-web.png';

        return (
            <TouchableOpacity
                key={ this.props.id }
                onPress={ this.handleItemClick }>
                <View
                    style={ styles.container }>

                    <Image
                        style={{
                            backgroundColor: 'transparent',
                        }}
                        styleName="small-avatar"
                        source={{ uri: websiteIcon }} />

                    <Text style={ styles.websiteName }>
                        { this.props.website.home }
                    </Text>

                </View>
            </TouchableOpacity>
        );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    websiteName: {
        fontSize: 20,
        marginLeft: 20
    }
})
