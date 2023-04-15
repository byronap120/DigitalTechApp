import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { dbCheckUserExists } from '../../data/database';
import { colors } from '../../styles/colors';
import themes from '../../styles/themes';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handleLoginPress = () => {
        dbCheckUserExists(username, receiveResult)
    };

    function receiveResult(result) {
        console.log(result);
    }

    return (
        <View style={styles.container}>
            <Text
                style={styles.title}>
                Digital Tech Inc
            </Text>
            <View
                style={themes.styles.card}>
                <TextInput
                    style={themes.styles.textInput}
                    placeholder="@username"
                    autoCapitalize="none"
                    value={username}
                    onChangeText={handleUsernameChange}
                />
                <TouchableOpacity
                    style={themes.styles.primaryButton}
                    onPress={handleLoginPress}>
                    <Text style={themes.styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <Text
                    style={styles.textLink}
                    onPress={() => navigation.navigate('SignUp')}>
                    Crear usuario
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'grey',
        marginBottom: 22,
    },
    textLink: {
        marginTop: 36,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: colors.purple,
        textDecorationLine: 'underline',
        padding: 20,
    },

});

export default LoginScreen;