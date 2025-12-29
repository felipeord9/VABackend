const fs = require('fs');
const path = require('path');
const { Op } = require('sequelize');
const { config } = require('../../config/config')
const { models } = require('../../libs/sequelize')

const VIDEO_FOLDER = 'C:\\videos_guardados';

const isValidDateFolder = (name) => /^\d{4}-\d{2}-\d{2}$/.test(name);

const isOlderThan30Days = (folderName) => {
  const folderDate = new Date(folderName);
  const now = new Date();
  const diffDays = (now - folderDate) / (1000 * 60 * 60 * 24);
  return diffDays > 120;
};

async function deleteFolderAndDatabaseEntries(folderDate) {
  const folderPath = path.join(VIDEO_FOLDER, folderDate);

  fs.rm(folderPath, { recursive: true, force: true }, (err) => {
    if (err) console.error(`❌ Error eliminando carpeta ${folderPath}:`, err);
    else console.log(`🗑️ Carpeta eliminada: ${folderPath}`);
  });

  try {
    /* await db.query('DELETE FROM videos WHERE fecha = $1', [folderDate]); */
    /* models.Record.sequelize.query('DELETE FROM record WHERE initalDate = $1', [folderDate]) */

    // Fecha hace un mes
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Opcional: truncar hora si quieres precisión por fecha
    oneMonthAgo.setHours(0, 0, 0, 0);

    const deletedCount = await models.Record.destroy({
        where: {
            initalDate: {
              [Op.lt]: oneMonthAgo // Menor que hace un mes
            }
        }
    })
    console.log(`🧹 Registros eliminados anteriores a ${oneMonthAgo.toISOString().split('T')[0]}: ${deletedCount}`);
  } catch (err) {
    console.error(`❌ Error eliminando de DB:`, err);
  }
}

async function runCleanup() {
  try {
    console.log('Se inicio el proceso')
    const folders = fs.readdirSync(VIDEO_FOLDER, { withFileTypes: true });
    console.log('Se leyeron las carpetas')
    for (const folder of folders) {
        console.log(`carpeta leida: ${folder.name}`)
      if (folder.isDirectory() && isValidDateFolder(folder.name) && isOlderThan30Days(folder.name)) {
        await deleteFolderAndDatabaseEntries(folder.name);
      }else{
        console.log('NO se borró nada')
      }
    }

  } catch (err) {
    console.error('❌ Error general:', err);
  }
}

module.exports = runCleanup;
