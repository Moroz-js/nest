import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
    constructor(@InjectRepository(MovieEntity) private readonly movieRepository: Repository<MovieEntity>) { }

    async findAll(): Promise<MovieEntity[]> {
        return await this.movieRepository.find({
            where: {
                isAvaliable: true
            },
            order: {
                createdAt: 'DESC'
            }
        })
    }

    async create(dto: MovieDto): Promise<MovieEntity> {
        const movie = this.movieRepository.create(dto);

        return await this.movieRepository.save(movie);
    }

    async findById(id: string): Promise<MovieEntity> {
        const movie = await this.movieRepository.findOne({
            where: {
                id,
            },
        })

        if (!movie) throw new NotFoundException('Не найдено')


        return movie
    }

    async update(id: string, dto: MovieDto): Promise<Boolean> {
        const movie = await this.findById(id);

        Object.assign(movie, dto)

        await this.movieRepository.save(movie)

        return true
    }

    async delete(id: string): Promise<string> {
        const movie = await this.findById(id)

        await this.movieRepository.remove(movie);

        return `Удален фильм ${id}`
    }

}
