import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./line-election.db",
  synchronize: false,
  logging: false,
  entities: ["src/database/entity/**/*{.ts, .js}"],
  migrations: ["src/database/migration/**/*{.ts, .js}"],
  subscribers: [],
});
