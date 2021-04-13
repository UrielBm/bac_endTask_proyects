# Api de proyecto back-end Tak_proyects en javascript

-esta es una Api de prueba realizada con Node.js y el framework de Express para evaluar y probar los conocimientos del lenguaje de JavaScript.

-Realizada por : Uriel Benítez Medina ;)
-Github [link de GitHub](https://github.com/UrielBm)

## Demo

El demo de la Api la puedes encontrar en [Api BackTask](https://courflix.herokuapp.com/).

## rutas genericas

**https://courflix.herokuapp.com/** _endpoint de bienvenida_
**https://courflix.herokuapp.com/login** _endpoint para hacer login_

## rutas Usuarios

**https://courflix.herokuapp.com/users** _endpoint para ver usuarios registrados_

**https://courflix.herokuapp.com/user/:id** _endpoint para ver un usuario especifico por Id_

**https://courflix.herokuapp.com/registeruser** _endpoint para registrar un nuevo usuario_

**https://courflix.herokuapp.com/user/edit/:id** _endpoint para editar info de un usuario debes de estar logueado y ser admin_

**https://courflix.herokuapp.com/user/delete/:id** _endpoint para eliminar un usuario debes de estar logueado y ser admin_

## rutas peliculas

**https://courflix.herokuapp.com/movies** _endpoint para ver las películas registradas, debe de estar logueado_

**https://courflix.herokuapp.com/movie/:id** _endpoint para ver información de cierta película por id, debe de estar logueado_

**https://courflix.herokuapp.com/registermovie** _endpoint para registrar una película debes de ser admin para hacerlo_

**https://courflix.herokuapp.com/movie/edit/:id** _endpoint para editar información de una película por id debes de ser admin para hacerlo_

**https://courflix.herokuapp.com/movie/delete/:id** _endpoint para eliminar una película de la BD debes de ser admin para hacerlo_

### para hacer registro de usuario

Para hacer un registro de usuario EXITOSAMENTE debes ocupar los paramentros requeridos:

```
"name": "nombre de registro" ***requerido***
"email": "ejemplo@ejemplo.com" ***requerido***
"password": "password" ***requerdio***
"FavMovie": "nombre de tu película favorita" ***NO REQUERIDO***
```

### para hacer login

Para hacer login EXITOSAMENTE debes de:

```
"correo": "ejemplo@ejemplo.com"
"password": "passwordDeRegistro"
```

### para hacer un registro de película

Para hacer un registro de película EXITOSAMENTE debes de:

```
"name": "nombre de la película" ***requerido***
"image": "tipo de archivo a subir debe de ser imagen" ***requerido***
"category": "categoria de la película" ***N0 REQUERIDO***
"type": "movie" o "serie" ***NO REQUERIDO***
```

**_Para hacer updates de usuarios o películas necesitas el id y los campos para actulizar_**

**_para hacer deletes debes de conocer el id de usuarios o películas para eliminar_**

**_para los endponits de visualizar users y movies existe un paginado cade 7 usuarios o películas, para acceder a ellos ocupa ?pag= número de página en la url_**
