import { Country } from "./entities/Country";
import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "sqlite",
  database: "./countries.db",
  synchronize: true,
  entities: [Country],
  logging: ["query", "error"],
});

export default datasource;
