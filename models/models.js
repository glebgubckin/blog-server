const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  name: {type: DataTypes.STRING, allowNull: false, defaultValue: String(Date.now())},
  surname: {type: DataTypes.STRING},
  email: {type: DataTypes.STRING, unique: true, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  dateSince: {type: DataTypes.DATE, defaultValue: Date.now()},
  confirmed: {type: DataTypes.INTEGER, defaultValue: '0'},
  role: {type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user'},
  status: {type: DataTypes.ENUM('common', 'premium'), defaultValue: 'common'},
  }, {
    timestamps: false
  }
)

const Article = sequelize.define('article', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  title: {type: DataTypes.STRING, allowNull: false},
  description: {type: DataTypes.STRING, allowNull: false}, 
  borderColor: {type: DataTypes.STRING},
  upload: {type: DataTypes.DATE},
  access: {type: DataTypes.ENUM('ALL', 'PREMIUM'), defaultValue: 'all'}
  }, {
    timestamps: false
  }
)

const Subsrciption = sequelize.define('user-subsrciption', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  userId: {type: DataTypes.INTEGER},
  start: {type: DataTypes.DATE},
  end: {type: DataTypes.DATE}
  }, {
    timestamps: false
  }
)

module.exports = {
  User,
  Article,
  Subsrciption
}