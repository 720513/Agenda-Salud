const cron = require('node-cron');
const db = require('./config/db');
const transporter = require('./mailer');
//Funcion para recordatorios
cron.schedule('0 8,20 * * * ', async () => {
    console.log('---[SISTEMA] Iniciando envio de recordatorios (8 AM / 8 PM) ---');
    try {
        const sql = `
        SELECT  c.id_cita, c.hora, up.nombre, up.correo
        FROM cita c
        INNER JOIN paciente p ON c.id_paciente = p.id_paciente
        INNER JOIN usuario up ON p.id_usuario = up.id_usuario
        WHERE c.fecha = CURDATE() + INTERVAL 1 DAY AND c.recordatorio_enviado = 0`;
        const [citas] = await db.query(sql);
        if (citas.length > 0) {
            console.log(`Se encontraron ${citas.length} citas para mañana.`);
            for (const cita of citas) {
                const mailOptions = {
                    from: '"Centro Medico Agenda Salud" <tu-correo@gmail.com>',
                    to: cita.correo,
                    subject: 'Recordatorio de Cita Medica',
                    text: `Hola ${cita.nombre}, recuerda tu cita de mañana a las ${cita.hora}.`
               };
               try {
                await transporter.sendMail(mailOptions);
                console.log(`Correo enviado con exito a: ${cita.correo}`);
                const updateSql = "UPDATE cita SET recordatorio_enviado = 1 WHERE id_cita = ?";
                await db.query(updateSql, [cita.id_cita]);
                console.log(`Cita ${cita.id_cita} marcada como notificada.`);
             } catch (envioError) {
                console.error(`Error al procesar cita ${cita.id_cita}:`, envioError.message);
             }
        }
      } else {
        console.log('No hay citas pendientes para mañana en este horario.');
      }
    } catch (errorGeneral) {
        console.error('Error general en el proceso de recordatorios:', errorGeneral.message);
    }
    console.log('--- [SISTEMA] Proceso finalizado ---');
});