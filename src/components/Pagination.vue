<template>
    <div class="showcase__Wrapper">

        <div class="showcase__InnerWrapper">
            <div class="characterCard__Wrapper"
                v-for="(item, index) in displayedItems"
                :key="`${item.id}--${index}`"
                :item="item"
            >

            <div class="characterCard__img-Wrapper">
                <img :src="item.image" alt="image" width="100">
            </div>

            <div class="characterCard__information-Wrapper">
                <h3 class="characterName">{{ item.name }}</h3>
                <div class="characterCard__indicator-Wrapper">
                    <div class="indicator" :class="item.status === 'Alive' ? 'green' : ''"></div>
                    {{ item.status }} - {{ item.species }}
                </div>
                <p class="characterCard__label-for-information">Last known location:</p>
                <h4>{{ item.location.name }}</h4>
                <p class="characterCard__label-for-information">First seen in:</p>
                <h4>{{ getEpisode(item) }}</h4>
            </div>
            </div>
        </div>

        <div>
            <button
                type="button"
                :class="[
                    { isActive: page === currentPage }
                ]"
                v-for="page in pages"
                :key="page"
                @click="changePage(page)"
            >
                {{ page }}
            </button>
        </div>
    </div>
</template>

<style scoped>
    .showcase__Wrapper{
        color: #f3f3f3;
    }

    .showcase__InnerWrapper{
        display: flex;
        max-height: 600px;
        flex-direction: column;
        flex-wrap: wrap;
    }

    .characterName{
        font-weight: 900;
        font-size: 1.4rem;
    }

    .characterCard__Wrapper{
        display: flex;
    }

    .characterCard__indicator-Wrapper{
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .indicator{
        width: 8px;
        height: 8px;
        background-color: red;
        margin-left: 1rem;
        border-radius: 50%;
    }
    .green{
        background-color: green;
    }

    .characterCard__label-for-information{
        color: rgb(158, 158, 158);
    }

</style>

<script setup>
    import { ref, computed, onBeforeMount } from 'vue';
    import { useEpisodeStore } from '@/stores/episode.store';

    const episodes = useEpisodeStore()
    onBeforeMount(() =>  episodes.getEpisodes())

    function getEpisode(item){
        const findEp = ref()
        episodes.episodes.find(ep => {
            for (let i = 0; i < episodes.episodes[0].length; i++) {
                if(ep[i].url === item.episode[0]){
                    return findEp.value = ep[i].name
                }
            }
        })

        return findEp.value
    }

    const props = defineProps({
            items: {
                type: Array,
                required: true
            },
            itemsPerPage: {
                type: Number,
                default: 10
            }
    })
        const currentPage = ref(1);

        const pageCount = computed(() =>
            Math.ceil(props.items.length / props.itemsPerPage)
        )

        const pages = computed(() => {
     		return Array.from({ length: pageCount.value }, (_, i) => i + 1);
        })

        const displayedItems = computed(() => {
            const startIndex = (currentPage.value - 1) * props.itemsPerPage;
            const endIndex = startIndex + props.itemsPerPage;

            return props.items.slice(startIndex, endIndex);
        })

        function changePage(pageNumber) {
            currentPage.value = pageNumber;
        }

</script>