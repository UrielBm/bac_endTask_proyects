const { validationResult } = require("express-validator");
class projectController {
  constructor(tareaService, proyectoService) {
    this.tareaService = tareaService;
    this.proyectoService = proyectoService;
  }
  async createTarea(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { proyectoId } = req.body;
    const tarea = req.body;
    try {
      const proyecto = await this.proyectoService.getproyecto(proyectoId);
      if (!proyecto) {
        return res.status(404).json({ msg: "Proyecto no encontrado" });
      }
      if (proyecto.creador.toString() !== req.usuario.id) {
        return res
          .status(401)
          .json({ msg: "no atorizado para crear una tarea" });
      }
      const Tarea = await this.tareaService.createTarea(tarea);
      return res.status(200).json(Tarea);
    } catch (error) {
      return res.status(500).json({ msg: `Server Error : ${error}` });
    }
  }
  async getTarea(req, res) {
    const { proyectoId } = req.query;
    try {
      const proyecto = await this.proyectoService.getproyecto(proyectoId);
      if (!proyecto) {
        return res.status(404).json({ msg: "Proyecto no encontrado" });
      }
      if (proyecto.creador.toString() !== req.usuario.id) {
        return res
          .status(401)
          .json({ msg: "no atorizado para crear una tarea" });
      }
      const response = await this.tareaService.getTareasByProject(proyectoId);
      res.status(200).json(response);
    } catch (e) {
      return res.status(500).json({ msg: `Server Error type: ${e}` });
    }
  }
  async updateTarea(req, res) {
    const { proyectoId, tarea, status } = req.body;
    const { id } = req.params;
    try {
      const responseTarea = await this.tareaService.getTareaById(id);
      if (!responseTarea) {
        return res.status(404).json({ msg: `Tarea no encontrada` });
      }
      const proyecto = await this.proyectoService.getproyecto(proyectoId);
      if (proyecto.creador.toString() !== req.usuario.id) {
        return res
          .status(401)
          .json({ msg: "no atorizado para actualizar una tarea" });
      }
      const nuevaTarea = {};
      nuevaTarea.tarea = tarea;
      nuevaTarea.status = status;
      const tareaupdate = await this.tareaService.updateTarea(id, nuevaTarea);
      res.status(200).json(tareaupdate);
    } catch (e) {
      return res.status(500).json({ msg: `Server Error type: ${e}` });
    }
  }
  async deleteTarea(req, res) {
    const { proyectoId } = req.query;
    console.log(proyectoId);
    const { id } = req.params;
    try {
      const responseTarea = await this.tareaService.getTareaById(id);
      if (!responseTarea) {
        return res.status(404).json({ msg: `Tarea no encontrada` });
      }
      const proyecto = await this.proyectoService.getproyecto(proyectoId);
      console.log(proyecto);
      if (proyecto.creador.toString() !== req.usuario.id) {
        return res
          .status(401)
          .json({ msg: "no atorizado para actualizar una tarea" });
      }
      await this.tareaService.deleteTarea(id);
      res.status(200).json({ msg: `Tarea eliminada correctamente` });
    } catch (e) {
      return res.status(500).json({ msg: `Server Error type: ${e}` });
    }
  }
}
module.exports = projectController;
