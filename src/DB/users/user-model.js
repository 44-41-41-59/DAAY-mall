const schema = require('./user-schema.js');

class UserCollection {
  constructor() {
    this.schema = schema;
  }
  async create(userInfo) {
    let that = this;
    // let check = await this.read(userInfo);
    return new Promise(function (res, rej) {
      try {
        let user = new that.schema(userInfo);
        user
          .save()
          .then((data) => {
            return res(data);
          })
          .catch((e) => rej(new Error({status:500, message:'Cannot save user correctly!'})));
      } catch (e) {
        rej(new Error({status:500, message:'Error in creating a new user.'}));
      }
    });
  }
  async read(userInfo) {
    if (userInfo !== undefined) {
      console.log(userInfo.email, userInfo, 'user');
      let record = await await this.schema.findOne({
        email: userInfo.email,
      });

      if (record) {
        let valid = await this.schema.authenticateUser(
          userInfo.password,
          record.password,
        );
        if (valid) {
          let token = await this.schema.generateToken(record._id);
          let userWithNewToken = await this.schema.findOneAndUpdate(
            { _id: record._id },
            { token },
            { new: true },
          );
          return userWithNewToken;
        } else {
          return 'Not The same pass';
        }
      } else {
        return {status:401, message:'User is not found!'};
      }
    } else {
      let record = await this.schema.find({});
      return record;
    }
  }
}

module.exports = new UserCollection();
