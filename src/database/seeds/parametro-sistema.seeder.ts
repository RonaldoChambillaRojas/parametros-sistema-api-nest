import { ParametroSistema } from 'src/parametros-sistema/entities/parametros-sistema.entity';
import { DataSource } from 'typeorm';

export class ParametroSistemaSeeder {
  async run(dataSource: DataSource): Promise<void> {
    const parametroRepository = dataSource.getRepository(ParametroSistema);
    const parametros = [
      {
        nombreParametroSistema: 'URL_API_PRINCIPAL',
        valorParametroSistema: 'https://api.ejemplo.com/v1',
        idGrupoParametro: 1,
        idEntidadSistema: 1,
        indicadorEstado: 'A',
        usuarioRegistro: 'admin',
      },
      {
        nombreParametroSistema: 'TIMEOUT_REQUESTS',
        valorParametroSistema: '30000',
        idGrupoParametro: 1,
        idEntidadSistema: 1,
        indicadorEstado: 'A',
        usuarioRegistro: 'admin',
      },
      {
        nombreParametroSistema: 'MAX_INTENTOS_LOGIN',
        valorParametroSistema: '3',
        idGrupoParametro: 2,
        idEntidadSistema: 1,
        indicadorEstado: 'A',
        usuarioRegistro: 'admin',
      },
      {
        nombreParametroSistema: 'TIEMPO_EXPIRACION_TOKEN',
        valorParametroSistema: '3600',
        idGrupoParametro: 2,
        idEntidadSistema: 1,
        indicadorEstado: 'A',
        usuarioRegistro: 'admin',
      },
      {
        nombreParametroSistema: 'EMAIL_NOTIFICACIONES',
        valorParametroSistema: 'notificaciones@ejemplo.com',
        idGrupoParametro: 3,
        idEntidadSistema: 1,
        indicadorEstado: 'A',
        usuarioRegistro: 'admin',
      },
      {
        nombreParametroSistema: 'HABILITAR_LOGS',
        valorParametroSistema: 'true',
        idGrupoParametro: null,
        idEntidadSistema: 1,
        indicadorEstado: 'A',
        usuarioRegistro: 'admin',
      },
      {
        nombreParametroSistema: 'MODO_MANTENIMIENTO',
        valorParametroSistema: 'false',
        idGrupoParametro: null,
        idEntidadSistema: 1,
        indicadorEstado: 'A',
        usuarioRegistro: 'admin',
      },
      {
        nombreParametroSistema: 'VERSION_APP',
        valorParametroSistema: '1.0.0',
        idGrupoParametro: 4,
        idEntidadSistema: 1,
        indicadorEstado: 'A',
        usuarioRegistro: 'admin',
      },
    ];

    for (const parametroData of parametros) {
      const exists = await parametroRepository.findOne({
        where: { nombreParametroSistema: parametroData.nombreParametroSistema },
      });

      if (!exists) {
        const parametro = parametroRepository.create({
          ...parametroData,
          estadoSincronizacion: 'P',
        });
        await parametroRepository.save(parametro);
        console.log(
          `✓ Parámetro "${parametroData.nombreParametroSistema}" creado`,
        );
      } else {
        console.log(
          `⚠ Parámetro "${parametroData.nombreParametroSistema}" ya existe, omitiendo...`,
        );
      }
    }

    console.log(`\n✅ Seed de parámetros completado. Total: ${parametros.length} parámetros procesados.`);
  }
}