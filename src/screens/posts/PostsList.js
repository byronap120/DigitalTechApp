import React, { useContext, useState } from 'react';
import PostContext from '../../store/post_context';
import { FlatList, View, Text, StyleSheet } from 'react-native';


const PostsLists = () => {
    const postCTx = useContext(PostContext)

    return (
        <FlatList
            data={postCTx.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
                return (
                    <View>
                        <Text>
                            {item.message}
                        </Text>
                    </View>
                );
            }}
        />
    )
};


export default PostsLists;