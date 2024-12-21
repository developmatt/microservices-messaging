import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  total: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  customerId: string;
}
