<template>
    <div>
        <div class="grid">
            <div
                v-for="(item, index) in displayedItems"
                :key="`${item.id}--${index}`"
                :item="item"
            >
                <h3>{{ item.name }}</h3>
                <img :src="item.image" alt="image" width="100">
            </div>
        </div>
        <div>
            <button
                type="button"
                :class="[
                    'button--link button--large',
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

<script setup>
    import { ref, computed } from 'vue';
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