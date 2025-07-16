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
  const Records = await models.Record.findAll({
    order: [["id", "DESC"]],
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
  console.log(changes)
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