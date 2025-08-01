const express = require('express');
const multer = require('multer');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path');
const mailService = require("../../services/mailService");
const { config } = require("../../config/config");
const nodemailer = require("nodemailer");

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
        // ⚠️ En caso de error, también intenta limpiar
        fs.unlink(inputPath, () => {}); // Silencioso
        res.status(500).send('Error al convertir el video');
      })
      .run();
  } catch (err) {
    console.error('Error general:', err);
    // ⚠️ Limpieza de emergencia si se captura un error
    fs.unlink(inputPath, () => {});
    res.status(500).send('Error al procesar el video');
  }
});

router.post('/qr/record', upload.single('video'), async (req, res) => {
  console.log('entro a la ruta');
  const placa = req.body.placa;
  const createdAt = req.body.createdAt;

  if (!req.file) {
    return res.status(400).send('No se recibió ningún archivo');
  }

  const inputPath = req.file.path;
  const outputFileName = `videoQR_${createdAt}.webm`;

  try{
    
    /* const transporter = await mailService.sendEmails(); */
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: true,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      }
    })

    if(!transporter) throw new Error('Error al conectar con el servidor de correo')

    transporter.sendMail(
      {
        from: config.smtpEmail,
        to: 'sistemas2@granlangostino.net',
        /* cc: body?.user.email, */
        subject: "¡VÍDEO PARA QR!",
        attachments: [
          {
            filename: outputFileName,
            path: inputPath,
          },
        ],
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
              <link
                href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;700;900&display=swap"
                rel="stylesheet"
              />
              <title>VÍDEO GENERADO</title>
              <style>
                body {
                  font-family: Arial, sans-serif;;
                  line-height: 1.5;
                  color: #333;
                  margin: 0;
                  padding: 0;
                }
          
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  border: 1px solid #ccc;
                  border-radius: 5px;
                }
          
                .header {
                  background-color: #145a83;
                  padding: 5px;
                  text-align: center;
                }
          
                .header h1 {
                  color: #fff;
                  font-size: medium;
                  margin: 0;
                }
          
                .invoice-details {
                  margin-top: 20px;
                }
          
                .invoice-details p {
                  margin: 0;
                }
          
                .logo {
                  text-align: right;
                }
          
                .logo img {
                  max-width: 200px;
                }
          
                .invoice-table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
          
                .invoice-table th,
                .invoice-table td {
                  padding: 10px;
                  border: 1px solid #ccc;
                  text-align: center;
                }
          
                .invoice-table th {
                  background-color: #f1f1f1;
                }
          
                .warning {
                  text-align: center;
                  margin-top: 20px;
                }
          
                .warning p {
                  margin: 0;
                }
          
                .att {
                  text-align: center;
                  margin-top: 20px;
                }
          
                .att p {
                  margin: 0;
                }
          
                .att a {
                  text-decoration: none;
                }
          
                .footer {
                  margin-top: 20px;
                  text-align: center;
                  color: #888;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>¡VÍDEO PARA QR!</h1>
                </div>
                <div class="warning">
                  <b>Ha sido generado un vídeo para un QR del vehículo con placas: ${placa}, el día: ${createdAt}, adjunto podrá visualizarlo.</b>                  
                </div>
          
                <div class="warning">
                  <p><strong>Por favor revisar los archivos antes de cualquier acción.</strong></p>
                </div>
          
                <div class="footer">
                  <p><u>Aviso Legal</u></p>
                  <p>
                    SU CORREO LO TENEMOS REGISTRADO DENTRO DE NUESTRA BASE DE
                    DATOS COMO CORREO/CONTACTO (DATO PÚBLICO), POR LO TANTO,
                    SI NO DESEA SEGUIR RECIBIENDO INFORMACIÓN DE NUESTRA EMPRESA, LE
                    AGRADECEMOS NOS INFORME AL RESPECTO.</p>
                  <p> El contenido de este mensaje de
                    correo electrónico y todos los archivos adjuntos a éste contienen
                    información de carácter confidencial y/o uso privativo de VIDRIOS &
                    ACCESORIOS y de sus destinatarios. Si usted recibió este mensaje
                    por error, por favor elimínelo y comuníquese con el remitente para
                    informarle de este hecho, absteniéndose de divulgar o hacer cualquier
                    copia de la información ahí contenida, gracias. En caso contrario
                    podrá ser objeto de sanciones legales conforme a la ley 1273 de 2009.
                  </p>
                </div>
              </div>
            </body>
          </html>
          
          `,
        },
        (error, info) => {
          if (error) {
            next(error);
          } else {
            console.log(info)
            fs.unlinkSync(inputPath); // Elimina el archivo .webm temporal
            res.json({
              info,
            });
            res.status(200).send('Video subido y guardado como .webm correctamente');
          }
        }
      );

  } catch (err) {
    console.error('Error general:', err);
    // ⚠️ Limpieza de emergencia si se captura un error
    fs.unlink(inputPath, () => {});
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