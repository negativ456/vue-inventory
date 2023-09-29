import { defineStore } from 'pinia'
import type { InventoryStoreSchema } from '@/pages/InventoryPage/model/types/inventoryStoreSchema'
import itemImg1 from '@/shared/assets/item1.svg'
import itemImg2 from '@/shared/assets/item2.svg'
import itemImg3 from '@/shared/assets/item3.svg'
import type { Item } from '@/entities/Item'
import { ITEMS_KEY } from '@/shared/const/localStorageKeys'
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
        image: itemImg2,
        quantity: 3,
        w: 1,
        h: 1,
        x: 1,
        y: 1
      },
      {
        id: 3,
        image: itemImg3,
        quantity: 3,
        w: 1,
        h: 1,
        x: 3,
        y: 3
      }
    ],
    selectedItem: null
  }),
  actions: {
    setItemCoords({ id, x, y }: { id: number; x: number; y: number }) {
      const item = this.items.find((item) => item.id === id)
      console.log(item)

      if (item) {
        item.x = x
        item.y = y
      }
    },
    setSelectedItem(item: Item | null) {
      this.selectedItem = item
    },
    saveToStorage() {
      localStorage.setItem(ITEMS_KEY, JSON.stringify(this.items))
    },
    getItemsFromStorage() {
      const items = localStorage.getItem(ITEMS_KEY)
      if (items) {
        this.items = JSON.parse(items)
      }
    },
    deleteItem(itemId: number) {
      this.items = this.items.filter((item) => item.id !== itemId)
      this.saveToStorage()
    }
  }
})
