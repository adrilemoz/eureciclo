import { ref } from 'vue'

const STORAGE_KEY = 'eureciclo_sales'

function loadSales() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {}
  return []
}

function persistSales(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {}
}

const sales = ref(loadSales())

export function useSales() {
  function addSale({ items, total, totalKg }) {
    const newSale = {
      id: Date.now(),
      date: new Date().toISOString(),
      items,   // [{ materialId, name, icon, qty, unit, unitType, value }]
      total,
      totalKg
    }
    sales.value.unshift(newSale)
    persistSales(sales.value)
    return newSale
  }

  function deleteSale(id) {
    const idx = sales.value.findIndex(s => s.id === id)
    if (idx === -1) return false
    sales.value.splice(idx, 1)
    persistSales(sales.value)
    return true
  }

  function clearAllSales() {
    sales.value = []
    persistSales(sales.value)
  }

  return { sales, addSale, deleteSale, clearAllSales }
}
