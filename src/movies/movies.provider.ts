import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { MoviesDTO } from './dto/movies.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MovieEntity } from './movie.entity';

@Injectable()
export class MoviesProvider {
  constructor(
    @InjectRepository(MovieEntity)
    private moviesRepository: Repository<MovieEntity>,
  ) {}

  async findAll(): Promise<MoviesDTO[]> {
    return await this.moviesRepository.find();
  }

  async create(data: CreateMovieDTO): Promise<MoviesDTO> {
    return this.moviesRepository.save(data);
  }

  async find(id: number): Promise<MoviesDTO> {
    return await this.moviesRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, data: Partial<UpdateMovieDTO>): Promise<MoviesDTO> {
    await this.moviesRepository.update({ id }, data);

    return this.find(id);
  }

  async destroy(id: number) {
    return await this.moviesRepository.delete({ id });
  }
}
