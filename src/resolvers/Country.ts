import { Resolver, Mutation, Arg, Query, ID } from "type-graphql";
import { Continent } from "../entities/Continent";
import { Country, CountryInput } from "../entities/Country";
import datasource from "../utils";

@Resolver()
export class CountriesResolver {
  @Mutation(() => Country)
  async createCountry(
    @Arg("data", () => CountryInput) data: CountryInput
  ): Promise<Country> {
    const continent = await datasource.getRepository(Continent).findOne({
      where: { code: data.continentCode },
    });

    if (!continent) {
      throw new Error("Continent not found");
    }

    const country = new Country();
    country.code = data.code;
    country.name = data.name;
    country.emoji = data.emoji;
    country.continent = continent;

    return await datasource.getRepository(Country).save(country);
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
