# Supabase Cloud: configuración inicial

## Entorno

- Sistema: Windows 10 x64.
- Proyecto: React 19 y JavaScript con Vite 8; gestor npm; Node.js 24.19.0 y npm 11.17.0.
- CLI: `supabase` 3.0.0, instalada como dependencia de desarrollo (`npm install --save-dev supabase`). No se instaló ni se usó Docker.
- SDK: `@supabase/supabase-js` 2.119.0.

## Estado actual

- Inicialización CLI: verificada; `supabase/config.toml` creado con `project_id = "react-app"`.
- CLI local: verificada; `npx supabase --version` devuelve `3.0.0`.
- Autenticación de Supabase: pendiente. No se encontró token. La terminal administrada no puede responder a la solicitud interactiva de `supabase login` (`NonInteractiveError`); no pegues un token personal en el chat ni en Git.
- Proyecto Cloud: no seleccionado ni vinculado. Aún no se pudo ejecutar satisfactoriamente `supabase projects list` porque requiere inicio de sesión.
- URL de Cloud y clave publicable: pendientes de seleccionar el proyecto correcto. **No se configuraron credenciales inventadas ni secretos.**
- Compilación: ejecutar `npm run build` después de configurar los valores. El cliente exporta `supabase = null` e `isSupabaseConfigured = false` mientras no estén configurados; ningún flujo de negocio está conectado.

## Para completar la autenticación y seleccionar el proyecto

Abre una terminal normal de PowerShell en este directorio del repositorio (`react-app`) y ejecuta:

```powershell
npx supabase login
npx supabase projects list
```

Completa en el navegador el inicio de sesión de Supabase, cierra la sesión si estás en una cuenta incorrecta y selecciona la organización/proyecto que corresponde a Lumina Studio. Informa del **nombre del proyecto y su project ref** (no compartas tokens). Si ya dispones de un Personal Access Token, introdúcelo de forma interactiva en la terminal segura; nunca lo incluyas en el chat, los comandos guardados, archivos del repositorio ni capturas compartidas.

Tras elegir el proyecto, ejecuta:

```powershell
npx supabase link --project-ref TU_PROJECT_REF
npx supabase projects list
npx supabase status
```

El enlace es solo configuración local; no ejecuta migraciones ni modifica la base de datos remota. No ejecutes `supabase db push`, `supabase migration up` ni comandos SQL remotos durante esta preparación.

## Variables de la aplicación

Copia `.env.example` a `.env.local` y rellena los valores públicos del proyecto desde Supabase Dashboard → Connect:

```dotenv
VITE_SUPABASE_URL=https://TU_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
VITE_API_URL=https://TU_API_DE_RESERVAS
```

Obtén URL y clave publicable del **proyecto seleccionado**; no adivines, copies claves de otro proyecto ni pegues credenciales en el repositorio. Las variables `VITE_*` se compilan en el navegador y son públicas. Nunca incluyas una clave `sb_secret_...`, `service_role`, un token de acceso personal o credenciales de base de datos. `.env` y `.env.*` están ignorados por Git; `.env.example` queda incluido.

La inicialización del SDK está centralizada en `src/lib/supabase.js`. Consume `supabase` de ese módulo solo después de que `isSupabaseConfigured` sea `true`. Esta preparación no incorpora autenticación de usuarios, CRUD, tablas, migraciones ni cambios remotos. Antes de exponer datos, diseñar las políticas RLS y revisar los permisos por recurso.

El formulario de reservas usa `VITE_API_URL` y necesita un backend externo que implemente `POST /api/requests`, `GET /api/me/requests`, `GET /api/staff/requests` y `PATCH /api/staff/requests/{id}/status`. Instalar Supabase SDK no crea esas rutas. Para sustituir el backend por Supabase directamente se debe implementar y probar la persistencia, autenticación y las políticas RLS en un proyecto Cloud autorizado. Hasta entonces, las solicitudes no se guardan; la pantalla lo indica y propone la fecha de hoy inicialmente.

## Archivos creados o modificados

- `package.json`, `package-lock.json`: CLI en `devDependencies` y SDK en `dependencies`.
- `supabase/config.toml`: configuración local inicial, todavía sin vínculo confirmado.
- `.env.example`: nombres de variables con valores de ejemplo, sin credenciales reales.
- `.gitignore`: protege `.env` y archivos de entorno, salvo `.env.example`.
- `src/lib/supabase.js`: cliente centralizado, inactivo de forma segura si falta configuración.
- `SUPABASE_SETUP.md`: este registro, incluidos pasos pendientes.

## Comandos útiles

```powershell
npx supabase --version
npx supabase login
npx supabase projects list
npx supabase link --project-ref TU_PROJECT_REF
npx supabase status
npm run build
npm run dev
```

La CLI requiere iniciar sesión y el vínculo con el proyecto Cloud necesita el project ref correcto. Las siguientes tareas operativas son completar la sesión, escoger el proyecto, vincularlo y recuperar su URL y clave publicable para `.env.local`.
