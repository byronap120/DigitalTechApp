import React, { } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';
import { AntDesign } from '@expo/vector-icons';

const LikeView = ({ handler, filled }) => {
    const colorIcon = filled ? colors.purple : colors.grey
    const nameIcon = filled ? "heart" : "hearto"
    return (
        <TouchableOpacity onPress={handler}>
            <AntDesign name={nameIcon} size={25} color={colorIcon} style={styles.icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: {
        marginRight: 5,
        marginLeft: 12,
    },
});

export default LikeView;