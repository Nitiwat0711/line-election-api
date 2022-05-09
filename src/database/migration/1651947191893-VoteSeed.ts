import { MigrationInterface, QueryRunner } from "typeorm";
import { dataSource } from "../../../data-source";
import { voteSeedValue } from "../seed/vote.seed";

export class VoteSeed1651947191893 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await dataSource.getRepository("vote").save(voteSeedValue);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dataSource.getRepository("vote").clear();
  }
}
