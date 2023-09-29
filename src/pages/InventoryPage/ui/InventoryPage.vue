<script setup lang="ts">
import { useInventoryStore } from '../model/store/inventoryStore'
import ItemComponent from '@/entities/Item/ui/ItemComponent.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import type { Item } from '@/entities/Item'

const inventoryStore = useInventoryStore()
const cellSize = 105
const horizontalSlots = 5
const verticalSlots = 5
const containerRef = ref<HTMLDivElement | null>(null)
const held = ref()

const containerRect = computed(() => {
  return containerRef.value?.getBoundingClientRect()
})

const onMouseDown = (e: MouseEvent, item: Item) => {
  held.value = {
    item,
    ref: item.ref,
    offset: {
      x: e.offsetX,
      y: e.offsetY
    },
    x: item.x * cellSize,
    y: item.y * cellSize,
    lastX: item.x * cellSize,
    lastY: item.y * cellSize
  }
  // held.value.lastX = held.value.x
  // held.value.lastY = held.value.y
  console.log(e.offsetX)
  if (containerRect.value) {
    held.value.ref.style.left = e.clientX - containerRect.value.x - e.offsetX + 'px'
    held.value.ref.style.top = e.clientY - containerRect.value.y - e.offsetY + 'px'
  }
}
const onMouseMove = (e: MouseEvent) => {
  if (held.value && containerRect.value) {
    held.value.ref.style.left = e.clientX - containerRect.value.x - held.value.offset.x + 'px'
    held.value.ref.style.top = e.clientY - containerRect.value.y - held.value.offset.y + 'px'
  }
}

const init = () => {
  inventoryStore.items.forEach((item) => {
    if (item.ref) {
      item.ref.style.left = item.x * cellSize + 'px'
      item.ref.style.top = item.y * cellSize + 'px'
    }
  })
}

const outOfBounds = (item: Item) => {
  if (item.x < 0) return true
  if (item.y < 0) return true
  if (item.x + item.w > horizontalSlots) return true
  if (item.y + item.h > verticalSlots) return true
}

const collision = (item: Item, otherItem: Item) => {
  const collisionParameters = [
    item.id !== otherItem.id,
    item.x + item.w > otherItem.x,
    item.y + item.h > otherItem.y,
    item.x < otherItem.x + otherItem.w,
    item.y < otherItem.y + otherItem.h
  ]
  return collisionParameters.every((u) => u)
}

const collisions = (otherItem: Item) => {
  const collisions = []
  for (const item of inventoryStore.items) {
    collision(item, otherItem) && collisions.push(item)
  }
  return collisions
}

const drop = () => {
  if (!held.value) return
  held.value.ref.style.left = held.value.item.x * cellSize + 'px'
  held.value.ref.style.top = held.value.item.y * cellSize + 'px'
  held.value = null
}
const onMouseUp = (e: MouseEvent) => {
  if (held.value && containerRect.value) {
    held.value.x = e.clientX - containerRect.value.x - held.value.offset.x
    held.value.y = e.clientY - containerRect.value.y - held.value.offset.y

    const xover = held.value.x % cellSize
    const yover = held.value.y % cellSize
    let x = held.value.x + (xover < cellSize / 2 ? -xover : cellSize - xover)
    let y = held.value.y + (yover < cellSize / 2 ? -yover : cellSize - yover)
    x = x / cellSize
    y = y / cellSize
    held.value.lastX = x
    held.value.lastY = y
    const oldX = held.value.item.x
    const oldY = held.value.item.y
    inventoryStore.setItemCoords({ id: held.value.item.id, x, y })
    const bounds = outOfBounds(held.value.item)
    const collision = collisions(held.value.item)
    if (bounds || collision.length) {
      held.value.item.x = oldX
      held.value.item.y = oldY
    }

    drop()
  }
}
onMounted(() => {
  init()
  document.addEventListener('mousemove', onMouseMove)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', onMouseMove)
})
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <div ref="containerRef" class="inventory">
        <div v-for="n in horizontalSlots" :key="n" class="row">
          <div v-for="j in verticalSlots" :key="j" class="cell"></div>
        </div>
        <div class="item_list">
          <div
            v-for="(item, index) in inventoryStore.items"
            :ref="(el) => (el ? (item.ref = el as HTMLDivElement) : null)"
            @mousedown="onMouseDown($event, item)"
            @mouseup="onMouseUp"
            :key="item.id"
            class="item_wrapper"
          >
            <ItemComponent :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #1d1d1d;
}

.inventory {
  position: relative;
  border-radius: 12px;
  border: 1px solid var(--Primary-Border);
  background: var(--Secondary-BG);
}

.row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--Primary-Border);
  &:last-child {
    border-bottom: 0;
  }
}

.cell {
  width: 105px;
  height: 105px;
  border-left: 1px solid var(--Primary-Border);
  &:first-child {
    border-left: 0;
  }
}

.item_wrapper {
  position: absolute;
}

.item_list {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
