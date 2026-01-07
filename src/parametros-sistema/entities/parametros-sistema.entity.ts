import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('parametros_sistema')
export class ParametroSistema {
  @PrimaryGeneratedColumn({ name: 'id_parametro_sistema' })
  idParametroSistema: number;

  @Column({ name: 'nombre_parametro_sistema', length: 100 })
  nombreParametroSistema: string;

  @Column({ name: 'valor_parametro_sistema', type: 'text' })
  valorParametroSistema: string;

  @Column({ name: 'id_grupo_parametro', type: 'int', nullable: true })
  idGrupoParametro: number | null;

  @Column({ name: 'id_entidad_sistema', type: 'int' })
  idEntidadSistema: number;

  @Column({
    name: 'indicador_estado',
    type: 'char',
    length: 1,
    default: 'A',
  })
  indicadorEstado: string;

  @Column({ name: 'usuario_registro', length: 50 })
  usuarioRegistro: string;

  @CreateDateColumn({ name: 'fecha_registro', type: 'datetime' })
  fechaRegistro: Date;

  @Column({ name: 'usuario_modificacion', length: 50, nullable: true })
  usuarioModificacion: string;

  @UpdateDateColumn({
    name: 'fecha_modificacion',
    type: 'datetime',
    nullable: true,
  })
  fechaModificacion: Date;

  @Column({
    name: 'estado_sincronizacion',
    type: 'char',
    length: 1,
    default: 'P',
  })
  estadoSincronizacion: string;
}