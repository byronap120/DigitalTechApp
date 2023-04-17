import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../styles/colors';
import Avatar from '../../components/ImageAvatar';
import TimeAgo from '../../components/TimeAgo';
import LikeView from '../../components/LikeView';
import PostContext from '../../store/post_context';

const PostCard = ({ id, image, message, likes, author, create_at, location }) => {

    const [likedByUser, setLikedByUser] = useState(false)
    const postCTx = useContext(PostContext)

    useEffect(() => {
        likes.forEach((user) => {
            if (user.username === author.username) {
                setLikedByUser(true)
            }
        });
    }, []);

    const likeHandler = () => {
        const newValue = !likedByUser
        postCTx.updatePost(id, newValue, likes)
        setLikedByUser(newValue)
    }

    const renderImage = () => {
        if (image) {
            return <Image source={{ uri: image }} style={styles.image} />;
        } else {
            return null;
        }
    };

    const renderLikes = () => {
        if (likes && likes.length > 0) {
            const usernames = likes.map((item) => `@${item.username}`);
            const moreText = likes.length > 1 ? `y ${likes.length - 1} mas` : ''
            return (
                <View style={styles.likesContainer}>
                    <LikeView
                        handler={likeHandler}
                        filled={likedByUser}
                    />
                    <Text>Le gusta a {usernames[0]} {moreText}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.likesContainer}>
                    <LikeView
                        handler={likeHandler}
                        filled={likedByUser}
                    />
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        source={author.avatar}
                        borderColor={colors.purple}
                    />
                </View>
                <View style={styles.usernameContainer}>
                    <Text style={styles.username}>@{author.username}</Text>
                </View>
            </View>
            {renderImage()}
            {renderLikes()}
            <Text style={styles.message}>{message}</Text>
            <View style={styles.timestamp}>
                <TimeAgo timestamp={create_at} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderColor: '#ddd',
        borderWidth: 1,
        marginTop: 16,
        marginBottom: 16,
        backgroundColor: colors.white,
        maxWidth: 900,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 12,
        marginTop: 10,
    },
    usernameContainer: {
        marginLeft: 10,
        marginRight: 5,
    },
    username: {
        fontWeight: 'bold',
    },
    timestamp: {
        marginStart: 12,
        marginBottom: 8,
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
        marginBottom: 5,
    },
    likesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    likes: {
        flexDirection: 'row',
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    message: {
        marginStart: 12,
        marginEnd: 12,
        marginBottom: 14,
        marginTop: 4,
        fontWeight: 'bold',
        fontSize: 15,
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default PostCard;
