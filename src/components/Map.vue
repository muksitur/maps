<template>
    <div class="row map">
        <LMap :zoom="zoom" :center="center" style="z-index: 1;">
            <LTileLayer :url="url" :attribution="attribution"></LTileLayer>
            <LMarker :key="index" v-for="(place, index) in places" :lat-lng="latLng(Number(place.latitude), Number(place.longitude))">
                <!-- icon small if not clicked -->
                <l-icon v-if="place.clicked === false" :icon-size="iconSize" :icon-url="icon"></l-icon>
                <!-- icon big if clicked -->
                <l-icon v-else-if="place.clicked === true" :icon-size="iconSizeBig" :icon-url="icon"></l-icon>
            </LMarker>
        </LMap>
    </div>
</template>


<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import markerIcon from '../assets/markerIcon.png'

export default {
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LIcon
    },
    data() {
        return {
            zoom: 4,
            center: L.latLng(50, -50),
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            iconSize: [20,20],
            iconSizeBig: [60,60],
            icon: markerIcon
            // marker: L.
        }
    },
    methods: {
        latLng(lat, lng){
            // console.log(this.places);
            return L.latLng(lat, lng);
        }
    },
    props: {
        places:{
            type: Array
        }
    },
    mounted() {

    },
    
}
</script>


<style>
    .map{
        height: 80vh;
    }
</style>