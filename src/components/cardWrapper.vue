<template>
    <section class="showcase__Inner">
        <Pagination v-if="characterStore.characters[0]"
        :items = "characterStore.characters[0]"
        :itemsPerPage = "6"
        ></Pagination>

            </section>
</template>

<style scoped>
    .showcase__Inner{
        background-color:rgb(39, 43, 51);
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

    onBeforeMount(() => {
        characterStore.getCharacters()
    })


</script>