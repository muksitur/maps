import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'


Vue.use(Vuex);

export const store = new Vuex.Store({

    state: {
        imgURL: null,
        places: null,
        GetImageByImageURL: false,
        GetAllPlaces: false,
        AddPlace: false,
        DeletePlaceById: false,
        UpdatePlaceById: false,
        updateBody: null
    },


    getters: {

    },

    
    mutations: {
        GetImageByImageURL(state, imageURL){
            state.GetImageByImageURL = false;
            axios.get('http://localhost:3000/images/'+imageURL).then((response) =>{
                state.imgURL = response.data.imageURL;
                state.GetImageByImageURL = true;
            });
        },

        GetAllPlaces(state){
            state.GetAllPlaces = false;
            axios.get('http://localhost:3000/maps').then(response => {
                state.places = response.data;
                state.GetAllPlaces = true;
            });
        },

        AddPlace(state, place){
            state.AddPlace = false;
            axios.post('http://localhost:3000/maps', place).then((response) =>{
                console.log(response.data);
                state.AddPlace = true;
            });
        },

        DeletePlaceById(state, id){
            state.DeletePlaceById = false;
            axios.delete('http://localhost:3000/maps/'+id).then((response) => {
                console.log(response.data);
                state.DeletePlaceById = true;
            });
        },

        UpdatePlaceById(state, id){
            // console.log(place);
            state.UpdatePlaceById = false
            axios.put('http://localhost:3000/maps/'+id, state.updateBody).then((response) => {
                console.log(response.data);
                state.UpdatePlaceById = true;
            }).catch((error) => {
                console.error(error);
            });
        }
    }
});