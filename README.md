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

Los paquetes del catálogo se pueden solicitar desde `#/reservar/{slug}`. Cada envío crea, con el servicio conectado, una solicitud pendiente. `#/mis-solicitudes` muestra el historial del titular autenticado y `#/agenda` permite al personal autorizado confirmar o cancelar. La interfaz necesita `VITE_API_URL` y un backend con autenticación y autorización por propietario y permiso. Sin backend, los datos no se guardan y la página informa de que el servicio no está configurado.

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
