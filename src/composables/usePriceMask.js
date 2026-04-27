/**
 * usePriceMask — máscara monetária brasileira para inputs de preço.
 * 
 * Estratégia: armazena centavos como inteiro, exibe "R$ 0,00".
 * Ao digitar "3", vira "R$ 0,03"; "300" vira "R$ 3,00".
 */

/**
 * Formata centavos (inteiro) para string de exibição "0,00"
 */
export function centsToDisplay(cents) {
  const abs = Math.abs(Math.round(cents))
  const str = String(abs).padStart(3, '0')
  const integer = str.slice(0, -2) || '0'
  const decimal = str.slice(-2)
  // Add thousand separators to integer part
  const intFormatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${intFormatted},${decimal}`
}

/**
 * Converte string de exibição "1.234,56" → número 1234.56
 */
export function displayToNumber(display) {
  // Remove tudo exceto dígitos e vírgula
  const clean = display.replace(/\./g, '').replace(',', '.')
  return parseFloat(clean) || 0
}

/**
 * Handler de input para máscara de preço.
 * 
 * @param {Event} event  — evento input nativo
 * @param {Ref<string>} displayRef — ref da string exibida no input
 * @param {Ref<number>} valueRef   — ref do valor numérico real
 */
export function handlePriceInput(event, displayRef, valueRef) {
  // Pega só os dígitos
  const digits = event.target.value.replace(/\D/g, '')
  const cents = parseInt(digits || '0', 10)
  displayRef.value = centsToDisplay(cents)
  valueRef.value = cents / 100
  // Força cursor ao final
  const el = event.target
  requestAnimationFrame(() => {
    el.setSelectionRange(el.value.length, el.value.length)
  })
}

/**
 * Inicializa a display a partir de um valor numérico
 */
export function numberToDisplay(value) {
  if (!value && value !== 0) return ''
  const cents = Math.round(value * 100)
  return centsToDisplay(cents)
}
