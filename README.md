#  Proyecto 1 - Backend
## _Secure Contact Management API_



API REST desarrollada con Express y MongoDB Atlas que implementa
autenticación basada en JWT, control de acceso por roles (user/admin),
gestión CRUD de usuarios y contactos, y almacenamiento de imágenes en Cloudinary.
Los usuarios registrados pueden guardar su nombre, número de teléfono y correo electrónico, y también pueden cambiar su foto predeterminada.
Esto permite la posibilidad de expandir la funcionalidad en el futuro, como publicar publicaciones o subir fotos.


## Tecnologías

- [Node.js]
- [Express]
- [MongoDBAtlas]
- [Mongoose]
- [Cloudinary]
- [Multer]
- [JWT(JSON Web Token)]
- [Bcrypt]
- [Dotenv]

## Models
## _user_
- userId
- password
- role (user/admin)
- photo
- photoId

## _contact_
- name
- email
- phone
- user

## Control de Roles

- Los nuevos usuarios se crean con rol "user".
- El primer admin se crea manualmente en MongoDB Atlas.
- Solo los administradores pueden cambiar el rol de otros usuarios.
- Un usuario normal NO puede cambiar roles.


## Eliminación de cuentas

- Un usuario puede eliminar su propia cuenta.
- Un admin puede eliminar cualquier usuario.
- Cuando se elimina un usuario, también se elimina su imagen de Cloudinary.

## Subida de imágenes

Las imágenes se suben desde el ordenador local
y se almacenan en Cloudinary usando middleware.

## Seed

Se implementó un seeder para insertar múltiples documentos en la colección Contacts.


## Integridad de datos

- No se permiten contactos duplicados en el array.
- Se utiliza validación antes de insertar nuevos elementos.

