import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Candidate } from "./Candidate";

@Entity("vote")
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    unique: true,
  })
  nationalId: string;

  @Column({
    type: "integer",
  })
  candidateId: number;

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

  @ManyToOne(() => Candidate, (candidate) => candidate.vote)
  candidate: Candidate;
}
