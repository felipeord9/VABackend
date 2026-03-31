const { models } = require('../libs/sequelize')

const find = async () => {
  const types = await models.TypeInstall.findAll({
    order: [["id", "DESC"]]
  })
  return types
}

const create = async (body) =>{
  console.log(body)
  const newType = models.TypeInstall.create(body)
  return newType
}

const findOne = async (id) => {
  const tipo = await models.TypeInstall.findByPk(id)

  if(!tipo) throw boom.notFound('tipo no encontrado')

  return tipo
}

const update = async (id, changes) => {
  const tipo = await findOne(id)
  const updatedType = await tipo.update(changes)

  return updatedType
}

const remove = async (id) => {
  const tipo = await findOne(id)
  await tipo.destroy(id)
  return id
}

module.exports = {
  find,
  findOne,
  create,
  update,
  remove,
}