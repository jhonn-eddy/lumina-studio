# Solicitudes de sesión: contrato de API y autorización

La aplicación presenta la interfaz de consultas, historial y agenda, pero el repositorio es una aplicación React/Vite estática: **no implementa una API, autenticación, roles, ni almacenamiento persistente**. Sin configurar el servicio backend descrito aquí, la interfaz informa del error y no presenta un envío como guardado. Nunca introduzcas datos reales en demostraciones sin conectar el servicio.

## Configuración

- `VITE_API_URL`: origen HTTPS de la API, sin barra final; por ejemplo, el dominio del backend desplegado.
- `sessionStorage.lumina_access_token`: JWT de acceso de corta duración, emitido por el proveedor de identidad confiable tras el inicio de sesión. La aplicación consumidora puede establecerlo después de autenticar al cliente o al miembro del personal. Nunca guardes JWT en `localStorage`.
- `VITE_API_URL` es una variable pública del cliente: no le asignes claves secretas, credenciales de base de datos ni JWT de servicio.
- Si el token caduca, renueva la sesión en el proveedor de identidad o pide al usuario iniciar sesión de nuevo. En producción, prefiere una sesión segura, `HttpOnly`, `Secure` y `SameSite`, operada por el backend/BFF, a exponer tokens JavaScript.

## Rutas esperadas

Todas las rutas aceptan HTTPS, devuelven JSON y validan el origen/CORS y el token. Esquema sugerido: `id`, `packageSlug`, `name`, `email`, `phone`, `date` (`YYYY-MM-DD`), `type`, `message`, `status` (`pending | confirmed | cancelled`) y `createdAt`. El cliente nunca define `id`, `ownerId`, `role`, el estado inicial o el precio.

| Operación | Ruta | Principal autorizado | Resultado |
|---|---|---|---|
| Solicitar | `POST /api/requests` | Anónimo con consentimiento registrado o cliente autenticado | Crea `pending`; valida paquete contra catálogo, fecha y límites. Aplica verificación antiabuso. |
| Consultar historial | `GET /api/me/requests` | Cliente con cuenta verificada | Devuelve solo registros cuyo `ownerId` corresponde al `sub` verificado del token. No admite `ownerId` proporcionado por cliente. |
| Revisar agenda | `GET /api/staff/requests` | Personal autorizado con permiso `requests:read` | Devuelve solo los campos necesarios para gestionar solicitudes. |
| Confirmar o cancelar | `PATCH /api/staff/requests/{id}/status` | Personal autorizado con permiso `requests:manage` | Cambia únicamente el estado admitido; valida transición, disponibilidad y versión del registro. Registra actor y fecha del cambio. |

El servidor valida firma, emisor, audiencia, expiración, principal y revocación del token. Luego **autoriza cada operación** con `sub` y permisos/roles procedentes de una fuente de identidad de confianza, comprobando propietario y estado del registro dentro de la misma operación de base de datos. Validar el JWT por sí solo no autoriza la acción. Un visitante anónimo nunca puede leer registros ni cambiar estados. El cliente no tiene rutas de lectura de otros titulares o de agenda ni puede cambiar estado, propietario, precio o fecha de confirmación.

## Verificación de aceptación en el backend desplegado

La interfaz estática no puede demostrar permisos de servidor; automatiza estas comprobaciones sobre un entorno no productivo y una base aislada antes de recibir datos reales:

1. Crear dos cuentas cliente, A y B; presentar una consulta para cada una. Un cliente verificado puede leer y corregir su propio registro solamente si el backend habilita expresamente esa corrección; de lo contrario, su operación de corrección también se rechaza.
2. Sin token, solicitar `GET /api/me/requests` y leer/cambiar un registro conocido. Cada operación debe devolver rechazo y no incluir contacto, fecha, mensaje ni datos de otro cliente. Intentar crear sin consentimiento y con paquetes/fechas inválidos no debe guardar registros.
3. Como cliente B, leer el historial de A o modificar su registro: recibir rechazo sin campos personales en la respuesta y sin cambios en la base de datos. Repetir la modificación para el estado de su propio registro: no puede confirmarlo ni cancelarlo.
4. Como personal sin `requests:read`, leer la agenda; y sin `requests:manage`, cambiar el estado: ambas operaciones se rechazan. Como personal autorizado, comprobar lectura de agenda y las transiciones permitidas de pendiente a confirmada/cancelada; un cliente, estado o transición no autorizados se rechazan.
5. Comprobar que respuestas 401/403 no incluyan el cuerpo del registro; cambios no autorizados dejan intactos estado, fechas, propietario y contactos. Evitar distinguir mediante mensajes si una solicitud ajena existe: usar una respuesta de denegación/no enumeración consistente.

La entidad es una **solicitud de sesión**, pendiente de confirmación, no una cita garantizada. No almacenar datos de pago; definir privacidad, retención y aviso informativo en el backend antes de utilizar datos reales. El consentimiento se debe guardar con finalidad, versión del aviso y fecha del servidor. Cumplir la verificación de identidad y los permisos al nivel del recurso y la operación, incluso si se activa RLS; la UI, el ocultamiento de controles y el JWT no reemplazan los controles del servicio.
