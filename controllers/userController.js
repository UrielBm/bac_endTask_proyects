const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
class userControllers {
  constructor(userService) {
    this.userService = userService;
  }
  async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = req.body;
    const email = user.email.toLowerCase();
    try {
      const validationUser = await this.userService.checkUser(email);
      // validación de usuario por email unico
      if (validationUser) {
        return res
          .status(400)
          .json({ msg: "usuario ya fue creado previamente" });
      }
      const usuario = await this.userService.createUser({ ...user, email });
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
      return res.status(500).send(`Server Error, type ${e}`);
    }
  }
}
module.exports = userControllers;
