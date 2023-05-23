import { Country } from "./entities/Country";
import { Continent } from "./entities/Continent";
import { DataSource } from "typeorm";

const datasource = new DataSource({
  type: "sqlite",
  database: "./countries.db",
  synchronize: true,
  entities: [Country, Continent],
  logging: ["query", "error"],
});

export default datasource;
