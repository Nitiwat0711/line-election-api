import { MigrationInterface, QueryRunner } from "typeorm";
import { dataSource } from "../../../data-source";
import { CandidateSeed } from "../seed/candidate.seed";

export class SeedCandidate1651929927419 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await dataSource.getRepository("candidate").save(CandidateSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dataSource.getRepository("candidate").clear();
  }
}
