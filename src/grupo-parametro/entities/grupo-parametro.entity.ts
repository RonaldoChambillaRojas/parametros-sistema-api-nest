import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('grupoparametro')
export class GrupoParametro {
  @PrimaryGeneratedColumn({ name: 'IdGrupoParametro' })
  idGrupoParametro: number;

  @Column({ name: 'NombreGrupoParametro', type: 'varchar', length: 250 })
  nombreGrupoParametro: string;

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
}