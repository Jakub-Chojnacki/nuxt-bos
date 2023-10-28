<template>
    <input class="search" v-model="query" placeholder="Wyszukaj...">
</template>

<script setup lang="ts">
import { ref } from 'vue'

const query = ref('')
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";

.search{
    margin-top: 1em;
    margin-left:1em;
    @include neuBorder();
    border:2px solid black;
    border-radius: 10px;
    padding:0.5em;
   
}

</style>
