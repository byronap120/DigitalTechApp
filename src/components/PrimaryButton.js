import React, { useState } from 'react';
import { Text , View, TouchableOpacity} from 'react-native';
import themes from '../styles/themes';


const PrimaryButton = (props) => {
    return (
        <View>
            <TouchableOpacity
                style={themes.styles.primaryButton}
                onPress={props.onPress}>
                <Text style={themes.styles.buttonText}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default PrimaryButton;