# Lumina Studio

Sitio web de fotografía desarrollado con React, JavaScript y Vite.

## Estructura del proyecto

```text
src/
  App.jsx                  Enrutamiento y composición de páginas
  main.jsx                 Punto de entrada de React
  pages/                   Páginas de inicio, galería y consulta de paquete
  components/layout/       Encabezado y pie de página compartidos
  data/                    Catálogo estático de paquetes e imágenes
  assets/                  Recursos locales
  App.css, index.css        Estilos de aplicación y globales
Legacy/
  components/              Componentes anteriores, fuera del flujo activo
  design.md, screen.png    Referencias de diseño archivadas
docs/                      Documentación técnica
```

Las páginas activas usan navegación por hash. Los componentes en `Legacy/components/` se conservan como referencia y no se importan desde la aplicación actual.

## Desarrollo local

```bash
npm install
npm run dev
```

## Compilar

```bash
npm run build
```

El workflow de GitHub Actions publica automáticamente `dist/` en GitHub Pages al subir cambios a `main`.
