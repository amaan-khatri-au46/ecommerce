import HomeScreen from "./srceens/HomeScreen.js";
import ProductScreen from "./srceens/ProductScreen.js";
import { hideLoading, parseRequestUrl, showLoading } from "./utils.js";
import Error404Screen from "./srceens/Error404Screen.js";
import CartScreen from "./srceens/CartScreen.js";
import SiginScreen from "./srceens/SigninScreen.js";
import Header from "./components/Header.js";
import RegisterScreen from "./srceens/RegisterScreen.js";
import ProfileScreen from "./srceens/ProfileScreen.js";
import ShippingScreen from "./srceens/ShippingScreen.js";
import PaymentScreen from "./srceens/PaymentScreen.js";


const routes = {
    '/': HomeScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart' : CartScreen,
    '/signin': SiginScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/shipping': ShippingScreen,
    '/payment': PaymentScreen,
    '/placeorder': PlaceOrderScreen,
};
const router = async() => {
    // here we will call showloading
    showLoading();
    // here we are using the function from utils.js
    const request = parseRequestUrl();
    //concatinating id as well as request 
    const parseUrl =
        (request.resource ? `/${request.resource}` : '/') +
        (request.id ? '/:id' : '') +
        (request.verb ? `/${request.verb}` : '');
        
        // so by having parse url  i can comapare this value with the items which is insdie the routes key 
    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    const header = document.getElementById("header-container");
    header.innerHTML = await Header.render();
    await Header.after_render();

    // inside this we need to get access to the main_container
    const main = document.getElementById('main-container');
    // after that i need to set 
    // here i use async wait beacuse the render method inside HomeScreen is async
    main.innerHTML = await screen.render();
    if (screen.after_render) await screen.after_render();
    hideLoading();
};
// now we are  Seting Load Event of window to router() function
window.addEventListener('load', router);
window.addEventListener('hashchange', router);



