import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handleLoginPress = () => {
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={handleUsernameChange}
            />
            <Button
                style={styles.button}
                title="Iniciar sesión"
                onPress={handleLoginPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '90%',
    },
});

export default LoginScreen;