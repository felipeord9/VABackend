const runCleanup = require('./v1/routes/limpieza');

(async () => {
  try {
    await runCleanup();
    console.log('✅ Limpieza completada correctamente.');
  } catch (err) {
    console.error('❌ Error durante la limpieza:', err);
  }
})();

