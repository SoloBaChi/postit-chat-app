# postit-chat-app

> By Solomon Joboson:
> This social media app enables users to create, update, delete and read any message with regard to communication ethics of live social media app, it allows users to make comment on a post and also retrieve the comments made by other user.

## Resources

- [Nodejs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Other Resources:

- [Data_Modelling](https://app.dbdesigner.net/designer/schema/607319)
- [API_Live_link](https://postit-chat-app-solobachi.onrender.com)
- [API_Documentation](https://heartfelt-eclair-84902e.netlify.app)

## Project Descripton:

This app was basically created with the ideology of working like other existing social media app, where a user can create accounts with the appropriate api endpoints `localhost:3001/signup` A user who does not have an account and claims to baised the rules of following the signing up process won't be allowes, middlewares like `jsonwebtoken` was used for authentication and verifacation, thereby assuring that the user an authorised one and has the full access to make a post

### Naming:

- names like `chat` and `post` was used interchageably in the variable naming

### APi end points:

- `localhost:3001/signup` : for a new user to signup
- `localhost:3001/api/chats/id`: the is specifically for an authorised user who wants to make a post or chat. the `id` used was used to target the user's id i.e the id of the particular user who wishes to make the post.
- `localhost:3001/api/chats/`: to retrieve chats/post made by the user
- `localhost:3001/api/chats/id/comments`: to make a comment to a particular post with the id and also to retrieve all comments nested under the id
- `localhost:3001/api/chat/id/comments/id`: to retrieve a single comment with the id

### Folder structure:

- node_modules: where all packages and dependencies are been saved, though not part of the push
- src: major directory for other directories
- config: conatians some config files like jwt secrects
- resources: contains the users, chats, and comments folders
- utils: contains general files like crud.js and auth.js

### SChema Names:

- chatSchema
- userScheam
- commentSchema
-

### external packages:

- nodemon
- validator
- cors
- body-parser e.t.c
