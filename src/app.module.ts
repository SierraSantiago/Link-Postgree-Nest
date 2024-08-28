import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; //access to the TypeORM module
import { ConfigModule } from '@nestjs/config'; //access to the Config module
import { IngredientsModule } from './ingredients/ingredients.module';
import { ImagesModule } from './images/images.module';
import {Image} from './images/entities/image.entity';
import { DishesModule } from './dishes/dishes.module';
import Ingredient from './ingredients/entities/ingredient.entity';

@Module({
  imports: [
    ConfigModule.forRoot(), TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      //entities:[Ingredient, Image]   cuando se usa el autoloadEntities

    }), IngredientsModule, ImagesModule, DishesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
