import { IsString, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly to: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly subject: object;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly attachment: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly isHTML: boolean;
}
