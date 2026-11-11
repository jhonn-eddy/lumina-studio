# Solicitudes de sesión: API y permisos

## Comportamiento de la aplicación

El formulario permite elegir un paquete, indicar una fecha y enviar los datos para crear una solicitud pendiente. Si `VITE_API_URL` está configurada, usa la API del estudio. Si falta, el modo demo guarda la solicitud en `localStorage` y permite consultarla en `#/mis-solicitudes` en el mismo navegador. La agenda compartida (`#/agenda`) requiere la API.

El modo demo sirve únicamente para revisar la interfaz: el correo no verifica identidad, el almacenamiento del navegador no es seguro, los datos no llegan al estudio y no se comparten entre dispositivos. No usar datos reales hasta conectar el servicio y sus controles de acceso.

## Configuración del servicio

- `VITE_API_URL`: origen HTTPS del backend, sin barra final.
- `sessionStorage.lumina_access_token`: token corto de sesión establecido por un flujo de autenticación confiable. El repositorio no implementa inicio de sesión.
- Las variables `VITE_*` son públicas. No incluir claves secretas, credenciales de base de datos ni tokens de servicio.
- En producción, preferir una sesión segura administrada por backend/BFF cuando sea posible.

## Contrato esperado

La API debe validar entradas y paquete, generar `id`, propietario, estado inicial `pending` y fecha de creación. No aceptar del navegador propietario, rol, estado inicial ni precio.

| Operación | Ruta | Permiso del servidor |
|---|---|---|
| Crear solicitud | `POST /api/requests` | Anónimo con controles antiabuso y consentimiento registrado, o cliente autenticado. Valida campos/paquete y crea `pending`. |
| Leer historial | `GET /api/me/requests` | Cliente autenticado y verificado; filtra por propietario derivado de identidad, nunca por `ownerId` enviado por cliente. |
| Corregir solicitud propia | `PATCH /api/me/requests/{id}` | Titular verificado; solo campos expresamente permitidos y comprobación de propiedad en la misma operación. |
| Consultar agenda | `GET /api/staff/requests` | Personal con `requests:read`; devuelve datos necesarios para gestionar. |
| Confirmar o cancelar | `PATCH /api/staff/requests/{id}/status` | Personal con `requests:manage`; valida transición/disponibilidad y registra actor/fecha. |

El servidor verifica firma, emisor, audiencia, expiración y vigencia del token, y además autoriza cada operación por propietario y rol/permisos confiables. Validar un JWT no basta. La UI no sustituye estos controles.

## Comprobaciones antes de producción

En una base aislada, comprobar anónimo y dos clientes distintos. Lecturas y cambios no autorizados deben rechazarse sin datos personales ni cambios. Un cliente solo lee y corrige sus datos permitidos. El personal autorizado puede leer la agenda y confirmar/cancelar; sin permiso de lectura o gestión, cada acción se rechaza. Comprobar también que errores 401/403 no filtren contenido y que el servidor valide consentimiento, paquete, fechas, campos y transiciones.

Este repositorio contiene el cliente React, no la API. La persistencia compartida y la autorización del servidor dependen de desplegar y configurar el backend. El modo local no demuestra esas capacidades.

