import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useCharactersStore = defineStore('characters', () => {
    const characters = ref([])

    function getCharacters(){
        axios.get(`https://rickandmortyapi.com/api/character/`)
        .then((response) => {
            characters.value.push(response.data.results)
        })
    }

    return { getCharacters, characters }
})