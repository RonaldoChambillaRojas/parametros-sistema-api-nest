import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('parametrosistema')
export class ParametroSistema {
  @PrimaryGeneratedColumn({ name: 'IdParametroSistema' })
  idParametroSistema: number;

  @Column({ name: 'NombreParametroSistema', type: 'varchar', length: 250 })
  nombreParametroSistema: string;

  @Column({ name: 'ValorParametroSistema', type: 'varchar', length: 250 })
  valorParametroSistema: string;

  @Column({ name: 'IdGrupoParametro', type: 'int', nullable: true })
  idGrupoParametro: number | null;

  @Column({ name: 'IdEntidadSistema', type: 'int' })
  idEntidadSistema: number;

  @Column({
    name: 'IndicadorEstado',
    type: 'varchar',
    length: 1,
  })
  indicadorEstado: string;

  @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50 })
  usuarioRegistro: string;

  @Column({ name: 'FechaRegistro', type: 'datetime' })
  fechaRegistro: Date;

  @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 50, nullable: true })
  usuarioModificacion: string | null;

  @Column({
    name: 'FechaModificacion',
    type: 'datetime',
    nullable: true,
  })
  fechaModificacion: Date | null;

  @Column({
    name: 'EstadoSincronizacion',
    type: 'char',
    length: 1,
    default: '0',
  })
  estadoSincronizacion: string;
}