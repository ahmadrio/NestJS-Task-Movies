import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { apiResponse } from 'src/utils/helpers';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { MoviesProvider } from './movies.provider';

@Controller('movies')
export class MoviesController {
  constructor(private moviesProvider: MoviesProvider) {}

  @Get()
  async findAll() {
    const movies = await this.moviesProvider.findAll();

    return apiResponse(movies, 'Movies fetch successfully', HttpStatus.OK);
  }

  @Post()
  async create(@Body() createMovieDTO: CreateMovieDTO) {
    const movie = await this.moviesProvider.create(createMovieDTO);

    return apiResponse(movie, 'Movie has been created', HttpStatus.CREATED);
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    const movie = await this.moviesProvider.find(id);

    return apiResponse(movie, 'Get movie successfully', HttpStatus.OK);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<UpdateMovieDTO>,
  ) {
    const movie = await this.moviesProvider.update(id, data);

    return apiResponse(movie, 'Movie has been updated', HttpStatus.OK);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.moviesProvider.destroy(id);

    return apiResponse(null, 'Movie has been deleted', HttpStatus.OK);
  }
}
