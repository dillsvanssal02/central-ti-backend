import {
  IsString,
  IsObject,
  IsNotEmpty,
  IsNotEmptyObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShodanDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly alert_id: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmptyObject()
  readonly banner: object;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly timestamp: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly trigger: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly trigger_description: string;
}
