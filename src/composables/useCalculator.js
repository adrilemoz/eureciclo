/**
 * useCalculator — estado global das quantidades da calculadora.
 * Persistido no localStorage para que HomeView leia a estimativa atual.
 */
import { ref, computed } from 'vue'
import { useMaterials } from './useMaterials'

const CALC_KEY = 'recicla_quantities'

function loadQuantities() {
  try {
    const s = localStorage.getItem(CALC_KEY)
    if (s) return JSON.parse(s)
  } catch (e) {}
  return {}
}

function saveQuantities(q) {
  try {
    localStorage.setItem(CALC_KEY, JSON.stringify(q))
  } catch (e) {}
}

// Estado global (singleton fora do composable)
const quantities = ref(loadQuantities())

export function useCalculator() {
  const { materials, calcValue } = useMaterials()

  function setQty(id, value) {
    quantities.value[id] = +value.toFixed(3)
    saveQuantities(quantities.value)
  }

  function increment(id, step) {
    const cur = quantities.value[id] || 0
    setQty(id, Math.max(0, +(cur + step).toFixed(3)))
  }

  function decrement(id, step) {
    const cur = quantities.value[id] || 0
    setQty(id, Math.max(0, +(cur - step).toFixed(3)))
  }

  function clearAll() {
    quantities.value = {}
    saveQuantities({})
  }

  const totalEstimate = computed(() => {
    let total = 0
    for (const mat of materials.value) {
      const qty = quantities.value[mat.id] || 0
      if (qty > 0) total += calcValue(mat, qty)
    }
    return total
  })

  const totalKg = computed(() => {
    let kg = 0
    for (const mat of materials.value) {
      const qty = quantities.value[mat.id] || 0
      if (qty <= 0) continue
      if (mat.unitType === 'units') kg += qty / (mat.unitsPerKg || 1)
      else kg += qty
    }
    return kg
  })

  const totalItems = computed(() =>
    materials.value.filter(m => (quantities.value[m.id] || 0) > 0).length
  )

  const filledMaterials = computed(() =>
    materials.value
      .filter(m => (quantities.value[m.id] || 0) > 0)
      .map(m => {
        const qty = quantities.value[m.id]
        const kgQty = m.unitType === 'units' ? qty / (m.unitsPerKg || 1) : qty
        return { ...m, qty, kgQty, value: calcValue(m, qty) }
      })
  )

  return {
    quantities,
    totalEstimate,
    totalKg,
    totalItems,
    filledMaterials,
    setQty,
    increment,
    decrement,
    clearAll
  }
}
