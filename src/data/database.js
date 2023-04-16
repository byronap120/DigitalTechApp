import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('posts.db');

export const dbInit = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, image TEXT, message TEXT, likes TEXT, author TEXT, create_at TEXT, location TEXT, status TEXT)',
            [],
            () => {
                console.log('Posts table created successfully');
            },
            error => {
                console.log(error);
            },
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, avatar TEXT, name TEXT, surname TEXT)',
            [],
            () => {
                console.log('Users table created successfully');
            },
            error => {
                console.log(error);
            },
        );
    });
};

export const dbInsertPost = post => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO posts (image, message, likes, author, create_at, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [post.image, post.message, JSON.stringify(post.likes), JSON.stringify(post.author), post.create_at, post.location, post.status],
            () => {
                console.log('Post data inserted successfully');
            },
            error => {
                console.log(error);
            },
        );
    });
};

export const dbInsertUser = (user, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO users (username, avatar, name, surname) VALUES (?, ?, ?, ?)',
            [user.username, user.avatar, user.name, user.surname],
            () => {
                console.log('User data inserted successfully');
                if (callback && typeof callback === 'function') {
                    callback(true);
                  }
            },
            error => {
                console.log(error);
            },
        );
    });
};

export const dbCheckUserExists = async (username, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM users WHERE username = ?',
            [username],
            (_, result) => {
                if (result.rows.length === 0) {
                    callback(false);
                } else {
                    console.log(result.rows.length)
                    callback(true);
                }
            },
            error => {
                console.log(error);
            },
        );
    })
}

export const dbGetAllPosts = callback => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM posts',
        [],
        (_, result) => {
          let posts = [];
          for (let i = 0; i < result.rows.length; i++) {
            posts.push(result.rows.item(i));
          }
          callback(posts);
        },
        error => {
          console.log(error);
        },
      );
    });
  };