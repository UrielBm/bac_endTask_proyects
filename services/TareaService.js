const Tarea = require("./../models/TareaModel");
class TareaService {
  createTarea(tarea) {
    const newTarea = new Tarea(tarea);
    return newTarea.save();
  }
  getTareaById(id) {
    const response = Tarea.findById(id);
    return response;
  }
  getTareasByProject(proyectoId) {
    const response = Tarea.find({ proyectoId }).sort({ registro: -1 });
    return response;
  }
  updateTarea(id, newTarea) {
    const response = Tarea.findOneAndUpdate({ _id: id }, newTarea, {
      new: true,
    });
    return response;
  }
  deleteTarea(id) {
    const response = Tarea.findByIdAndRemove(id);
    return response;
  }
}
module.exports = TareaService;
