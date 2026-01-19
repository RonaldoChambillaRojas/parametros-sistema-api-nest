import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { ElementoEntidad } from '../../elemento-entidad/entities/elemento-entidad.entity';

@Entity('entidadsistema')
export class EntidadSistema {
  @PrimaryGeneratedColumn({ name: 'IdEntidadSistema' })
  idEntidadSistema: number;

  @Column({ name: 'NombreEntidadSistema', type: 'varchar', length: 50 })
  nombreEntidadSistema: string;

  @Column({ name: 'IndicadorEstado', type: 'varchar', length: 1 })
  indicadorEstado: string;

  @Column({ name: 'IdModuloSistema', type: 'int' })
  idModuloSistema: number;

  @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50 })
  usuarioRegistro: string;

  @Column({ name: 'FechaRegistro', type: 'datetime' })
  fechaRegistro: Date;

  @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 50, nullable: true })
  usuarioModificacion: string | null;

  @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
  fechaModificacion: Date | null;

  @Column({ name: 'UltimaFechaDescarga', type: 'datetime', nullable: true })
  ultimaFechaDescarga: Date | null;

  @Column({ name: 'UltimaFechaSubida', type: 'datetime', nullable: true })
  ultimaFechaSubida: Date | null;

  @Column({ name: 'NumeroRegistrosPendientesIteracion', type: 'int', default: 0 })
  numeroRegistrosPendientesIteracion: number;

  @Column({ name: 'NumeroRegistrosPendientesSincronizacion', type: 'int', default: 0 })
  numeroRegistrosPendientesSincronizacion: number;

  @Column({ name: 'ModoSincronizacion', type: 'char', length: 1, default: '2' })
  modoSincronizacion: string;

  @Column({ name: 'NumeroFilasPorPagina', type: 'int', default: 20 })
  numeroFilasPorPagina: number;

  @Column({ name: 'EstadoImportacion', type: 'varchar', length: 1, default: '0' })
  estadoImportacion: string;

  @Column({ name: 'NombrePlantillaImportacion', type: 'varchar', length: 80, default: '' })
  nombrePlantillaImportacion: string;

  // Relación con ElementoEntidad
  @OneToMany(() => ElementoEntidad, (elemento) => elemento.entidad)
  elementos?: ElementoEntidad[];
}