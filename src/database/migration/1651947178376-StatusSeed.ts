import { MigrationInterface, QueryRunner } from "typeorm";
import { dataSource } from "../../../data-source";
import { statusSeed } from "../seed/status.seed";

export class StatusSeed1651947178376 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await dataSource.getRepository("status").save(statusSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await dataSource.getRepository("status").clear();
  }
}
