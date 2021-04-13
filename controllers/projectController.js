const { validationResult } = require("express-validator");
class projectController {
  constructor(projectService) {
    this.projectService = projectService;
  }
  async createProject(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const project = req.body;
    const idUser = req.usuario.id;
    try {
      const proyecto = await this.projectService.createProject(project, idUser);
      return res.status(200).json(proyecto);
    } catch (error) {
      return res.status(500).send(`Server Error type: ${error}`);
    }
  }
  async getProjects(req, res) {
    const userid = req.usuario.id;
    try {
      const response = await this.projectService.getProjectsByUser(userid);
      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ msg: `Server Error type: ${error}` });
    }
  }
  async updateProject(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { name } = req.body;
    const nuevoProyecto = {};
    if (name) {
      nuevoProyecto.name = name;
    }
    try {
      let proyecto = await this.projectService.getproyecto(id);
      if (!proyecto) {
        return res
          .status(404)
          .json({ msg: `el id: ${id} del proyecto no existe` });
      }
      if (proyecto.creador.toString() !== req.usuario.id) {
        return res
          .status(401)
          .json({ msg: "no atorizado para modificar proyecto" });
      }
      await this.projectService.updateProject(id, nuevoProyecto);
      return res
        .status(200)
        .json({ msg: `se actualizo el proyecto con id : ${id} correctamente` });
    } catch (error) {
      return res.status(500).json({ msg: `Server Error type: ${error}` });
    }
  }
  async deleteAProject(req, res) {
    const { id } = req.params;
    try {
      const proyecto = await this.projectService.getproyecto(id);
      if (proyecto.creador.toString() !== req.usuario.id) {
        return res
          .status(401)
          .json({ msg: "no autorizado para eliminar el proyecto" });
      }
      await this.projectService.deleteProject(id);
      return res
        .status(200)
        .json({ msg: `se ha eliminado el proyecto exitosamente` });
    } catch (error) {
      return res.status(500).json({ msg: `Server Error type: ${error}` });
    }
  }
}
module.exports = projectController;
