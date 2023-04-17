import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import themes from '../../styles/themes';
import { colors } from '../../styles/colors';
import { dbInsertUser } from '../../data/database';

function SignUpScreen({ navigation }) {
    const [avatar, setAvatar] = useState('');
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    useEffect(() => {
        navigation.setOptions({
            title: 'Crear usuario',
            headerTintColor: colors.grey,
        });
    }, []);


    const handleSignUp = () => {
        if (!username || !name || !surname) {
            alert('Porfavor ingresa todos los campos');
            return;
        }

        const fieldLengths = {
            username: username.length,
            name: name.length,
            surname: surname.length,
        };
        for (const fieldName in fieldLengths) {
            const fieldLength = fieldLengths[fieldName];
            if (fieldLength < 3 || fieldLength > 20) {
                alert(`${fieldName} debe ser entre 3 y 20 caracteres`);
                return;
            }
        }
        createNewUser()
    };

    const createNewUser = () => {
        const user = {
            username,
            avatar,
            name,
            surname,
        };
        dbInsertUser(user, handleInsertUser)
    }

    const handleInsertUser = (inserted) => {
        var title = ''
        var message = ''
        if (inserted) {
            title = 'Exito'
            message = 'Usuario creado exitosamente'
        } else {
            title = 'Error'
            message = 'Error al crear usuario'
        }

        Alert.alert(
            title,
            message,
            [{
                text: 'OK',
                onPress: () => {
                    navigation.goBack();
                },
            },],
            { cancelable: false }
        );
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <View style={styles.container}>
                <View
                    style={themes.styles.card}>
                    <Text>
                        Username:
                    </Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        style={themes.styles.textInput}
                        autoCapitalize="none" />
                    <Text>
                        Name:
                    </Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={themes.styles.textInput}
                        autoCapitalize="none" />

                    <Text>
                        Surname:
                    </Text>
                    <TextInput
                        value={surname}
                        onChangeText={setSurname}
                        style={themes.styles.textInput}
                        autoCapitalize="none" />
                    <Text>
                        Avatar URL(Opcional):
                    </Text>
                    <TextInput
                        value={avatar}
                        onChangeText={setAvatar}
                        style={themes.styles.textInput}
                        autoCapitalize="none" />
                    <TouchableOpacity
                        style={themes.styles.primaryButton}
                        onPress={handleSignUp}>
                        <Text style={themes.styles.buttonText}>
                            Crear usuario
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SignUpScreen;
