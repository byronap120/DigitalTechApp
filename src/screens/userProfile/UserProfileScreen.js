import React, { useContext, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PostContext from '../../store/post_context';
import { colors } from '../../styles/colors';
import * as SecureStore from 'expo-secure-store';


const UserProfileScreen = ({ navigation }) => {

    const postCTx = useContext(PostContext)

    useEffect(() => {
        navigation.setOptions({
            title: 'Perfil Usuario',
            headerTintColor: colors.grey,
        });
    }, []);

    const onLogout = async() => {
        await SecureStore.deleteItemAsync('username');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: postCTx.user.avatar }} style={styles.avatar} />
            <Text style={styles.username}>@{postCTx.user.username}</Text>
            <Text style={styles.fullName}>{`${postCTx.user.name} ${postCTx.user.surname}`}</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    fullName: {
        fontSize: 18,
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: '#FF0000',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 40
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserProfileScreen;