import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
} from "typeorm";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { Continent } from "./Continent";

@Entity()
@ObjectType()
export class Country {
  @PrimaryColumn()
  @Field(() => ID)
  code: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  emoji: string;

  @ManyToOne(() => Continent, (continent) => continent.countries, {
    onDelete: "CASCADE",
  })
  @Field(() => Continent, { nullable: true })
  continent: Continent;
}

@InputType()
export class CountryInput {
  @Field(() => ID)
  code: string;

  @Field()
  name: string;

  @Field()
  emoji: string;
}
