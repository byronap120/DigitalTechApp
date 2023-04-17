import React, { useState, useEffect } from 'react';
import { dbCheckUserExists, dbGetAllPosts, dbInit, dbInsertPost, dbUpdateLikes } from '../data/database';
import * as SecureStore from 'expo-secure-store';

const PostContext = React.createContext({
    posts: [],
    user: {},
    newPost: () => { },
    filterPost: () => { },
    loadUserConfiguration: () => { },
    updatePost: () => { },
});


export const PostContextProvider = (props) => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({})

    useEffect(() => {
        dbInit()
        loadUserConfiguration()
    }, []);

    const loadUserConfiguration = async () => {
        dbGetAllPosts(resultPostDB)
        try {
            const username = await SecureStore.getItemAsync('username')
            dbCheckUserExists(username, resultUserDB)
        } catch (error) {
            console.log('Error retrieving value: ', error)
        }
    }

    const resultUserDB = (user) => {
        console.log("PostContext - resultUserDB ")
        console.log(user)
        setUser(user)
    }

    const resultPostDB = (posts) => {
        setPosts(posts)
    }

    const filterPost = (query) => {

    }

    const newPost = (post) => {
        dbInsertPost(post, postInserted)
    }

    const postInserted = (result) => {
        if(result){
            dbGetAllPosts(resultPostDB)
        }
    }

    const updatePost = (postID, addtoArray, likes) => {
        const username = user.username
        const index = likes.findIndex((user) => user.username === username);
        if (addtoArray && index === -1) {
          likes.push({ avatar: '', username, name: '', surname: '' });
        } else if (!addtoArray && index !== -1) {
          likes.splice(index, 1);
        }
        dbUpdateLikes(likes, postID, () => { })
    }

    return (
        <PostContext.Provider
            value={{
                posts: posts,
                user: user,
                newPost: newPost,
                filterPost: filterPost,
                loadUserConfiguration: loadUserConfiguration,
                updatePost: updatePost
            }}>
            {props.children}
        </PostContext.Provider>
    )

}

export default PostContext