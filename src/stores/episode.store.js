import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useEpisodeStore = defineStore('episodes', () => {
    const episodes = ref([])

    function getEpisodes(){
        axios.get(`https://rickandmortyapi.com/api/episode/`)
        .then((response) => {
            episodes.value.push(response.data.results)
        })
    }

    return { getEpisodes, episodes }
})