import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  uuid!: string;

  @Column()
  name!: string;

  @Column()
  phone!: string;

  @Column({ unique: true })
  CPF!: string;

  @Column()
  CEP!: string;

  @Column()
  Street!: string;

  @Column()
  City!: string;

  @Column()
  State!: string;

  @BeforeInsert()
  randomId() {
    this.uuid = uuid();
  }
}
