import React, { useState, useEffect } from 'react';
import { dbCheckUserExists, dbGetAllPosts, dbInit, dbInsertPost, dbInsertUser, dbResetData, dbUpdateLikes } from '../data/database';
import * as SecureStore from 'expo-secure-store';
import postData from '../data/posts.json'

const PostContext = React.createContext({
    posts: [],
    user: {},
    newPost: () => { },
    loadUserConfiguration: () => { },
    updatePost: () => { },
    fetchDataFirstTime: () => { },
    isUserLoggedIn: () => { },
    resetAppData: () => { },
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
        setUser(user)
    }

    const resultPostDB = (posts) => {
        setPosts(posts)
    }

    const newPost = (post) => {
        dbInsertPost(post, postInserted)
    }

    const postInserted = (result) => {
        if (result) {
            dbGetAllPosts(resultPostDB)
        }
    }

    const fetchDataFirstTime = async () => {
        try {
            const dataLoaded = await SecureStore.getItemAsync('dataLoaded')
            if (dataLoaded == null || dataLoaded == '') {
                postData.posts.forEach(post => {
                    dbInsertPost(post)
                    dbInsertUser(post.author)
                });
                await SecureStore.setItemAsync('dataLoaded', 'loaded');
            }
        } catch (error) {
            console.log('Error loading data: ', error)
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
        dbUpdateLikes(likes, postID, () => {
            console.log("Update like")
         })
    }

    const isUserLoggedIn = async (callback) => {
        try {
            const username = await SecureStore.getItemAsync('username')
            if (username != null && username.length > 3) {
                callback(true)
            } else {
                callback(false)
            }
        } catch (error) {
            callback(false)
        }
    }

    const resetAppData = () =>{
        dbResetData(async () => { 
            await SecureStore.setItemAsync('dataLoaded', '');
            fetchDataFirstTime()
        })
    }

    return (
        <PostContext.Provider
            value={{
                posts: posts,
                user: user,
                newPost: newPost,
                loadUserConfiguration: loadUserConfiguration,
                updatePost: updatePost,
                fetchDataFirstTime: fetchDataFirstTime,
                isUserLoggedIn: isUserLoggedIn,
                resetAppData:resetAppData
            }}>
            {props.children}
        </PostContext.Provider>
    )

}

export default PostContext