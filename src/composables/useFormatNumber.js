/**
 * useFormatNumber — formatação de números com separador de milhar (padrão pt-BR)
 *
 * Separador de milhar: ponto (.)
 * Separador decimal:   vírgula (,)
 *
 * Exemplos:
 *   formatThousands('22222')    → '22.222'
 *   formatThousands('1234567')  → '1.234.567'
 *   formatThousands('1234,5')   → '1.234,5'
 *   parseThousands('1.234,567') → 1234.567
 */
export function useFormatNumber() {
  /**
   * Formata uma string digitada pelo usuário com separador de milhar.
   * Aceita dígitos, vírgula decimal e ponto (ignorado ao redigitar).
   */
  function formatThousands(raw) {
    // Mantém apenas dígitos e vírgula
    let clean = raw.replace(/[^\d,]/g, '')
    if (!clean) return ''

    const commaIdx = clean.indexOf(',')
    if (commaIdx !== -1) {
      // Parte inteira (antes da vírgula)
      const intPart = clean.slice(0, commaIdx)
      // Parte decimal (até 3 dígitos)
      const decPart = clean.slice(commaIdx + 1).replace(/\D/g, '').slice(0, 3)
      const formattedInt = intPart
        ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        : '0'
      return `${formattedInt},${decPart}`
    }

    return clean.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  /**
   * Converte string formatada de volta para número.
   * '1.234,567' → 1234.567
   */
  function parseThousands(formatted) {
    if (!formatted) return 0
    const normalized = formatted.replace(/\./g, '').replace(',', '.')
    const n = parseFloat(normalized)
    return isNaN(n) ? 0 : n
  }

  return { formatThousands, parseThousands }
}
