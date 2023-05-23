import { Resolver, Mutation, Arg, Query, ID } from "type-graphql";
import { Country, CountryInput } from "../entities/Country";
import datasource from "../utils";

@Resolver()
export class CountriesResolver {
  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CountryInput) data: CountryInput,
    @Arg("continentID", () => ID) code: string
  ): Promise<Country> {
    return await datasource.getRepository(Country).save(data);
  }

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return await datasource
      .getRepository(Country)
      .find({ relations: { continent: true } });
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code", () => ID) code: string): Promise<Country | null> {
    return await datasource
      .getRepository(Country)
      .findOne({ where: { code }, relations: { continent: true } });
  }
}
