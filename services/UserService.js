const User = require("./../models/UserModel");
const bcrypt = require("bcrypt");
class UserService {
  checkUser(email) {
    const response = User.findOne({ email }).exec();
    console.log(response);
    return response;
  }
  createUser(user) {
    const response = bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
      const newUser = new User(user);
      return newUser.save();
    });
    return response;
  }
  async comparePassword(password, userpassword) {
    const validPassword = await bcrypt.compare(password, userpassword);
    console.log(validPassword);
    return validPassword;
  }
  obtenerUser(id) {
    const response = User.findById(id);
    return response;
  }
}
module.exports = UserService;
