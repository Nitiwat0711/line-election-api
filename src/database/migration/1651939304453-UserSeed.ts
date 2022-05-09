import { MigrationInterface, QueryRunner } from "typeorm";
import { dataSource } from "../../../data-source";
// import { userSeed } from "../seed/user.seed";

export class UserSeed1651939304453 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await dataSource.getRepository("user").save(userSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await dataSource.getRepository("user").clear();
  }
}
