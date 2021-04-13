const Project = require("./../models/ProjectModel");
class ProjectService {
  createProject(project, idUser) {
    const newProject = new Project(project);
    newProject.creador = idUser;
    return newProject.save();
  }
  getProjectsByUser(userId) {
    const projects = Project.find({ creador: userId })
      .sort({ registro: -1 })
      .exec();
    return projects;
  }
  getproyecto(id) {
    const response = Project.findById(id);
    return response;
  }
  updateProject(id, proyecto) {
    const response = Project.findByIdAndUpdate(
      { _id: id },
      { $set: proyecto },
      { new: true }
    );
    return response;
  }
  deleteProject(id) {
    const response = Project.findOneAndRemove({ _id: id }).exec();
    return response;
  }
}
module.exports = ProjectService;
