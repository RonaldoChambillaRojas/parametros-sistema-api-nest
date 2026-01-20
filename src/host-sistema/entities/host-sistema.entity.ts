import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('hostsistema')
export class HostSistema {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'hostname', type: 'varchar', length: 100, nullable: true })
  hostname: string | null;

  @Column({ name: 'username', type: 'varchar', length: 30, nullable: true })
  username: string | null;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: true, select: false })
  password: string | null;

  @Column({ name: 'port', type: 'varchar', length: 5, nullable: true })
  port: string | null;

  @Column({ name: 'usernameDB', type: 'varchar', length: 30, nullable: true })
  usernameDB: string | null;

  @Column({ name: 'passDB', type: 'varchar', length: 255, nullable: true, select: false })
  passDB: string | null;

  // Campo temporal para almacenar la contraseña plana antes de encriptar
  // No se guarda en la base de datos
  passwordPlain?: string;
  passDBPlain?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPasswords() {
    // Encriptar password si existe y fue modificado
    if (this.passwordPlain) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.passwordPlain, salt);
      delete this.passwordPlain;
    }

    // Encriptar passDB si existe y fue modificado
    if (this.passDBPlain) {
      const salt = await bcrypt.genSalt(10);
      this.passDB = await bcrypt.hash(this.passDBPlain, salt);
      delete this.passDBPlain;
    }
  }
}