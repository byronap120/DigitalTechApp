import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Avatar = ({ source, borderColor }) => {

    const renderUserAvatar = () => {
        if (source) {
            return <Image style={styles.avatar} source={{ uri: source }} />
        } else {
            return <FontAwesome name="user-circle" size={40} color="grey" />;
        }
    }

    return (
        <View style={[styles.container, { borderColor }]}>
            {renderUserAvatar()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderRadius: 50,
        padding: 2,
        alignItems: 'flex-start',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 50,
    },
});

export default Avatar;
