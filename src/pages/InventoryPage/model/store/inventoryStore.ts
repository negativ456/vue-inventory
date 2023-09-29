import { defineStore } from 'pinia'
import type { InventoryStoreSchema } from '@/pages/InventoryPage/model/types/inventoryStoreSchema'
import itemImg1 from '@/shared/assets/item1.svg'
export const useInventoryStore = defineStore('inventory', {
  state: (): InventoryStoreSchema => ({
    items: [
      {
        id: 1,
        image: itemImg1,
        quantity: 3,
        w: 1,
        h: 1,
        x: 0,
        y: 0
      },
      {
        id: 2,
        image: itemImg1,
        quantity: 3,
        w: 1,
        h: 1,
        x: 1,
        y: 1
      }
    ]
  }),
  actions: {
    setItemCoords({ id, x, y }: { id: number; x: number; y: number }) {
      const item = this.items.find((item) => item.id === id)
      console.log(item)

      if (item) {
        item.x = x
        item.y = y
      }
    }
  }
})
