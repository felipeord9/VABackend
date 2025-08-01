const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

const find = async () => {
  const users = await models.User.findAll({})
  return users
}

const findInstallers = async () => {
  const users = await models.User.findAll({
    where: {
      role: 'usuario'
    }
  })
  return users
}

const findOne = async (id) => {
  const user = await models.User.findByPk(id)

  if(!user) throw boom.notFound('Usuario no encontrado')

  return user
}

const findByUsername = async (username) => {
  const user = await models.User.findOne({
    where: {
      username: username
    }
  })

  if(!user) throw boom.notFound('Usuario no encontrado')

  return user
}

const findByEmail = async (email) => {
  const user = await models.User.findOne({
    where: { email }
  })

  if(!user) throw boom.notFound('Usuario no encontrado')

  return user
}

const create = async (data) => {
  const hash = bcrypt.hashSync(data.password, 10)
  const newUser = await models.User.create({
    ...data,
    password: hash
  })
  delete newUser.dataValues.password
  return newUser
}

const update = async (id, changes) => {
  let hash
  if(changes.password){
    hash = bcrypt.hashSync(changes.password,10)
  }
  const user = await findOne(id)
  const updatedUser = await user.update({...changes,password:hash})
  delete updatedUser.dataValues.password
  return updatedUser
}

const remove = async (id) => {
  const user = await findOne(id)
  await user.destroy(id)
  return id
}

module.exports = {
  find,
  findInstallers,
  findOne,
  findByEmail,
  findByUsername,
  create,
  update,
  remove
}