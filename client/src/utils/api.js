import axios from 'axios';

let SERVER_ROOT_URL;
try {
    SERVER_ROOT_URL = new URL(process.env.REACT_APP_SERVER_ROOT_URL).href;
} catch (err) {
    SERVER_ROOT_URL = new URL('http://localhost:3000/').href;
}

let CLIENT_ROOT_URL;
try {
    CLIENT_ROOT_URL = new URL(process.env.REACT_APP_CLIENT_ROOT_URL).href;
} catch (err) {
    CLIENT_ROOT_URL = new URL('http://localhost:3000/').href;
}

async function userSignup(email, password) {
    await axios.post(new URL('/api/auth/signup', SERVER_ROOT_URL).href, { email, password });
}

async function userVerifyAccount(token) {
    await axios.put(new URL('/api/auth/verify', SERVER_ROOT_URL).href, { token });
}

async function userLogin(email, password) {
    await axios.post(new URL('/api/auth/login', SERVER_ROOT_URL).href, { email, password });
}

async function userLogout() {
    await axios.post(new URL('/api/auth/logout', SERVER_ROOT_URL).href);
}

async function verifyUserLoggedIn() {
    const user = await axios.get(new URL('/api/auth/login/success', SERVER_ROOT_URL).href);
    return user.data;
}

async function createRecipe() {
    const recipeId = await axios.post(new URL('/api/recipe', SERVER_ROOT_URL).href);
    return recipeId.data;
}

async function getRecipe(recipeId) {
    const recipe = await axios.get(new URL(`/api/recipe/${recipeId}`, SERVER_ROOT_URL).href);
    return recipe.data;
}

async function getLibrary() {
    await axios.post(new URL(`/api/mylibrary`, SERVER_ROOT_URL).href);
}

export {
    userSignup,
    userLogin,
    userLogout,
    userVerifyAccount,
    verifyUserLoggedIn,
    createRecipe,
    getRecipe,
    getLibrary,
    SERVER_ROOT_URL,
}