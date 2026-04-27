<template>
  <div class="min-h-screen pt-safe">

    <!-- Header -->
    <header class="px-5 pt-4 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl glow-green"
             style="background: linear-gradient(135deg, #16a34a, #15803d);">
          🌿
        </div>
        <div>
          <h1 class="font-syne font-extrabold text-xl text-gradient">Eu Reciclo</h1>
          <p class="font-dm text-xs text-slate-400 mt-0.5">v{{ version }} · Calculadora de Reciclagem</p>
        </div>
      </div>
    </header>

    <div class="px-5 flex flex-col gap-4 pb-8">

      <!-- Sobre o App -->
      <section class="glass-card rounded-3xl p-5">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg">📱</span>
          <h2 class="font-syne font-bold text-sm text-slate-600 uppercase tracking-wide">Sobre o App</h2>
        </div>
        <p class="font-dm text-sm text-slate-500 leading-relaxed">
          O <strong class="text-eco-700">Eu Reciclo</strong> é uma calculadora de reciclagem pensada para catadores,
          cooperativas e qualquer pessoa que deseja saber o valor estimado dos seus materiais recicláveis de forma
          rápida e prática — mesmo sem internet.
        </p>
        <div class="mt-4 grid grid-cols-2 gap-2">
          <div v-for="feat in features" :key="feat.label"
               class="rounded-2xl px-3 py-2.5 flex items-center gap-2"
               style="background: #f0fdf4; border: 1px solid #d1fae5;">
            <span class="text-base">{{ feat.icon }}</span>
            <span class="font-dm text-xs text-slate-600 font-semibold">{{ feat.label }}</span>
          </div>
        </div>
      </section>

      <!-- Histórico de Mudanças -->
      <section class="glass-card rounded-3xl p-5">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg">📋</span>
          <h2 class="font-syne font-bold text-sm text-slate-600 uppercase tracking-wide">Histórico de Mudanças</h2>
        </div>
        <div class="flex flex-col gap-4">
          <div v-for="entry in changelog" :key="entry.version">
            <div class="flex items-center gap-2 mb-2">
              <span class="pill text-white" style="background: #16a34a;">v{{ entry.version }}</span>
              <span class="font-dm text-xs text-slate-400">{{ entry.date }}</span>
            </div>
            <ul class="flex flex-col gap-1">
              <li v-for="change in entry.changes" :key="change"
                  class="font-dm text-xs text-slate-500 leading-relaxed flex items-start gap-2">
                <span class="text-eco-500 mt-0.5 shrink-0">•</span>
                <span>{{ change }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Doações -->
      <section class="rounded-3xl p-5 overflow-hidden relative"
               style="background: linear-gradient(135deg, #16a34a, #15803d);">
        <!-- Decoration -->
        <div class="absolute -top-10 -right-10 w-32 h-32 rounded-full"
             style="background: rgba(255,255,255,0.07);"></div>
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xl">❤️</span>
            <h2 class="font-syne font-bold text-sm text-white/80 uppercase tracking-wide">Apoie o projeto</h2>
          </div>
          <p class="font-dm text-xs text-white/70 leading-relaxed mb-4">
            Este app é gratuito e de código aberto. Se ele te ajuda a ganhar mais com a reciclagem,
            considere apoiar o desenvolvimento!
          </p>
          <!-- PIX -->
          <div class="rounded-2xl px-4 py-3 mb-3"
               style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2);">
            <p class="text-white/60 text-xs font-dm font-semibold uppercase tracking-wider mb-1">PIX</p>
            <div class="flex items-center justify-between gap-2">
              <p class="font-syne font-bold text-sm text-white truncate">{{ pixKey }}</p>
              <button @click="copyPix"
                      class="shrink-0 px-3 py-1.5 rounded-xl font-dm font-bold text-xs text-eco-800 transition-all active:scale-95"
                      style="background: rgba(255,255,255,0.9);">
                {{ copiedPix ? '✅ Copiado' : 'Copiar' }}
              </button>
            </div>
          </div>
          <p class="text-white/40 text-xs font-dm text-center">Qualquer valor é muito bem-vindo 🙏</p>
        </div>
      </section>

      <!-- Contato -->
      <section class="glass-card rounded-3xl p-5">
        <div class="flex items-center gap-2 mb-3">
          <span class="text-lg">💬</span>
          <h2 class="font-syne font-bold text-sm text-slate-600 uppercase tracking-wide">Contato</h2>
        </div>
        <div class="flex flex-col gap-2">
          <a v-for="link in contactLinks" :key="link.label"
             :href="link.href"
             target="_blank"
             rel="noopener noreferrer"
             class="flex items-center gap-3 rounded-2xl px-4 py-3 transition-all active:scale-95"
             style="background: #f8fafc; border: 1px solid #e2e8f0;">
            <span class="text-xl shrink-0">{{ link.icon }}</span>
            <div class="flex-1 min-w-0">
              <p class="font-dm font-semibold text-sm text-slate-700">{{ link.label }}</p>
              <p class="font-dm text-xs text-slate-400 truncate">{{ link.sublabel }}</p>
            </div>
            <svg class="w-4 h-4 text-slate-300 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </section>

      <!-- Footer -->
      <p class="font-dm text-xs text-slate-300 text-center pb-2">
        Feito com 💚 para a comunidade recicladora
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const version = '1.1.0'
const pixKey  = 'seupix@email.com.br'

const copiedPix = ref(false)
function copyPix() {
  navigator.clipboard?.writeText(pixKey).catch(() => {})
  copiedPix.value = true
  setTimeout(() => { copiedPix.value = false }, 2500)
}

const features = [
  { icon: '📴', label: 'Offline' },
  { icon: '⚡',  label: 'Rápido' },
  { icon: '🆓', label: 'Gratuito' },
  { icon: '🔒', label: 'Privado' },
]

const changelog = [
  {
    version: '1.1.0',
    date: 'Abr 2026',
    changes: [
      'Renomeado para Eu Reciclo',
      'Formatação automática com separador de milhar nos inputs',
      'Nova aba Vendas para salvar e gerenciar cálculos',
      'Botão Salvar Venda na barra de total',
      'Página Sobre com histórico, doações e contato',
      'Correção de overflow no card Estimativa atual',
      'Refatoração em composables separados (useSales, useFormatNumber)',
      'Corrigido aviso de performance do postcss.config.js'
    ]
  },
  {
    version: '1.0.0',
    date: 'Mar 2026',
    changes: [
      'Lançamento inicial do ReciclaCalc',
      'Calculadora por categoria de material',
      'Cadastro de materiais personalizados',
      'Estimativa de valor total em tempo real',
      'Suporte a Capacitor (Android)'
    ]
  }
]

const contactLinks = [
  {
    icon: '📧',
    label: 'E-mail',
    sublabel: 'contato@eureciclo.app',
    href: 'mailto:contato@eureciclo.app'
  },
  {
    icon: '💻',
    label: 'GitHub',
    sublabel: 'github.com/eureciclo',
    href: 'https://github.com/eureciclo'
  },
  {
    icon: '📸',
    label: 'Instagram',
    sublabel: '@eurecicloapp',
    href: 'https://instagram.com/eurecicloapp'
  }
]
</script>
