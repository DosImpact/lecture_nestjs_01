import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

// 가상의 DB를 연결해서 데이터를 리턴해준다.
// 예외를 발생시켜 준다.

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find(e => e.id === +id);
    if (!movie) {
      throw new NotFoundException(`movie ${id} is not found`);
    }
    return movie;
  }

  deleteOne(id: number): boolean {
    this.getOne(id);
    this.movies = this.movies.filter(e => e.id === +id);
    return true;
  }
  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
