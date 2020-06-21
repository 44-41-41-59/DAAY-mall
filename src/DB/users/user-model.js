const schema = require('./user-schema.js');

// main user collection class
class UserCollection {
  constructor() {
    this.schema = schema;
  }

  // method to create new users
  async create(userInfo) {
    let that = this;
    return new Promise(function (res, rej) {
      try {
        let user = new that.schema(userInfo);
        console.log('inside the creat', user);
        user
          .save()
          .then((data) => {
            console.log('from the res', data);
            return res(data.populate('acl').execPopulate());
          })
          .catch((e) =>
            rej(
              new Error({ status: 500, message: 'Cannot save user correctly!' }),
            ),
          );
      } catch (e) {
        rej(
          new Error({ status: 500, message: 'Error in creating a new user.' }),
        );
      }
    });
  }

  // method for getting form user collection in the schema
  async read(userInfo) {
    if (userInfo !== undefined) {
      console.log(userInfo.email, userInfo, 'user');
      let record = await this.schema
        .findOne({
          email: userInfo.email,
        })
        .populate('acl').populate('wishlist').populate('review').populate('productID').exec();

      if (record) {
        let valid = await this.schema.authenticateUser(
          userInfo.password,
          record.password,
        );
        if (valid) {
          let token = await this.schema.generateToken(record._id);
          let userWithNewToken = await this.schema.findOneAndUpdate({ _id: record._id }, { token }, { new: true })
            .populate('acl').populate('wishlist').populate('review').populate('productID').exec();
          return userWithNewToken;
        } else {
          return 'Not The same pass';
        }
      } else {
        return { status: 401, message: 'User is not found!' };
      }
    } else {
      let record = await this.schema.find({}).populate('acl').populate('review').populate('wishlist').populate('productID').exec();
      return record;
    }
  }
}

module.exports = new UserCollection();
