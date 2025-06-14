const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/videos_guardados'); // Ruta personalizada
  },
  filename: (req, file, cb) => {
    const filename = req.body.name || 'video';
    cb(null, `${filename}.webm`);
  }
});

/* const upload = multer({ storage }); */
const upload = multer({ dest: 'uploads/' });

router.post('/record', upload.single('video'), (req, res) => {
  const placa = req.body.placa;
  const concept = req.body.concept;
  const createdAt = req.body.createdAt;

  if (!req.file) {
    return res.status(400).send('No se recibió ningún archivo');
  }

  const ruta = `C:/videos_guardados/${createdAt}/${placa}`
  const inputPath = req.file.path;
  const outputFileName = `video${concept}_${placa}.mp4`;
  const outputPath = path.join(ruta, outputFileName)
  /* const outputPath = inputPath.replace('.webm', '.mp4'); */

  try{
    //crear el directorio si no esta o utilizar el que ya esta
    if (!fs.existsSync(ruta)) {
        fs.mkdirSync(ruta, { recursive: true });
    }

    // Convertir a MP4
    ffmpeg(inputPath)
      .output(outputPath)
      .on('end', () => {
        fs.unlinkSync(inputPath); // Elimina el archivo .webm temporal
        res.send('Video subido y convertido a MP4 correctamente');
      })
      .on('error', (err) => {
        console.error('Error al convertir:', err);
        res.status(500).send('Error al convertir el video');
      })
      .run();
  } catch (err) {
    console.error('Error general:', err);
    res.status(500).send('Error al procesar el video');
  }
});

// GET único video
router.get('/file', (req, res) => {
  const { folder, filename } = req.query;

  console.log(`si llegaron los parametros`)

  if (!folder || !filename) {
    return res.status(400).send('Faltan parámetros');
  }

  const safeFolder = path.basename(folder); // evita rutas maliciosas
  const safeFilename = path.basename(filename);
  const videoPath = path.join('C:/videos_guardados', folder, filename);

  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Video no encontrado');
    }
    res.sendFile(videoPath);
  });
});

router.get('/obtener-archivo/:fecha/:placa/:archivo', (req, res) => {
  const { fecha, placa , archivo } = req.params;

  if (!fecha || !placa || !archivo) {
    console.log('faltan archivos')
    return res.status(400).send('Faltan parámetros');
  }

  const videoPath = path.join('C:/videos_guardados', fecha, placa, archivo);

  fs.access(videoPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('Video no encontrado');
    }
    res.sendFile(videoPath);
  });
});

router.use('/videos', express.static('C:/videos_guardados'));

module.exports=router