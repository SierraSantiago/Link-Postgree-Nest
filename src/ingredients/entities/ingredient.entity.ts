import { Image } from 'src/images/entities/image.entity';
import { Dish } from 'src/dishes/entities/dish.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('text',
        { 
            unique: true
        }
    )
        name: string;
        @OneToMany(
            () => Image,
            (image) => image.ingredient,
            {cascade: true,
            eager: true
            }
        )
        images?: Image[];           
        @ManyToMany(
            () => Dish,
            (dish) => dish.ingredient
        )
        dishes: Dish[];
}
export default Ingredient;