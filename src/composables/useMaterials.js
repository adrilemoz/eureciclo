import { ref, computed } from 'vue'

const STORAGE_KEY = 'recicla_materials'

const defaultMaterials = [
  {
    id: 1,
    name: 'Alumínio / Latas',
    category: 'aluminio',
    pricePerKg: 6.00,
    unitType: 'units',
    unitsPerKg: 70,
    icon: '🥫',
    accentColor: '#9ca3af',
    description: '70 latas = 1 kg'
  },
  {
    id: 2,
    name: 'PET',
    category: 'pet',
    pricePerKg: 2.50,
    unitType: 'units',
    unitsPerKg: 25,
    icon: '🧴',
    accentColor: '#60a5fa',
    description: '25 garrafas = 1 kg'
  },
  {
    id: 3,
    name: 'Cobre',
    category: 'cobre',
    pricePerKg: 30.00,
    unitType: 'weight',
    unitsPerKg: null,
    icon: '⚡',
    accentColor: '#f59e0b',
    description: 'Fios, tubos e conexões'
  },
  {
    id: 4,
    name: 'Latão',
    category: 'cobre',
    pricePerKg: 18.00,
    unitType: 'weight',
    unitsPerKg: null,
    icon: '🔧',
    accentColor: '#d97706',
    description: 'Registro, torneiras'
  },
  {
    id: 5,
    name: 'Papel / Papelão',
    category: 'outros',
    pricePerKg: 0.50,
    unitType: 'weight',
    unitsPerKg: null,
    icon: '📦',
    accentColor: '#fcd34d',
    description: 'Caixas e papéis'
  },
  {
    id: 6,
    name: 'Vidro',
    category: 'outros',
    pricePerKg: 0.20,
    unitType: 'weight',
    unitsPerKg: null,
    icon: '🫙',
    accentColor: '#5eead4',
    description: 'Garrafas e potes'
  },
  {
    id: 7,
    name: 'Ferro / Aço',
    category: 'outros',
    pricePerKg: 1.20,
    unitType: 'weight',
    unitsPerKg: null,
    icon: '🔩',
    accentColor: '#94a3b8',
    description: 'Sucata ferrosa'
  },
  {
    id: 8,
    name: 'Plástico Misto',
    category: 'outros',
    pricePerKg: 0.80,
    unitType: 'weight',
    unitsPerKg: null,
    icon: '♻️',
    accentColor: '#86efac',
    description: 'HDPE, PP e outros'
  }
]

function loadMaterials() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) {}
  return defaultMaterials.map(m => ({ ...m }))
}

function saveMaterials(materials) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(materials))
  } catch (e) {}
}

const materials = ref(loadMaterials())

export function useMaterials() {
  const byCategory = computed(() => {
    const groups = { aluminio: [], pet: [], cobre: [], outros: [] }
    for (const m of materials.value) {
      if (groups[m.category]) groups[m.category].push(m)
      else groups.outros.push(m)
    }
    return groups
  })

  function getMaterial(id) {
    return materials.value.find(m => m.id === Number(id))
  }

  function addMaterial(data) {
    const newId = Math.max(0, ...materials.value.map(m => m.id)) + 1
    const mat = {
      id: newId,
      name: data.name,
      category: data.category,
      pricePerKg: Number(data.pricePerKg),
      unitType: data.unitType,
      unitsPerKg: data.unitType === 'units' ? Number(data.unitsPerKg) : null,
      icon: data.icon || '♻️',
      accentColor: data.accentColor || '#4ade80',
      description: data.description || ''
    }
    materials.value.push(mat)
    saveMaterials(materials.value)
    return mat
  }

  function updateMaterial(id, data) {
    const idx = materials.value.findIndex(m => m.id === Number(id))
    if (idx === -1) return false
    materials.value[idx] = {
      ...materials.value[idx],
      name: data.name,
      category: data.category,
      pricePerKg: Number(data.pricePerKg),
      unitType: data.unitType,
      unitsPerKg: data.unitType === 'units' ? Number(data.unitsPerKg) : null,
      icon: data.icon || materials.value[idx].icon,
      accentColor: data.accentColor || materials.value[idx].accentColor,
      description: data.description || ''
    }
    saveMaterials(materials.value)
    return true
  }

  function deleteMaterial(id) {
    const idx = materials.value.findIndex(m => m.id === Number(id))
    if (idx === -1) return false
    materials.value.splice(idx, 1)
    saveMaterials(materials.value)
    return true
  }

  // Price per unit (for materials measured in units)
  function getPricePerUnit(material) {
    if (material.unitType !== 'units' || !material.unitsPerKg) return null
    return material.pricePerKg / material.unitsPerKg
  }

  // Calculate total value
  function calcValue(material, quantity) {
    if (!quantity || isNaN(quantity) || quantity <= 0) return 0
    if (material.unitType === 'units') {
      const kg = quantity / (material.unitsPerKg || 1)
      return kg * material.pricePerKg
    }
    return quantity * material.pricePerKg
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  function formatNumber(value, decimals = 3) {
    return Number(value).toFixed(decimals)
  }

  const categories = [
    { key: 'aluminio', label: 'Alumínio', icon: '🥫', shortLabel: 'Alumínio' },
    { key: 'pet',      label: 'PET',      icon: '🧴', shortLabel: 'PET'      },
    { key: 'cobre',    label: 'Cobre',    icon: '⚡', shortLabel: 'Cobre'    },
    { key: 'outros',   label: 'Outros',   icon: '♻️', shortLabel: 'Outros'   }
  ]

  const categoryIcons = {
    aluminio: '🥫',
    pet: '🧴',
    cobre: '⚡',
    outros: '♻️'
  }

  const categoryColors = {
    aluminio: { bg: 'rgba(156,163,175,0.15)', border: 'rgba(156,163,175,0.3)', text: '#d1d5db' },
    pet:      { bg: 'rgba(96,165,250,0.15)',  border: 'rgba(96,165,250,0.3)',  text: '#93c5fd' },
    cobre:    { bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.3)',  text: '#fcd34d' },
    outros:   { bg: 'rgba(74,222,128,0.15)',  border: 'rgba(74,222,128,0.3)', text: '#86efac' }
  }

  return {
    materials,
    byCategory,
    categories,
    categoryIcons,
    categoryColors,
    getMaterial,
    addMaterial,
    updateMaterial,
    deleteMaterial,
    getPricePerUnit,
    calcValue,
    formatCurrency,
    formatNumber
  }
}
