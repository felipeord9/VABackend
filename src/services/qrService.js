const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')
const { Op } = require("sequelize");

const find = async () => {
  const Qrs = await models.Qr.findAll({
    order: [["id", "DESC"]],
  })
  return Qrs
}

const findOne = async (id) => {
  const Qr = await models.Qr.findByPk(id)

  if(!Qr) throw boom.notFound('Qr no encontrado')

  return Qr
}

const create = async (body) => {
  const newQr = await models.Qr.create(body)
  return newQr
}

const update = async (id, changes) => {
  console.log(changes)
  const Qr = await findOne(id)
  const updatedQr = await Qr.update(changes)

  return updatedQr
}

const remove = async (id) => {
  const Qr = await findOne(id)
  await Qr.destroy(id)
  return id
}

module.exports = {
  find,
  findOne,
  create,
  update,
  remove
}