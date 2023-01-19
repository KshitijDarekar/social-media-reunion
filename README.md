
# Social Media Backend

This repository is a backend service for a social media platform built on Node.js, Express.js, MongoDb, tested using Mocha and Chai .

## Demo

Insert gif or link to demo


[![Live URL](https://img.shields.io/badge/%F0%9F%8C%90%20Live%20Demo-Click%20Here-blueviolet?style=for-the-badge)](https://social-media-reunion-x1w6.onrender.com/)
## Features

- Getting a user profile
- Follow a user
- Upload a post
- Delete a post
- Like a post
- Unlike a liked post
- Comment on a post


## Tech Stack

**Server:** NodeJS, ExpressJS

**Database:** MongoDB

**Testing:** Mocha, Chai

**Tools:** Postman, VSCode

**Deployment:** Render
 


## Routes / API Reference

| Route  | Desc  | Method  | Note  |
| ------------ | ------------ | ------------ | ------------ |
|  `/api/login` | login if existing user  |  POST |INPUT: Email, Password   |
|  `/api/register` | registration for new user   |  POST | INPUT: Email, Password  |
|  `/api/logout` | logout from current session  |  GET | INPUT: Email, Password  |
|  `/api/authenticate` | POST /api/authenticate should perform user authentication and return a JWT token. |  POST |  Public  |
|  `/api/follow/{id}` |  authenticated user would follow user with {id} |   POST|  protected route |
|  `/api/unfollow/{id}` |  authenticated user would unfollow user with {id} |   POST|  protected route |
|  `/api/user` | authenticate the request and return the respective user profile  |  GET | RETURN: User Name, number of followers & followings  |
|  `/api/posts/` | add a new post created by the authenticated user |  POST |Input: Title, Description; RETURN: Post-ID, Title, Description, Created Time(UTC)    |
|  `/api/posts/{id}` | delete post with {id} created by the authenticated user |   DELETE |  protected route |
|  `/api/like/{id}` |  like the post with {id} by the authenticated user. |   POST|  protected route |
|  `/api/unlike/{id}` | unlike the post with {id} by the authenticated user. | POST | rrotected route    |
|  `/api/comment/{id}` | add comment for post with {id} by the authenticated user. |   POST |  Input: Comment;Return: Comment-ID |
|  `/api/posts/{id}` | return a single post with {id} populated with its number of likes and comments |   GET |  protected route |
|  `/api/all_posts` |  return all posts created by authenticated user sorted by post time. |   POST|  protected route |




                
----

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file



`URI`:`<mongodb atlas>`

`URI_TEST`:`<mongodb atlas>`

`SECRET`:`<Random string>`

`PORT`:`<port number to host server>`     

`IP`:`<ip to host server>`

`JWT_SECRET`:`<random string>`



## Run Locally

Clone the project

```bash
  git clone https://github.com/KshitijDarekar/social-media-reunion.git
```

Go to the project directory

```bash
  cd social-media-reunion
```

Install dependencies

```bash
  npm install
```

Start the local server

```bash
  npm run dev
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```

