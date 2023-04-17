import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView } from 'react-native';
import { dbCheckUserExists } from '../../data/database';
import { colors } from '../../styles/colors';
import themes from '../../styles/themes';
import PrimaryButton from '../../components/PrimaryButton';
import AppTextInput from '../../components/AppTextInput';
import * as SecureStore from 'expo-secure-store';


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handleLoginPress = () => {
        dbCheckUserExists(username.trim(), receiveResult)
    };

    const receiveResult = async (result) => {
        if (result != null) {
            await SecureStore.setItemAsync('username', result.username);
            navigation.navigate('Posts')
        } else {
            alert('No existe el usuario');
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text
                    style={styles.title}>
                    Digital Tech Inc
                </Text>
                <View
                    style={themes.styles.card}>
                    <AppTextInput
                        value={username}
                        onChangeText={handleUsernameChange}
                        placeholder={"Username"}
                    />
                    <PrimaryButton
                        onPress={handleLoginPress}
                        title={"Entrar"}
                    />
                    <Text
                        style={styles.textLink}
                        onPress={() => navigation.navigate('SignUp')}>
                        Crear usuario
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
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