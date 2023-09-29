<script setup lang="ts">
import type { Item } from '../types/item'
import { ref } from 'vue'

interface ItemProps {
  item: Item
}
defineProps<ItemProps>()
</script>

<template>
  <div class="item">
    <img class="image" :src="item.image" alt="image" />
    <div class="quantity">
      <p>{{ item.quantity }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 105px;
  position: relative;
  user-select: none;
}

.quantity {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px 0 0 0;
  border: 1px solid var(--Primary-Border, #4d4d4d);
  background: var(--Secondary-BG, #262626);

  p {
    font-size: 10px;
    font-weight: 500;
    opacity: 0.4;
  }
}

.image {
  pointer-events: none;
}
</style>
