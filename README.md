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

## Solicitudes de sesiones

Los paquetes del catálogo se pueden solicitar desde `#/reservar/{slug}`. El formulario crea una solicitud pendiente. Con `VITE_API_URL`, la solicitud se envía al backend, `#/mis-solicitudes` muestra el historial del titular autenticado y `#/agenda` permite al personal autorizado confirmar o cancelar.

Sin backend, el formulario sigue funcionando en modo demo: guarda solicitudes en el almacenamiento local del navegador y permite verlas en `#/mis-solicitudes` en ese mismo navegador. No llegan al estudio, no se sincronizan y el correo usado no verifica identidad. La agenda requiere el backend. No uses datos reales en el modo demo.

Consulta [`docs/solicitudes-api.md`](docs/solicitudes-api.md) para el contrato, las variables y las comprobaciones de autorización necesarias. `VITE_API_URL` se puede configurar como variable de repositorio en GitHub Actions para que GitHub Pages conecte la API durante la compilación; nunca configures secretos o claves privadas como variables `VITE_*`.

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

