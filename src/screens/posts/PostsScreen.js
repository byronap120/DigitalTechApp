import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { Feather } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PostContext from '../../store/post_context';
import PostsLists from './PostsList';
import PostsCreateModal from './PostsCreateModal';
import Avatar from '../../components/ImageAvatar';

const PostScreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const postCTx = useContext(PostContext)

    useEffect(() => {
        postCTx.loadUserConfiguration()
    }, []);

    const handleNewPost = () => {
        if (!createModalVisible) {
            setCreateModalVisible(true)
        }
    };

    const filteredPosts = postCTx.posts.filter(post => {
        const { author, message } = post;
        const search = searchText.toLowerCase();
        const username = JSON.parse(author).username
        return (
            username.toLowerCase().includes(search) ||
            message.toLowerCase().includes(search)
        );
    });

    const goToUserProfile = () => {
        navigation.navigate('UserProfile')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.userImage}
                    onPress={goToUserProfile}>
                    {/* <Image source={{ uri: 'https://cdn.pixabay.com/photo/2016/07/02/12/21/eclipse-1492818_960_720.jpg' }} style={{ width: '100%', height: '100%', borderRadius: 50 }} /> */}
                    <Avatar
                        source={postCTx.user.avatar}
                        borderColor={colors.purple}
                    />

                </TouchableOpacity>
                <View style={styles.searchInputContainer}>
                    <Feather name="search" size={24} color="grey" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar..."
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>
            </View>
            <PostsLists
                list={filteredPosts} />
            <PostsCreateModal
                visible={createModalVisible}
                setVisible={setCreateModalVisible}
            />
            <TouchableOpacity style={styles.floatingActionButton} onPress={handleNewPost}>
                <Entypo name="new-message" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundGrey,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginTop: 32,
    },
    userImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        paddingHorizontal: 16,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingLeft: 8,
    },
    searchIcon: {
        marginRight: 8,
    },
    floatingActionButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingActionButtonText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default PostScreen;