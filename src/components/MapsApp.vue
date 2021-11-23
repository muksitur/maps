<template>
    <!-- this row element has three columns -->
    <div>
        <nav class="navbar bg-info text-light fixed-top" style="z-index: 1;">
            <!-- this button will pop up a modal for adding a new place -->
            <button class="btn btn-info" @click="sidebarToggle()">
                <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
            </button>
            <button class="btn btn-info" data-toggle="modal" data-target="#addModal">
                <i class="fa fa-plus fa-2x" aria-hidden="true"></i>
            </button>
        </nav>
        <div id="sidenav" class="sidenav" style="left: -290px">
            <div class="ml-2 row mb-1" v-for="(place, index) in places" :key="index">
                <button class="btn col-8 btn-primary mr-1" @click="loadImage(place)" data-toggle="modal" data-target="#imageModal">{{place.name}}</button>
                <button class="btn col-3 btn-secondary" style="font-size: 10px;" data-toggle="modal" :data-target="'#editModal'+place.id.toString()" @click="loadImage(place)">EDIT</button>
                <div class="modal fade" :id="'editModal'+place.id.toString()" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit Place</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body row">
                                <span style="font-weight:bold;" class="col-4">Name</span>
                                <input class="col-8" :id="'editName'+place.id.toString()" type="text" :value="place.name">
                                <span style="font-weight:bold;" class="col-4">Image Name</span>
                                <input class="col-8" :id="'editImageName'+place.id.toString()" type="text" :value="place.imageURL">
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" @click="update(place)" data-dismiss="modal">Save Changes</button>
                                <button type="button" class="btn btn-warning" @click="remove(place)" data-dismiss="modal">Delete Place</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                
        <div class="container-fluid">
            <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Place</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row mb-2">
                                <span style="font-weight:bold;" class="col-4">Name</span>
                                <input class="col-8" id="addName" type="text" v-model="place.name">
                            </div>
                            <div class="row mb-2">
                                <span style="font-weight:bold;" class="col-4">Latitude</span>
                                <input class="col-8" id="addLatitude" type="number" v-model="place.latitude">
                            </div>
                            <div class="row mb-2">
                                <span style="font-weight:bold;" class="col-4">Longitude</span>
                                <input class="col-8" id="addLongitude" type="number" v-model="place.longitude">
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="add()" data-dismiss="modal">ADD</button>
                        </div>
                    </div>
                </div>
            </div>
            
            
            <!-- this column is for the map -->
            <div class="" @click="sidebarClose()">
                <Map :places="places"/>
            </div>
            <!-- this column is for image of each place -->
            <div class="">
                <div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <img id="placeImage" :src="'http://localhost:8080/images/'+imgURL+'.jpg'" alt="NoImage">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar bg-info text-light fixed-bottom" style="z-index: 1;">
            <button class="btn btn-info">
                <i class="fa fa-street-view fa-2x" aria-hidden="true"></i>
            </button>
        </nav>
    </div>
    
</template>


<script lang="ts">
// import axios from 'axios'
import Map from './Map.vue'
import {store} from '../store/store'


export default {
    components:{
        Map
    },
    data() {
        return {
            store: store,
            places:[],
            place:{
                name:"",
                latitude:"",
                longitude:""
            },
            imgURL:''
        }
    },

    methods: {
        sidebarClose(){
            document.getElementById('sidenav').style.left = "-290px";
        },
        sidebarToggle(){
            if(document.getElementById('sidenav').style.left === "-290px"){
                document.getElementById('sidenav').style.left = "0px";
            }
            else{
                document.getElementById('sidenav').style.left = "-290px";
            }
        },
        loadImage(place){
            // init temp. And use temp istead of this, to avoid error
            let temp: any = this;
            temp.store.commit('GetImageByImageURL', place.imageURL);
            var waitForGetImage = setInterval(function() {
                if(temp.store.state.GetImageByImageURL === true){
                    stopWaitForGetImage();
                }
            }, 10);

            function stopWaitForGetImage() {
                clearInterval(waitForGetImage);
                temp.imgURL = temp.store.state.imgURL;
                
                temp.store.commit('GetAllPlaces');
                var waitForAllPlaces = setInterval(function() {
                    if(temp.store.state.GetAllPlaces === true){
                        stopWaitForAllPlaces();
                    }
                }, 10);

                function stopWaitForAllPlaces() {
                    clearInterval(waitForAllPlaces);
                    temp.places = temp.store.state.places;
                }
            }

        },
        update(place){
            // console.log(document.getElementById('editName'+place.id.toString()).value);
            // init temp. And use temp istead of this, to avoid error
            let temp: any = this;
            temp.store.state.updateBody = {
                // type cast <HTMLInputElement> to avoid error
                name:(<HTMLInputElement>document.getElementById('editName'+place.id.toString())).value,
                imageURL:(<HTMLInputElement>document.getElementById('editImageName'+place.id.toString())).value 
            }

            // console.log(body);
            
            temp.store.commit('UpdatePlaceById', place.id);
            var waitForUpdatePlaceById = setInterval(function(){
                if(temp.store.state.UpdatePlaceById === true){
                    stopWaitForUpdatePlaceById();
                }
            }, 10);

            function stopWaitForUpdatePlaceById() {
                clearInterval(waitForUpdatePlaceById);

                temp.store.commit('GetAllPlaces');
                var waitForAllPlaces = setInterval(function() {
                    if(temp.store.state.GetAllPlaces === true){
                        stopWaitForAllPlaces();
                    }
                }, 10);

                function stopWaitForAllPlaces() {
                    clearInterval(waitForAllPlaces);
                    temp.places = temp.store.state.places;
                }
            }
        },
        remove(place){
            // console.log(document.getElementById('editName'+place.id.toString()).value);
            // init temp. And use temp istead of this, to avoid error
            let temp: any = this;
            temp.store.commit('DeletePlaceById', place.id);
            var waitForDeletePlaceById = setInterval(function(){
                if(temp.store.state.DeletePlaceById === true){
                    stopWaitForDeletePlaceById();
                }
            }, 10);

            function stopWaitForDeletePlaceById() {
                clearInterval(waitForDeletePlaceById);

                temp.store.commit('GetAllPlaces');
                var waitForAllPlaces = setInterval(function() {
                    if(temp.store.state.GetAllPlaces === true){
                        stopWaitForAllPlaces();
                    }
                }, 10);

                function stopWaitForAllPlaces() {
                    clearInterval(waitForAllPlaces);
                    temp.places = temp.store.state.places;
                }
            }
        },
        add(){
            // init temp. And use temp istead of this, to avoid error
            let temp: any = this;
            temp.store.commit('AddPlace', temp.place);
            var waitForAddPlace = setInterval(function() {
                if(temp.store.state.AddPlace === true){
                    stopWaitForAddPlace();
                }
            }, 10);

            function stopWaitForAddPlace() {
                clearInterval(waitForAddPlace);

                temp.store.commit('GetAllPlaces');
                var waitForAllPlaces = setInterval(function() {
                    if(temp.store.state.GetAllPlaces === true){
                        stopWaitForAllPlaces();
                    }
                }, 10);

                function stopWaitForAllPlaces() {
                    clearInterval(waitForAllPlaces);
                    temp.places = temp.store.state.places;
                    temp.place.name = "";
                    temp.place.latitude = "";
                    temp.place.longitude = "";
                }
            }
        }
    },

    mounted() {
        // init temp. And use temp istead of this, to avoid error
        let temp: any = this;
        temp.store.commit('GetAllPlaces');
        var waitForAllPlaces = setInterval(function() {
            if(temp.store.state.GetAllPlaces === true){
                stopWaitForAllPlaces();
            }
        }, 10);

        function stopWaitForAllPlaces() {
            clearInterval(waitForAllPlaces);
            temp.places = temp.store.state.places;
        }
    },
}
</script>


<style>
    .sidenav{
        height: 70vh;
        overflow-y:scroll;
        overflow-x:hidden;
        width: 275px;
        transition: 1s;
        z-index: 2;
        position: fixed;
        background-color: white;
        box-shadow: 2px 2px 8px #888888;
    }
    .modal-backdrop {
        z-index: 1;
    }
</style>