import axios from "axios";
import { setAlert } from "./alert";

import { ACCOUNT_DELETED, GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES,FOLLOW,FOLLOW_ERROR, UNFOLLOW } from "./types";

//get current user profiles
export const getCurrentProfile= () => async dispatch => {
    try{
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//create or update a profile
export const createProfile = (formData, history, edit=false) => async dispatch => {
    try{
        const config = {
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit?'Profile Updated': 'Profile Created', 'success'));

        if(!edit){
            history.push('/dashboard');
        }

    }catch(err){
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger'))); // danger is just defined in css and nothisn else
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
}


//delete account and profile
export const deleteAccount = () => async dispatch=>{
    if(window.confirm('Are you sure! This cant be undone')){
        try{
            await axios.delete('/api/profile');
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});
        }catch(err){
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
};

// get all profiles
export const getProfiles= () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});

    try{
        const res = await axios.get('/api/profile');
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

// get profiles by id
export const getProfileById= userId => async dispatch => {
    
    try{
        const res = await axios.get(`/api/profile/user/${userId}`); 
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    }catch(err){
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//follow
export const follow = id => async dispatch => {
    try{
        const res = await axios.put(`/api/users/follow/${id}`);
        // document.getElementsByClassName('follow123').innerHTML="following";
        console.log('following');
        dispatch({
            type: FOLLOW,
            payload: {id,follower:res.data}
        });
        window.location.reload();
        dispatch(setAlert('Follwing now', 'success'));
    }catch(err){
        dispatch({
            type: FOLLOW_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};

//unfollow
export const  unfollow = id => async dispatch => {
    try{
        const res = await axios.put(`/api/users/unfollow/${id}`);
        // document.getElementsByClassName('follow123').innerHTML="following";
        console.log('unfollowed');
        dispatch({
            type: UNFOLLOW,
            payload: {id,follower:res.data}
        });
        window.location.reload();
        dispatch(setAlert('Unfollowed', 'success'));

    }catch(err){
        dispatch({
            type: FOLLOW_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status
            }
        });
    }
};