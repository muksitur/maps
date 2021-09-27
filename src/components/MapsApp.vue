<template>
    <!-- this row element has three columns -->
    <div class="container-fluid row">
        <!-- this column is for handling the places -->
        <div class="col-sm-3 col-xs-4">
            <!-- this button will pop up a modal for adding a new place -->
            <button class="btn btn-success mb-3" data-toggle="modal" data-target="#addModal">Add Place</button>
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
            <!-- this is the list of all places -->
            <div style="height: 80vh; overflow-y:scroll; overflow-x:hidden;">
                <div class="ml-2 row mb-1" v-for="(place, index) in places" :key="index">
                    <button class="btn col-8 btn-primary mr-1" @click="loadImage(place)">{{place.name}}</button>
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
            
        </div>
        <!-- this column is for the map -->
        <div class="col-sm-7 col-xs-4 p-0">
            <Map :places="places"/>
        </div>
        <!-- this column is for image of each place -->
        <div class="col-sm-2 col-xs-4">
            <img id="placeImage" src="">
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import Map from './Map.vue'

export default {
    components:{
        Map
    },
    data() {
        return {
            places:[],
            place:{
                name:"",
                latitude:"",
                longitude:""
            }
        }
    },

    methods: {
        loadImage(place){
            axios.get('http://localhost:3000/images/'+place.imageURL).then((response) => {
                document.getElementById('placeImage').src = "http://localhost:8080/images/"+response.data.imageURL+".jpg";
                axios.get('http://localhost:3000/maps').then((res) => {
                    this.places = res.data;
                });
            });
        },
        update(place){
            // console.log(document.getElementById('editName'+place.id.toString()).value);
            axios.put('http://localhost:3000/maps/'+place.id,
            {
                name:document.getElementById('editName'+place.id.toString()).value,
                imageURL:document.getElementById('editImageName'+place.id.toString()).value
            }).then((response) => {
                console.log(response.data);
                axios.get('http://localhost:3000/maps').then((res) => {
                    this.places = res.data;
                });
            });
        },
        remove(place){
            // console.log(document.getElementById('editName'+place.id.toString()).value);
            axios.delete('http://localhost:3000/maps/'+place.id).then((response) => {
                console.log(response.data);
                axios.get('http://localhost:3000/maps').then((res) => {
                    this.places = res.data;
                });
            });
        },
        add(){
            axios.post('http://localhost:3000/maps', this.place).then((response) =>{
                console.log(response.data);
                axios.get('http://localhost:3000/maps').then((res) => {
                    this.places = res.data;
                    this.place.name = "";
                    this.place.latitude = "";
                    this.place.longitude = "";
                });
            });
        }
    },

    mounted() {
        axios.get('http://localhost:3000/maps').then((response) => {
            // console.log(response.data);
            this.places = response.data;
        });
    },
}
</script>


<style>
    
</style>