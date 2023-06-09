import React, { useContext, useState } from 'react';
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { dbCheckUserExists } from '../../data/database';
import { colors } from '../../styles/colors';
import themes from '../../styles/themes';
import PrimaryButton from '../../components/PrimaryButton';
import AppTextInput from '../../components/AppTextInput';
import * as SecureStore from 'expo-secure-store';
import PostContext from '../../store/post_context';


const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const postCTx = useContext(PostContext)

    const handleUsernameChange = (value) => {
        setUsername(value);
    };

    const handleLoginPress = () => {
        dbCheckUserExists(username.trim(), receiveResult)
    };

    const receiveResult = async (result) => {
        if (result != null) {
            await SecureStore.setItemAsync('username', result.username);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Posts' }],
            });
        } else {
            alert('No existe el usuario');
        }
    }

    const resetAppData = () => {
        postCTx.resetAppData()
        alert('Los datos han sido borrados y reiniciados');

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
                    <Text
                        style={styles.textLinkGreen}
                        onPress={resetAppData}>
                        Recargar Datos
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
    textLinkGreen: {
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        color: colors.grey,
        textDecorationLine: 'underline',
        padding: 20,
    },

});

export default LoginScreen;