# ReciclaCalc 🌿

Aplicativo de cálculo de valor de itens recicláveis — construído com **Vue 3 + Vite + Tailwind CSS + Capacitor**.

---

## Stack Tecnológica

| Camada     | Tecnologia                     |
|------------|-------------------------------|
| Framework  | Vue 3 (Composition API)        |
| Build      | Vite 5                         |
| Estilo     | Tailwind CSS 3                 |
| Persistência | localStorage (via composable) |
| Mobile     | Capacitor 6 (Android)          |
| Fontes     | Syne + DM Sans (Google Fonts)  |

---

## Funcionalidades

- **Calculadora de reciclagem** com categorias: Alumínio, PET, Cobre, Outros
- **Lógica de conversão**: 70 latas = 1 kg · 25 garrafas PET = 1 kg
- **Preço por unidade** calculado automaticamente
- **Somador automático** — total em tempo real enquanto digita
- **Gerenciamento de materiais**: adicionar, visualizar, editar e excluir
- **Busca e filtro** por categoria
- **Persistência local** — dados salvos no dispositivo
- **Design responsivo** — 100% otimizado para celular

---

## Instalação e Desenvolvimento

### 1. Pré-requisitos

- Node.js >= 18
- npm >= 9
- Android Studio (para build Android)
- Java JDK 17+

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar em modo desenvolvimento (web)

```bash
npm run dev
```

Acesse: `http://localhost:5173`

---

## Build para Android (Capacitor)

### 1. Gerar build de produção

```bash
npm run build
```

### 2. Adicionar plataforma Android (somente na primeira vez)

```bash
npm run cap:add:android
# ou: npx cap add android
```

### 3. Sincronizar arquivos com o Android

```bash
npm run cap:sync
# ou: npx cap sync
```

### 4. Abrir no Android Studio

```bash
npm run cap:open
# ou: npx cap open android
```

No Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**

---

## Lógica de Cálculo

### Alumínio / Latas
- **70 unidades = 1 kg**
- Preço padrão: R$ 6,00/kg
- Preço por unidade: R$ 0,086/un

### PET (garrafas)
- **25 unidades = 1 kg**
- Preço padrão: R$ 2,50/kg
- Preço por unidade: R$ 0,10/un

### Cobre
- Medido diretamente em kg
- Preço padrão: R$ 30,00/kg

### Outros (Papel, Vidro, Ferro, Plástico)
- Medidos em kg
- Preços variáveis por material

---

## Estrutura do Projeto

```
recicla-calc/
├── src/
│   ├── assets/main.css          # Estilos globais + Tailwind
│   ├── composables/
│   │   └── useMaterials.js      # Estado global + CRUD + cálculos
│   ├── router/index.js          # Rotas da aplicação
│   ├── views/
│   │   ├── HomeView.vue         # Dashboard inicial
│   │   ├── CalculatorView.vue   # Calculadora com abas
│   │   ├── MaterialsView.vue    # Lista de materiais
│   │   └── AddEditMaterialView.vue  # Formulário add/edit
│   ├── components/
│   │   └── BottomNav.vue        # Navegação inferior
│   ├── App.vue                  # Root + transições de página
│   └── main.js                  # Entry point
├── capacitor.config.json        # Config do Capacitor
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Customização de Materiais

Você pode adicionar novos materiais pelo app (aba **Materiais → +**) ou editar os preços padrão dos existentes. Todos os dados são salvos localmente no dispositivo via `localStorage`.

---

## Paleta de Cores

| Uso                | Cor           | Hex       |
|--------------------|---------------|-----------|
| Background         | Verde escuro  | `#0d1f0e` |
| Accent primário    | Verde neon    | `#4ade80` |
| Valores (R$)       | Âmbar         | `#fbbf24` |
| Cards              | Glassmorphism | `rgba(18,33,20,0.7)` |
