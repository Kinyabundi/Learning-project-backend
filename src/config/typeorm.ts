import * as path from "path";
import { registerAs } from "@nestjs/config";
import { DataSource, DataSourceOptions } from "typeorm";
import { POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER } from "../env";


const config = {
	type: "postgres",
	host: POSTGRES_HOST,
	port: Number(POSTGRES_PORT),
	username: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DB,
	entities: [path.join(__dirname, "../**/*.entity{.ts,.js}")],
	migrations: [path.join(__dirname, "../../migrations/*{.ts,.js}")],
	synchronize: false,
	logging: false,
} satisfies DataSourceOptions;

export default registerAs("typeorm", () => config);

export const connectionSource = new DataSource(config);
