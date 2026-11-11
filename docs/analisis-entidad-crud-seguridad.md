# Análisis de entidad, CRUD y seguridad

## Sistema y entidad principal

Lumina Studio ofrece un catálogo estático de paquetes y un formulario para solicitar sesiones. La entidad es la **solicitud de sesión**: vincula a un cliente con el paquete elegido, la fecha solicitada y los datos necesarios para responder. Se crea inicialmente con estado `pending` (pendiente); una solicitud no equivale a una cita confirmada.

El formulario de `src/pages/BookingPage.jsx` recoge paquete (`packageSlug`), nombre, correo, teléfono opcional, fecha, tipo, mensaje y consentimiento. El navegador valida campos obligatorios, formato de correo, longitudes y fecha mínima. El servidor debe repetir esas validaciones y comprobar el paquete contra su catálogo confiable.

## Persistencia implementada

Si `VITE_API_URL` está configurada, el formulario envía la solicitud a `POST /api/requests`; el historial consulta `GET /api/me/requests` y la agenda usa rutas del personal. El frontend no contiene la API ni una base de datos, por lo que el guardado remoto requiere que ese servicio esté desplegado y configurado.

Si no hay API configurada, el modo de demostración sí permite enviar y guarda la solicitud en `localStorage` del navegador. El historial del mismo navegador muestra las solicitudes asociadas al correo usado durante la sesión. Los datos no llegan al estudio, no se sincronizan entre dispositivos y el correo no verifica identidad. La agenda no lee esos datos ni permite gestionarlos en este modo.

| Campo | Tipo | Obligatorio | Consideración |
|---|---|---:|---|
| `packageSlug` | Cadena del catálogo | Sí | El servidor valida que el paquete exista; el cliente no define el precio. |
| `name` | Texto, máximo 100 | Sí | Dato personal. |
| `email` | Correo, máximo 254 | Sí | Dato personal; no es prueba de identidad. |
| `phone` | Texto, máximo 30 | No | Dato personal de contacto. |
| `date` | Fecha `YYYY-MM-DD` | Sí | Fecha solicitada, no confirmada. |
| `type` | Opción del formulario | No | Tipo de sesión. |
| `message` | Texto, máximo 1200 | Sí | Puede contener datos personales adicionales. |
| `consent` | Booleano | Sí | Se envía a la API y se guarda en modo demo; debe asociarse a propósito y versión del aviso en el servidor. |
| `status` | `pending`, `confirmed`, `cancelled` | Sistema | Lo establece y modifica el servidor, nunca el cliente. |

## Matriz CRUD y permisos

La interfaz y el modo local no constituyen controles de acceso. En producción, cada operación debe autorizarse en el servidor según identidad verificada, propietario y rol/permisos. Verificar un JWT por sí solo no basta.

| Dato/operación | Crear | Leer | Corregir/actualizar | Eliminar |
|---|---|---|---|---|
| Solicitud de sesión | Visitante o cliente, sujeto a validación, consentimiento y controles antiabuso. Se crea como pendiente. | Titular autenticado y verificado puede leer sus solicitudes; personal con `requests:read` puede leer los campos necesarios para operar la agenda. | Titular verificado puede corregir sus propios datos permitidos; personal con `requests:manage` puede cambiar estado siguiendo transiciones válidas. El titular no cambia estado, propietario ni precio. | Personal autorizado según política de retención; atender solicitudes del titular tras verificar identidad y registrar la operación. |
| Paquete y galería | Administrador autorizado, si se habilita gestión. | Público para el catálogo publicado. | Administrador autorizado. | Administrador autorizado, preservando referencias históricas de solicitudes. |
| Evidencia de consentimiento | Se registra junto con la solicitud, finalidad, versión del aviso y fecha del servidor. | Titular verificado y personal autorizado, según necesidad. | No se reescribe retrospectivamente; cambios/revocaciones se registran como eventos. | Según retención y obligaciones aplicables. |

El modo demo guarda localmente una copia de los campos del formulario para permitir probar el envío y el historial. `localStorage` no es almacenamiento protegido: cualquiera con acceso al navegador puede inspeccionarlo o modificarlo. No se debe introducir información real ni usar la agenda con datos reales en ese modo.

## Regla de seguridad y riesgo

Si se conecta una API sin autorización por operación y propietario, otro cliente podría leer contactos y fechas ajenos o alterar solicitudes. Esto describe un **riesgo potencial**, no una fuga actual demostrada: la aplicación no trae una API desplegada ni registros remotos conectados. En modo demo los registros viven solo en el navegador de origen.

El servidor debe autenticar y autorizar cada petición, derivar el propietario de la identidad verificada, y comprobar propietario/rol junto con el registro en la misma operación. Denegar solicitudes anónimas de lectura y modificación y las solicitudes de un cliente sobre registros de otra persona; responder sin datos personales y sin cambios. Personal con `requests:read` puede consultar agenda; personal con `requests:manage` puede confirmar o cancelar solicitudes pendientes. Registrar actor y fecha del cambio. La interfaz no puede conceder permisos.

## Pruebas de aceptación del backend

En entorno aislado, crear solicitudes para clientes A y B. Comprobar que:

1. El anónimo no puede leer ni modificar solicitudes; se rechaza sin datos personales ni cambios.
2. B no puede leer ni cambiar solicitudes de A; se rechaza sin datos personales ni cambios. B tampoco puede cambiar el estado de su solicitud.
3. El titular verificado puede consultar su historial y corregir solo los campos permitidos de sus propias solicitudes.
4. Personal sin `requests:read` no lee la agenda; sin `requests:manage` no cambia estados. Personal autorizado sí ejecuta las operaciones permitidas.
5. Estados/transiciones, fecha, paquete y consentimiento se validan en servidor. Un JWT válido sin permiso operativo no autoriza la acción.

Estas verificaciones aún requieren ejecutar el backend: el frontend por sí solo no demuestra autorización del servidor.

## Respuesta al compañero

Un permiso que conviene precisar es la corrección por parte del cliente: permitir lectura al titular verificado debe acompañarse de una lista explícita de campos que puede corregir, verificación de propiedad en cada petición y prohibición de cambiar propietario o estado. De lo contrario, otro cliente podría modificar una solicitud ajena si la API solo valida el JWT.

## Conclusión

El envío ahora funciona en modo demo y guarda la solicitud en el navegador; con `VITE_API_URL`, intenta persistirla mediante el servicio del estudio. El almacenamiento local permite revisar el flujo, pero no ofrece identidad verificada, sincronización ni agenda compartida. Para producción se necesita desplegar la API, autenticar clientes y personal, y hacer cumplir autorización por operación, propietario y rol en servidor.

