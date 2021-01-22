import axios from 'axios';

let SERVER_ROOT_URL;
try {
    SERVER_ROOT_URL = new URL(process.env.REACT_APP_SERVER_ROOT_URL).href;
} catch (err) {
    SERVER_ROOT_URL = new URL('http://localhost:3000/').href;
}

// let CLIENT_ROOT_URL;
// try {
//     CLIENT_ROOT_URL = new URL(process.env.REACT_APP_CLIENT_ROOT_URL).href;
// } catch (err) {
//     CLIENT_ROOT_URL = new URL('http://localhost:3000/').href;
// }

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
    const recipeId = await axios.post(new URL('/api/editrecipe', SERVER_ROOT_URL).href);
    return recipeId.data;
}

async function getRecipe(recipeId) {
    const recipe = await axios.get(new URL(`/api/recipe/${recipeId}`, SERVER_ROOT_URL).href);
    return recipe.data;
}

async function updateRecipe(recipe) {
    await axios.put(new URL(`/api/recipe/${recipe._id}`, SERVER_ROOT_URL).href, { recipe });
}

async function recipeSearch(searchQuery, page) {
    console.log("searchQuery: ", searchQuery);
    console.log("page: ", page);
    const recipes = await axios.get(new URL('/api/recipe/search', SERVER_ROOT_URL).href, { params: { query: searchQuery, page } });
    return recipes.data;
}

async function getLibrary(email) {
    const recipes = await axios.get(new URL(`/api/mylibrary`, SERVER_ROOT_URL).href, { params: { email } });
    return recipes.data;
}

async function uploadFile(file, filename, endpoint) {
    const formData = new FormData();
    formData.append(filename, file);
    await axios.put(new URL(endpoint, SERVER_ROOT_URL), formData);
}

// async function getCreatedRecipes(userId) {
//     const recipes = await axios.get(new URL(`/api/recipe/createdRecipes`, SERVER_ROOT_URL).href, { params: { userId } });
//     return recipes.data;
// }


export {
    userSignup,
    userLogin,
    userLogout,
    userVerifyAccount,
    verifyUserLoggedIn,
    createRecipe,
    getRecipe,
    getLibrary,
    uploadFile,
    updateRecipe,
    recipeSearch,
    //getCreatedRecipes,
    SERVER_ROOT_URL,
}