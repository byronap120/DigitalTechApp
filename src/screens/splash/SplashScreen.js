import React, { useContext, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import PostContext from '../../store/post_context';

const SplashScreen = ({ navigation }) => {

    const postCTx = useContext(PostContext)

    useEffect(() => {
        fetchLocalData()
    }, []);

    const fetchLocalData = async () => {
        postCTx.fetchDataFirstTime()
        postCTx.isUserLoggedIn((result) => {
            const destination = result ? 'Posts' : 'Login'
            navigation.reset({
                index: 0,
                routes: [{ name: destination }],
            });
        })

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