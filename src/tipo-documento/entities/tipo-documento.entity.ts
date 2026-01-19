import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipodocumento')
export class TipoDocumento {
  @PrimaryGeneratedColumn({ name: 'IdTipoDocumento' })
  idTipoDocumento: number;

  @Column({ name: 'CodigoTipoDocumento', type: 'varchar', length: 2 })
  codigoTipoDocumento: string;

  @Column({ name: 'NombreAbreviado', type: 'varchar', length: 10, nullable: true })
  nombreAbreviado: string | null;

  @Column({ name: 'NombreTipoDocumento', type: 'varchar', length: 255 })
  nombreTipoDocumento: string;

  @Column({ name: 'IndicadorDocumentoReporteCompra', type: 'varchar', length: 1, default: '1' })
  indicadorDocumentoReporteCompra: string;

  @Column({ name: 'IndicadorGeneraDeudaContado', type: 'char', length: 1, default: '0' })
  indicadorGeneraDeudaContado: string;

  @Column({ name: 'IndicadorEstado', type: 'varchar', length: 1, default: 'A' })
  indicadorEstado: string;

  @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50 })
  usuarioRegistro: string;

  @Column({ name: 'FechaRegistro', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro: Date;

  @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 50, nullable: true })
  usuarioModificacion: string | null;

  @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
  fechaModificacion: Date | null;

  @Column({ name: 'IndicadorEnvioAutomaticoSUNAT', type: 'varchar', length: 1, default: '0' })
  indicadorEnvioAutomaticoSUNAT: string;

  @Column({ name: 'CantidadImpresiones', type: 'int', default: 0, nullable: true })
  cantidadImpresiones: number | null;

  @Column({ name: 'LongitudSerieDocumento', type: 'varchar', length: 5, default: '4' })
  longitudSerieDocumento: string;

  @Column({ name: 'IdMonedaPorDefecto', type: 'int', default: 1 })
  idMonedaPorDefecto: number;

  @Column({ name: 'IndicadorDocumentoUsadoImportacion', type: 'char', length: 1, default: '0' })
  indicadorDocumentoUsadoImportacion: string;

  @Column({ name: 'TiposDocumentoIngresoVenta', type: 'varchar', length: 40, default: '' })
  tiposDocumentoIngresoVenta: string;

  @Column({ name: 'NombreCortoTipoDocumento', type: 'varchar', length: 20, default: '' })
  nombreCortoTipoDocumento: string;

  @Column({ name: 'IndicadorTipoDocumentoCanje', type: 'varchar', length: 1, default: '0' })
  indicadorTipoDocumentoCanje: string;

  @Column({ name: 'NombreTipoDocumentoImpreso', type: 'varchar', length: 100, default: '' })
  nombreTipoDocumentoImpreso: string;

  @Column({ name: 'IndicadorPrecioUnitarioMN', type: 'char', length: 1, default: '0' })
  indicadorPrecioUnitarioMN: string;

  @Column({ name: 'IndicadorDocumentoElectronico', type: 'varchar', length: 1, default: '0' })
  indicadorDocumentoElectronico: string;
}