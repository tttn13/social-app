import dotenv from 'dotenv';

dotenv.config();

const env_config = {
    PF: process.env.REACT_APP_PUBLIC_FOLDER,
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
    demoUser : {
        email: "BettySmith@gmail.com",
        password: "123456"
    }
};
export default env_config