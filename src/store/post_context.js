import React, { useState, useEffect } from 'react';
import { dbGetAllPosts, dbInit } from '../data/database';


const PostContext = React.createContext({
    posts: [],
    updatePosts: () => { },
    filterPost: () => { },
});


export const PostContextProvider = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        dbInit()
        dbGetAllPosts(resultPostDB)
    }, []);

    const resultPostDB = (posts) => {
        setPosts(posts)
    }

    const filterPost = (query) => {
    
    }

    return (
        <PostContext.Provider
        value={{
            posts: posts,
            updatePosts: setPosts,
            filterPost: filterPost,
          }}>
            {props.children}
        </PostContext.Provider>
    )

}

export default PostContext