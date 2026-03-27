const { models } = require('../libs/sequelize')

const find = async () => {
  const types = await models.TypeInstall.findAll({
    order: [["id", "DESC"]]
  })
  return types
}

module.exports = {
  find,
}