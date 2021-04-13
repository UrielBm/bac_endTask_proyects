const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");
const authControllers = require("../controllers/authController");
const projectControllers = require("../controllers/projectController");
const tareaControllers = require("../controllers/tareaController");
const UserService = require("../services/UserService");
const ProjectService = require("../services/ProjectService");
const TareaService = require("../services/TareaService");
const userIntance = new userControllers(new UserService());
const authIntance = new authControllers(new UserService());
const ProjectIntance = new projectControllers(new ProjectService());
const tareaIntance = new tareaControllers(
  new TareaService(),
  new ProjectService()
);
const { check } = require("express-validator");
const checkAuth = require("../utils/checkAuth");
//Rutas tareas
router.post(
  "/tarea/create",
  [
    check("tarea", "Ingresa el nombre de la tarea").not().isEmpty(),
    check("proyectoId", "Ingresa el id del proyecto").not().isEmpty(),
  ],
  checkAuth,
  (req, res, next) => {
    tareaIntance.createTarea(req, res);
  }
);
router.get("/tarea", checkAuth, (req, res, next) => {
  tareaIntance.getTarea(req, res);
});
router.put("/tarea/update/:id", checkAuth, (req, res, next) => {
  tareaIntance.updateTarea(req, res);
});
router.delete("/tarea/delete/:id", checkAuth, (req, res, next) => {
  tareaIntance.deleteTarea(req, res);
});
//Rutas Projects
router.post(
  "/project/create",
  [check("name", "Ingresa el nombre del proyecto").not().isEmpty()],
  checkAuth,
  (req, res, next) => {
    ProjectIntance.createProject(req, res);
  }
);
router.get("/projects", checkAuth, (req, res, next) => {
  ProjectIntance.getProjects(req, res);
});
router.put(
  "/project/update/:id",
  [check("name", "Ingresa el nombre del proyecto").not().isEmpty()],
  checkAuth,
  (req, res, next) => {
    ProjectIntance.updateProject(req, res);
  }
);
router.delete("/project/delete/:id", checkAuth, (req, res, next) => {
  ProjectIntance.deleteAProject(req, res);
});
//Rutas Autenticar
router.post("/auth", (req, res, next) => {
  authIntance.authUser(req, res);
});
router.get("/auth/user", checkAuth, (req, res, next) => {
  authIntance.getUser(req, res);
});
//Rutas de usuarios
router.post(
  "/users/create",
  [
    check("user_name", "El nombre del usuario es obligatorio").not().isEmpty(),
    check("email", "Ingresa un email valido").isEmail(),
    check(
      "password",
      "tu password debe de ser de almenos 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  (req, res, next) => {
    userIntance.createUser(req, res);
  }
);
/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("welcome to de Api back");
});

module.exports = router;
