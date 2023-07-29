import {createStore, combineReducers} from "redux";

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "login":
            console.log("Login");
            return {res: "login succeed"};
        case "logout":
            console.log("logout");
            return {res: "logout succeed"};
        default:
            return state;
    }
}

const store = createStore(combineReducers({user: userReducer}));

export default store;