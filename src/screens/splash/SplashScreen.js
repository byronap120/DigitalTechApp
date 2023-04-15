import React, { useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { dbInit, dbInsertPost, dbInsertUser } from '../../data/database';
import postData from '../../data/posts.json';

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        fetchLocalData()
    }, []);

    const fetchLocalData = async () => {
        console.log("hola")
        dbInit()
        postData.posts.forEach(post => {
            dbInsertPost(post)
            dbInsertUser(post.author)
        });
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    }

    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default SplashScreen