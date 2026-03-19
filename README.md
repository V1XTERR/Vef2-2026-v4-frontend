# Vef2 2026 verkefni 4 frontend

React + Vite framendi fyrir verkefni 3 vefþjónustu.

## Keyrsla

1. Afritaðu `.env.example` í `.env`
2. Settu `VITE_API_URL` á backend slóðina þína, t.d.:

```bash
VITE_API_URL=http://localhost:3000
```

3. Settu upp og keyrðu:

```bash
npm install
npm run dev
```

## Síður

- `/` forsíða með paging
- `#/frett/:slug` fréttasíða
- `#/ny-frett` síða til að búa til frétt með höfundi

HashRouter er notaður svo þetta virki einfaldlega á GitHub Pages.
