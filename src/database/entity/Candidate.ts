import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterLoad,
} from "typeorm";
import { Vote } from "./Vote";
import { VoteService } from "../../services/vote";

@Entity("candidate")
export class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
  })
  name: string;

  @Column({
    type: "date",
  })
  dob: Date;

  @Column({
    type: "text",
    nullable: true,
  })
  bioLink: string;

  @Column({
    type: "text",
    nullable: true,
  })
  imageLink: string;

  @Column({
    type: "text",
  })
  policy: string;

  @Column({
    type: "integer",
    default: 0,
  })
  votedCount: number;

  @Column({
    type: "boolean",
    default: false,
  })
  disabled: boolean;

  @CreateDateColumn({
    type: "datetime",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "datetime",
  })
  updatedAt: Date;

  @OneToMany(() => Vote, (vote) => vote.candidate)
  vote: Vote[];
}
