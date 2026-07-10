import { configureStore } from "@reduxjs/toolkit";
import interactionReducer from "../redux/interactionSlice";


export const store = configureStore({

    reducer:{
        interaction:interactionReducer
    }

});