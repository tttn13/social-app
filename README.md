# MySocial

![MySocial](https://github.com/tttn13/social-app/actions/workflows/heroku-staging.yml/badge.svg?branch=develop)

### [Live Demo](https://mysocialappmsa.herokuapp.com/)

MySocial is a full-stack MERN app that is essentially a clone of the real Facebook. The UI of MySocial is similar but not identical to the real Facebook web app.

## Screenshots

### ✨ Home Page ✨

![homepage](https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/homepage.png)

### ✨ Profile Page ✨

![profilepage](https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/profilepage.png)

## Technologies

### Front-end

- Framework for building client side: `React`
- Tool used to handle prop-drilling in the Component Tree and state of user: `Context API` with hooks
- Promise based HTTP client for the browser: `axios`
- Handling routing and navigation: `React Router`
- Google Maps Places API hook: `use-places-autocomplete`
- CSS-in-JS library for UI: `Material UI` with `CSS` customizations
- Manipulating and formatting dates: `timeago,js`, `react-time-ago`
- Linter and code formatter: `eslint`, `prettier`

### Back-end

- Runtime environment for JS: `Express` app in `Node.js` runtime 
- The NoSQL database to store document-based data: `MongoDB`
- MongoDB object modeling for node.js: `mongoose`
- Authentication and authorization of HTTP requests: `jsonwebtoken`
- Handling image uploads: `multer`
- Hashing passwords: `bcrypt`
- Load environment variables from .env file: `dotenv`
- Making HTTP requests and API calls from node.js: `axios`

## Key Features

- CRUD actions
- Authentication and authorization of user
- Logged out user when session is expired or token is invalid
- Form validation
- Redirect to an user's profile page when clicking on their avatar image
- Loading spinners for relevant fetching processes
- Fetching location from Google Maps Places API, videos from Google Youtube API, top news stories from the RSS Feed of NY times (then using a XML parser), and events info from the Ticketmaster API. All data are presented on the UI as Feed and linked to the external url (components are clickable)
- Heroku Deployment using github workflows

## Functionality

### Login / Register and Error Handling

- You can `login` or `register`. The form is validated, then if the user is authenticated or registration is successful, the user is navigated to the Home Page.
- For demonstration purpose, newly registered users are friends with existing users in database. Users can choose to unfriend them.
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/register-form.gif' width = "365" height= '369'>

An error message will show up: 
<p float="left"> 
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/register-error.gif' width = "365" height= '369'>
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/login-error.gif' width = "365" height= '369'>
</p>

- when user signs up with an email already existed in MySocial's database
- logged in with incorrect credentials
- internal server is not responding

### Post

- Certain CRUD actions can only be performed with a valid token such as `creating, editing and deleting a post`.
<p float="left"> 
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/create-post.gif' width = "480" height= '382'>
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/edit-post.gif' width = "480" height= '382'>
</p>

- On the Home Page, you can create a post in which you can also `upload an image, tag friend(s), check in to a location, and add an emoji` that represents your feeling.
- There are options to edit and `delete` the post if you are the owner of the post. You can `hide` anyone's post from your Feed.

<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/del-post.gif' width = "480" height= '382'>

- You can leave `likes` and comments on a post. You can also unlike the post.

### Create, Edit and Delete Comment

<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/comment.gif' width = "430" height= '550'>

- You can leave comments on a post. You can also delete it.
- You can `edit or delete` anyone's comment as long as you are the post creator

### Add Friend / Unfriend 

- You can `add friend or unfriend` an user. Changes will be reflected on both selected user's friend list and your friend's list.
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/addfriend.gif' width = "408" height= '207'>

- The profile shows an user's information such as their current city, home town and relationship.
- You can see a user's profile picture and cover picture.

### Search friends and posts

<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/search-demo.gif' width = "440" height= '480'>

- You can `search` for users and posts.
- All the matching results will be displayed after hitting `Enter`
- You can view your Profile Page or `log out` of the account by clicking on your avatar image at the top right corner of Navbar
- Go back to Homepage by clicking on `MySocial logo` at the top left corner of Navbar.

### Friend Requests 
- User can accept friend requests or delete from the UI 
- Upon accepting, friend request notification on top bar will reflect the change
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/friendreq.gif' width = "408" height= '207'>


### Feed of Videos, News, Events
- User can see related videos, top news and top events (default location is US). Each item is clickable, which means user will be redirected to the corrensponding url provided in the API response.
<p float="left"> 
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/videos.gif' width = "408" height= '207'>
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/news.gif' width = "408" height= '207'>
<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/events.gif' width = "408" height= '207'>

</p>


### Page

##### Home Page

- Navbar
- Sidebar and Right Bar that show friends list.
- Share a post
- Feed
- Find friends 
- Videos 
- News
- Events

##### Profile Page

- Navbar
- Profile Header
- A timeline which contains posts made by that user's friends.

## Usage

#### Env variables:

Set a `.env` file in server directory and add the following:

```
MONGO_URL = "Your Mongo URI"
ACCESS_TOKEN_SECRET = "Your JWT access token secret"
REACT_APP_MAPS_API_KEY="Your Google Maps API Key"
REACT_APP_YOUTUBE_API="Your Google Youtube API Key"
REACT_APP_EVENT_API_KEY="Your TicketMaster API Key"
REACT_APP_BASE_URL=http://localhost:8800/api/
REACT_APP_PF=http://localhost:8800/images/

```

#### Server:

```
npm install
node index
```

#### Client:

- Add `proxy` in `client/package.json`

```
"proxy": "http://localhost:8800/api"
```

- Run commands

```
cd api/client
npm install
npm start
```

#### Notes

To run Server and Client commands simultaneously and subscribe the app to code or file changes :

- Have [nodemon](https://www.npmjs.com/package/nodemon) and [concurrently](https://www.npmjs.com/package/concurrently) packages installed on Server side.
- Replace `scripts` in `api/package.json` with following:

```
"scripts": {
    "start": "nodemon index.js",
    "server": "nodemon index.js",
    "client": "npm start --prefix ../client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  }
```

- Run commands

```
npm install
npm dev
```
