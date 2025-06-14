const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')
const { Op } = require("sequelize");

const findAll = async () =>{
  const Records = await models.Record.findAll({
    include: [
      "balance",
      "user"
    ]
  })
  return Records
}

const find = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Fecha sin la hora
  const Records = await models.Record.findAll({
    include: [
      "balance",
      "user"
    ],
    where: {
      date: {
        [Op.gte]: today,
        [Op.lt]: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Añade 24 horas para obtener el fin del día
      },
    }
  })
  return Records
}

const findComplete = async () => {
  const Records = await models.Record.findAll({
    where: {
      finalVideo: {
        [Op.not]: null,
      }
    },
    include: [
      "user"
    ],
  })
  return Records
}

const findPending = async () => {
  const Records = await models.Record.findAll({
    where: {
      finalVideo: {
        [Op.is]: null,
      }
    },
    include: [
      "user"
    ],
  })
  return Records
}

const findOne = async (id) => {
  const record = await models.Record.findByPk(id)

  if(!record) throw boom.notFound('Record no encontrado')

  return record
}

const create = async (body) => {
  const newRecord = await models.Record.create(body)
  return newRecord
}

const update = async (id, changes) => {
  const record = await findOne(id)
  const updatedRecord = await record.update(changes)

  return updatedRecord
}

const remove = async (id) => {
  const Record = await findOne(id)
  await Record.destroy(id)
  return id
}

module.exports = {
  findAll,
  find,
  findComplete,
  findPending,
  findOne,
  create,
  update,
  remove
}