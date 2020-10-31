// import { IsString, IsNumber, IsOptional } from 'class-validator';

// export class CreateMovieDto {
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsOptional()
//   @IsString({ each: true })
//   readonly genres?: string[];
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) { }
