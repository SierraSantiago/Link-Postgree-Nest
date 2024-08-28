import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class CreateIngredientDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty({example: 'Carrot, Onion, Fish', 
        description: 'The name of the ingredient'})
    name: string;
    
}
