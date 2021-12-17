# MySocial
![MySocial](https://github.com/tttn13/social-app/actions/workflows/heroku-staging.yml/badge.svg?branch=develop)

### [Live Demo](https://mysocialappmsa.herokuapp.com/)

MySocial is a full-stack MERN app that is essentially a clone of the real Facebook. The UI of MySocial is similar but not identical to the real Facebook web app.  
## Screenshots
### ✨ Home Page ✨
![homepage](https://github.com/tttn13/social-app/blob/main/api/client/public/assets/screenshots/homepage.png)

### ✨ Profile Page ✨
![profilepage](https://github.com/tttn13/social-app/blob/main/api/client/public/assets/screenshots/profilepage.png)


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
- Runtime environment for JS: `Node.js `
- The NoSQL database to store document-based data: `MongoDB`
- MongoDB object modeling for node.js: `mongoose`
- Authentication and authorization of HTTP requests: `jsonwebtoken`
- Handling image uploads: `multer`
- Hashing passwords: `bcrypt`
- Load environment variables from .env file: `dotenv`
- Making HTTP requests from node.js: `axios`

## Key Features
- CRUD actions 
- Authentication and authorization of user
- Logged out user when session is expired or token is invalid
- Redirect to an user's profile page when clicking on their avatar image.
- Loading spinners for relevant fetching processes
- Fetching location from Google Maps Places API 
- Heroku Deployment using github actions workflows

## Functionality
### Login / Register
- You can `login` or `register`. The form is validated, then if the user is authenticated or registration is successful, the user is navigated to the Home Page.

### Post
- Certain CRUD actions can only be performed with a valid token such as `creating, editing and deleting a post`. 
- On the Home Page, you can create a post in which you can also `upload an image, tag friend(s), check in to a location, and add an emoji` that represents your feeling.
- There are options to edit and delete the post if you are the owner of the post. You can `hide` anyone's post from your Feed.
- You can leave `likes` and comments on a post. You can also unlike the post. 

### Comment
- You can leave comments on a post. You can also delete it. 
- You can `edit or delete` anyone's comment as long as you are the post creator

### Profile Header
- You can `follow or unfollow` an user. 
- The profile shows an user's information such as their current city, home town and relationship. 
- You can see a user's profile picture and cover picture. 


### Navbar

<img src='https://github.com/tttn13/social-app/blob/main/api/client/public/assets/screenshots/search-demo.gif' width = "500" height= '550'>
- You can `search` for users and posts.
- All the matching results will be displayed after hitting `Enter`
- You can view your Profile Page or `log out` of the account by clicking on your avatar image at the top right corner of Navbar
- Go back to Homepage by clicking on `MySocial logo` at the top left corner of Navbar. 

### Feed
- The Feed contains all posts from the user's friends, which you can interact with.

### Page
##### Home Page
- Navbar
- Sidebar and Right Bar show your friends. 
- Share a post 
- Feed

##### Profile Page
- Navbar
- Profile Header
- A timeline which contains posts made by that user's friends. 
