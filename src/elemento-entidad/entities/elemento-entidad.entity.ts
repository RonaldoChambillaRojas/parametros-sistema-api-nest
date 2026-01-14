import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EntidadSistema } from '../../entidad-sistema/entities/entidad-sistema.entity';

@Entity('elementoentidad')
export class ElementoEntidad {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;

  @Column({ name: 'IdEntidad', type: 'int' })
  idEntidad: number;

  @Column({ name: 'NombreElemento', type: 'varchar', length: 50 })
  nombreElemento: string;

  @Column({ name: 'Visible', type: 'varchar', length: 1, default: '1' })
  visible: string;

  @Column({ name: 'Editable', type: 'varchar', length: 1, default: '1' })
  editable: string;

  @Column({ name: 'IndicadorEstado', type: 'varchar', length: 1, default: 'A' })
  indicadorEstado: string;

  @Column({ name: 'UsuarioRegistro', type: 'varchar', length: 50 })
  usuarioRegistro: string;

  @Column({ name: 'FechaRegistro', type: 'datetime', nullable: true })
  fechaRegistro: Date | null;

  @Column({ name: 'UsuarioModificacion', type: 'varchar', length: 50, nullable: true })
  usuarioModificacion: string | null;

  @Column({ name: 'FechaModificacion', type: 'datetime', nullable: true })
  fechaModificacion: Date | null;

  // Relación con EntidadSistema (sin foreign key en BD)
  @ManyToOne(() => EntidadSistema, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'IdEntidad', referencedColumnName: 'idEntidadSistema' })
  entidad?: EntidadSistema;
}