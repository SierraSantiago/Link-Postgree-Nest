import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './entities/ingredient.entity';
import e from 'express';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private readonly ingredientRepository: Repository<Ingredient>,
  ) {}  
  
  async create(createIngredientDto: CreateIngredientDto) {
    try {
      const Ingredient = this.ingredientRepository.create(createIngredientDto);
      await this.ingredientRepository.save(Ingredient);
      return Ingredient;
    }
    catch (error) {
      throw new InternalServerErrorException('Error creating ingredient');
    }
  }

  async findAll() {
    const ingredients = await this.ingredientRepository.find(
      {
        relations:['images']
      }
    );
    return ingredients;
  }

  async findOne(id: string) {
    const ingredient = this.ingredientRepository.findOneBy({id:id});
    if (!ingredient) {
      throw new InternalServerErrorException('Ingredient not found');
    }
    return ingredient;
  }

   async update(id: string, updateIngredientDto: UpdateIngredientDto) {
    const ingredient = await this.ingredientRepository.preload({
      id:id,
      ...updateIngredientDto,
    });
    if (!ingredient) {
      throw new InternalServerErrorException('Ingredient not found');
    }
    this.ingredientRepository.save(ingredient);

    return `This action updates a #${id} ingredient`;
  }

  async remove(id: string) {
   const ingredient =await this.findOne(id);
    if (!ingredient) {
      throw new InternalServerErrorException('Ingredient not found');
    }
    this.ingredientRepository.delete(ingredient);

    return `This action removes a #${id} ingredient`;
  }
}
