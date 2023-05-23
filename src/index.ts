import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import datasource from "./utils";
import { buildSchema } from "type-graphql";
import { CountriesResolver } from "./resolvers/Country";

const PORT = 5000;

async function bootstrap(): Promise<void> {
  // ... Building schema here
  const schema = await buildSchema({
    resolvers: [CountriesResolver],
    validate: { forbidUnknownValues: false },
  });

  // Create the GraphQL server
  const server = new ApolloServer({
    schema,
  });

  // Start the server
  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);

  try {
    await datasource.initialize();
    console.log("Server started!");
  } catch (err) {
    console.log("An error occured");
    console.error(err);
  }
}

bootstrap();
