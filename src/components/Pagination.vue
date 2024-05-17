<template>
    <div class="showcase__Wrapper">

        <section class="showcase__filter-wrapper">
            <switcher :modelValue="switcherToggle"
                    @update:SwitcherModelValue="switcherToggle = !switcherToggle"
                         />
        </section>

        <div class="showcase__InnerWrapper ">
            <div class="characterCard__Wrapper card-hoverEffect"
                v-for="(item, index) in displayedItems"
                :key="`${item.id}--${index}`"
                :item="item"
            >

            <div class="characterCard__img-Wrapper">
                <img :src="item.image" alt="image" width="160">
            </div>

            <div class="characterCard__information-Wrapper">
                <h3 class="characterName">{{ item.name }}</h3>
                <div class="characterCard__indicator-Wrapper">
                    <span class="indicator" :class="item.status === 'Alive' ? 'green' : ''"></span>
                    <h3>{{ item.status }} - {{ item.species }}</h3>
                </div>
                <p class="characterCard__label-for-information">Last known location:</p>
                <h4>{{ item.location.name }}</h4>
                <p class="characterCard__label-for-information">First seen in:</p>
                <h4>{{ getEpisode(item) || 'not specified' }}</h4>
            </div>
            </div>
        </div>

        <div class="showcase__footer-buttons-Wrapper">
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
        margin: 4rem;
        display: flex;
        max-height: 650px;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }


    .characterCard__Wrapper{
        width: 600px;
        border-radius: 20px;
        display: flex;
        gap: 1rem;
        background-color: rgb(60, 62, 68);
        max-width: 540px;
    }
    
    .characterName{
        font-weight: 900;
        font-size: 1.6rem;
    }

    .characterCard__img-Wrapper{
        overflow: hidden;
        border-radius: 20px;
    }

    .characterCard__information-Wrapper{
        margin: .4rem;
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
        border-radius: 50%;
    }
    .green{
        background-color: green;
    }

    .characterCard__label-for-information{
        color: rgb(158, 158, 158);
        margin: .4rem 0 0;
    }

    .showcase__footer-buttons-Wrapper{
        display: flex;
        justify-content: center;
        gap: 2rem;
    }

    .showcase__footer-buttons-Wrapper button{
        height: 40px;
        width: 40px;
        margin-bottom: 1rem;
        border-radius: 50%;
    }

    .showcase__filter-wrapper{
        margin: 1rem 2rem 0;
    }

</style>

<script setup>
    import { ref, computed, onBeforeMount } from 'vue';
    import { useEpisodeStore } from '@/stores/episode.store';
    import switcher from '@/assets/UI/switcher.vue';

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
                required: true,
            },
            itemsPerPage: {
                type: Number,
                default: 10
            }
    })
    

    const filterByAlive = props.items.filter(item => item.status.includes('Alive'))

    const currentPage = ref(1);

    const pageCount = computed(() =>{
        if(switcherToggle.value === false){
            return Math.ceil(props.items.length / props.itemsPerPage)
        }else {
            return Math.ceil(filterByAlive.length / props.itemsPerPage)
        }
    })

    const pages = computed(() => {
     	return Array.from({ length: pageCount.value }, (_, i) => i + 1)
    })

    const displayedItems = computed(() => {
        const startIndex = (currentPage.value - 1) * props.itemsPerPage
        const endIndex = startIndex + props.itemsPerPage
            
        if(switcherToggle.value === false){
            return props.items.slice(startIndex, endIndex)
        }else return filterByAlive.slice(startIndex, endIndex)
            
     })

    function changePage(pageNumber) {
        currentPage.value = pageNumber
    }

    
    const switcherToggle = ref(false)
    const switcherNameToggle = ref(false)

</script>