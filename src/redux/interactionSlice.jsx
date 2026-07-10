import {createSlice} from "@reduxjs/toolkit";


const initialState={

    hcp_name:"",
    interaction_type:"Meeting",
    date:"",
    time:"",
    attendees:[],
    topics:"",
    materials:[],
    sentiment:"Neutral",
    outcome:"",
    follow_up:""

};


const interactionSlice=createSlice({

    name:"interaction",
    initialState,
    reducers:{
        updateInteraction:(state,action)=>{
            return {
                ...state,
                ...action.payload
            }
        },
        clearInteraction:(state)=>{
            return initialState;
        }
    }
});


export const {updateInteraction,clearInteraction}=interactionSlice.actions;

export default interactionSlice.reducer;