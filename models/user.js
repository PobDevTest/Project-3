var bcrypt = require("bcrypt-nodejs");


module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
     
      email: {
          type: DataTypes.STRING, 
        allowNull: false,
        unique: true
      },
      firstName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      type:{
          type: DataTypes.STRING,
          allowNull: false
      },
      isVendor :{
          type: DataTypes.BOOLEAN,
      },
      zipcode :{
          type: DataTypes.INTEGER,
          allowNull: false
      }

      
    });

    User.prototype.validPassword = function(password) {
      return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.hook("beforeCreate", function(user) {
      console.log(user.password)
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
 };

        