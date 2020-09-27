import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

// controller의 역활
// routing + GET/POST/PATCH 등등
// Params/Query/Body + DTO
// Service 연결

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  moviePage(): string {
    return 'movie Page';
  }

  @Get('/all')
  getAllMovie(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('/search')
  searchMovie(@Query('year') year: number): string {
    return `return searched movie ` + year;
  }

  @Get('/:id')
  getOneMovie(@Param('id') id: number): Movie {
    return this.moviesService.getOne(id);
  }

  @Post('/:id')
  create(@Param('id') id: number, @Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  @Patch('/:id')
  patch(@Param('id') id: number, @Body() movieData): string {
    return {
      id,
      ...movieData,
    };
  }
}
