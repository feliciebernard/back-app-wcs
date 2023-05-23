import { Resolver, Mutation, Arg, Query, ID } from "type-graphql";
import { Continent, ContinentInput } from "../entities/Continent";
import datasource from "../utils";

@Resolver()
export class ContinentsResolver {
  @Mutation(() => Continent)
  async createContinent(
    @Arg("data", () => ContinentInput) data: ContinentInput
  ): Promise<Continent> {
    return await datasource.getRepository(Continent).save(data);
  }

  @Query(() => [Continent])
  async continents(): Promise<Continent[]> {
    return await datasource
      .getRepository(Continent)
      .find({ relations: { countries: true } });
  }

  @Query(() => Continent, { nullable: true })
  async continent(
    @Arg("code", () => ID) code: string
  ): Promise<Continent | null> {
    return await datasource
      .getRepository(Continent)
      .findOne({ where: { code }, relations: { countries: true } });
  }
}
