const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
class authControllers {
  constructor(userService) {
    this.userService = userService;
  }
  async authUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let usuario = await this.userService.checkUser(email);
      if (!usuario) {
        return res.status(400).json({ msg: "el usuario no existe" });
      }
      const passwordVerification = await this.userService.comparePassword(
        password,
        usuario.password
      );
      if (!passwordVerification) {
        return res.status(400).json({ msg: "Password Incorrecto" });
      }
      const payload = {
        usuario: {
          id: usuario.id,
        },
      };
      jwt.sign(
        payload,
        "3sS3cr3ta",
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
          return res.status(200).json({ token });
        }
      );
    } catch (e) {
      return res.status(500).send(`Server Error type ${e}`);
    }
  }
  async getUser(req, res) {
    const { id } = req.usuario;
    console.log(id);
    try {
      const response = await this.userService.obtenerUser(id);
      const User = {
        user_name: response.user_name,
        email: response.email,
        registro: response.registro,
        id: response._id,
      };
      return res.status(200).json(User);
    } catch (error) {
      return res.status(500).json({ msg: `Server Error Type: ${error}` });
    }
  }
}
module.exports = authControllers;
