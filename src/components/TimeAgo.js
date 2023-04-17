import React from 'react';
import { Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { colors } from '../styles/colors';

const TimeAgo = ({ timestamp }) => {
    const time = moment(timestamp);
    const now = moment();
    const diffDays = now.diff(time, 'days');

    if (diffDays >= 7) {
        const diffWeeks = Math.floor(diffDays / 7);
        return <Text style={styles.text}>{`${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`}</Text>;
    } else if (diffDays >= 1) {
        return <Text style={styles.text}>{`${diffDays} day${diffDays > 1 ? 's' : ''} ago`}</Text>;
    } else {
        const diffHours = now.diff(time, 'hours');
        if (diffHours >= 1) {
            return <Text style={styles.text}>{`${diffHours} hour${diffHours > 1 ? 's' : ''} ago`}</Text>;
        } else {
            const diffMinutes = now.diff(time, 'minutes');
            return <Text style={styles.text}>{`${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`}</Text>;
        }
    }
};

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        color: colors.grey,
    },
});

export default TimeAgo;