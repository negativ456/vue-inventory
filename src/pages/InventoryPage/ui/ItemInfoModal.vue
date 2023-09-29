<script setup lang="ts">
import type { Item } from '@/entities/Item'
import close from '@/shared/assets/close.svg'
interface ItemInfoProps {
  item: Item
}
defineProps<ItemInfoProps>()
</script>

<template>
  <div class="info-wrapper">
    <div class="info">
      <img @click="$emit('onClose')" :src="close" alt="close" class="close" />
      <img :src="item.image" alt="item" class="item-img" />
      <div class="content">
        <hr class="line" />
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
}
.info {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  border-left: 1px solid var(--Primary-Border);
  background: rgba(38, 38, 38, 0.5);
  backdrop-filter: blur(8px);
  padding: 55px 15px 15px 15px;
}

.close {
  position: absolute;
  top: 8px;
  right: 8px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.line {
  border: 0;
  height: 1px;
  background: var(--Primary-Border);
}

.item-img {
  width: 130px;
  height: 130px;
}
</style>
