import * as types from "./actionType";
import axios from "axios";

const getProject = () => (dispatch) => {
    dispatch({type:types.GET_PROJECT_REQUEST})
    axios.get("https://pure-fjord-44762.herokuapp.com/project/",{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` //the token is a variable which holds the token
        }
    })
    .then((r) => {
        // console.log("get",r.data);
        dispatch({type:types.GET_PROJECT_SUCCESS,payload:r.data})
    })
    .catch((err) => {
        dispatch({type:types.GET_PROJECT_FAILURE})
    })
}

const createProject = (payload) => (dispatch) => {
    dispatch({type:types.ADD_PROJECT_REQUEST})

    return axios.post('https://pure-fjord-44762.herokuapp.com/project/create',{...payload},{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` //the token is a variable which holds the token
        }
    })
    .then((r) => {
       return dispatch({type:types.ADD_PROJECT_SUCCESS})
    })
    .catch((err) => {
        dispatch({type:types.ADD_PROJECT_FAILURE})
    })
}

const updateProject = (payload,id) => (dispatch) => {
    dispatch({type:types.UPDATE_PROJECT_REQUEST})

    return axios.patch(`https://pure-fjord-44762.herokuapp.com/project/${id}/edit`,{...payload},{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` //the token is a variable which holds the token
        }
    })
    .then((r) => {
        return dispatch({type:types.UPDATE_PROJECT_SUCCESS})
    })
    .catch((err) => {
        dispatch({type:types.UPDATE_PROJECT_FAILURE})
    })
}


const deleteProject = (id) => (dispatch) => {
    dispatch({type:types.DELETE_PROJECT_REQUEST})

   return axios.delete(`https://pure-fjord-44762.herokuapp.com/project/${id}/delete`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}` //the token is a variable which holds the token
        }
    })
    .then((r) => {
       return dispatch({type:types.DELETE_PROJECT_SUCCESS})
    })
    .catch((err) => {
        dispatch({type:types.DELETE_PROJECT_FAILURE})
    })
}


export {getProject,createProject,updateProject,deleteProject};