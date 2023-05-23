import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Country } from "./Country";

@Entity()
@ObjectType()
export class Continent {
  @PrimaryColumn()
  @Field(() => ID)
  code: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Country, (country) => country.continent, {
    onDelete: "CASCADE",
  })
  @Field(() => [Country], { nullable: true })
  countries: Country[];
}

@InputType()
export class ContinentInput {
  @Field(() => ID)
  code: string;

  @Field()
  name: string;
}
