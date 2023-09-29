<script setup lang="ts">
import ItemInfoModal from './ItemInfoModal.vue'
import type { Item } from '@/entities/Item'
import { ref } from 'vue'
import { useInventoryStore } from '../model/store/inventoryStore'
interface DeleteItemModalProps {
  item: Item
  onClose: () => void
}
const props = defineProps<DeleteItemModalProps>()
const inventoryStore = useInventoryStore()
const isConfirmation = ref(false)
const onDelete = () => {
  inventoryStore.deleteItem(props.item.id)
  props.onClose()
}
</script>

<template>
  <ItemInfoModal :item="item" @onClose="onClose">
    <div v-if="isConfirmation" class="inputs">
      <div class="buttons">
        <button :class="['action-btn', 'cancel']">Отмена</button>
        <button :class="['action-btn', 'submit']">Подтвердить</button>
      </div>
    </div>
    <button @click="onDelete" class="btn">Удалить предмет</button>
  </ItemInfoModal>
</template>

<style scoped lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border: 0;
  outline: none;
  border-radius: 8px;
  font-size: 14px;
  color: var(--Primary-text);
  background: var(--Primary-Red, #fa7272);
}

.buttons {
  display: flex;
  gap: 10px;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  color: var(--Primary-Black, #2d2d2d);
  font-size: 14px;
  border-radius: 8px;
}

.cancel {
  background: var(--Primary-White, #fff);
}
</style>
