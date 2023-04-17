import React, { useContext, useState } from 'react';
import PostContext from '../../store/post_context';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import PostCard from './PostsCard';


const PostsLists = ({list}) => {
    const postCTx = useContext(PostContext)

    const renderItem = ({ item }) => (
        <PostCard
          id={item.id}
          image={item.image}
          message={item.message}
          likes={JSON.parse(item.likes)}
          author={JSON.parse(item.author)}
          create_at={item.create_at}
          location={item.location}
        />
      );

    return (
        <FlatList
            data={list}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
        />
    )
};


export default PostsLists;