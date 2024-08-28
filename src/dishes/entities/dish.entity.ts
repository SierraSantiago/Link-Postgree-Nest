import { IsString, Min, MinLength } from "class-validator";
import { Entity, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "../../ingredients/entities/ingredient.entity";

@Entity()
export class Dish {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @IsString()
    @MinLength(2)
    name: string;  
    @ManyToMany(
        () => Ingredient,
        (ingredient) => ingredient.dishes
    )
    ingredient: Ingredient[];

}
