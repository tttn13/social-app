import dotenv from 'dotenv';

dotenv.config();

const env_config = {
    PF: process.env.REACT_APP_PF,
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
    demoUser : {
        email: process.env.REACT_APP_DEMO_EMAIL,
        password: process.env.REACT_APP_DEMO_PASSWORD
    }
};
export default env_config