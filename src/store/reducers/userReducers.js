import { SET_LOGIN, SET_TOKEN, SET_USER } from "../actions/userActions";

// Etat initial du reducer
const initialState = {
    dataUser: "",
    token: null,
    isLogin: false,
};

// Définir le reducer
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        // Si l'action est de type SET_TOKEN
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        // Si l'action est de type SET_USER
        case SET_USER:
            return {
                ...state,
                dataUser: action.payload,
            };
        // Si l'action est de type SET_LOGIN
        case SET_LOGIN:
            return {
                ...state,
                isLogin: action.payload,
            };

        // Si l'action n'est d'aucun des types ci-dessus
        default:
            return state;
    }
};

export default userReducer;
