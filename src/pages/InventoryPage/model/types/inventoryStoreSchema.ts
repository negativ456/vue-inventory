import type { Item } from '@/entities/Item'

export interface InventoryStoreSchema {
  items: Item[]
  selectedItem: Item | null
}
