<script setup lang="ts">
defineProps<{
  title: string;
  name: string;
}>();
</script>

<template>
  <div class="product-display">
    <div class="product-container">
      <div class="product-image"></div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <div>{{ name }}</div>
      </div>
    </div>
  </div>
</template>
