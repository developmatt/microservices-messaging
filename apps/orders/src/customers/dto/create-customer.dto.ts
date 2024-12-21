import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  externalId: string;
}
