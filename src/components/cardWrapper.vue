<template>
    <section class="showcase__Inner">
        <Pagination v-if="characterStore.characters[0]"
        :items = "characterStore.characters[0]"
        :itemsPerPage = "6"
        @update:SortByName="filterByName"
        ></Pagination>
            </section>
        

</template>

<style scoped>
    .showcase__Inner{
        background-color:rgb(32, 35, 41);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 1rem;
        max-height: 800px;
    }
</style>

<script setup>
    import Pagination from './Pagination.vue';
    import { useCharactersStore } from '@/stores/character.store';
    import { onBeforeMount } from 'vue';

    const characterStore = useCharactersStore()


    const filterByName = () =>{
        characterStore.characters = characterStore.characters[0].sort((a,b) =>{
                if(a.name < b.name) return -1
                if(a.name > b.name) return 1
            return 0
        })
    }

    onBeforeMount(() => {
        characterStore.getCharacters()
    })

</script>