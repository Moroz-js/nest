import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovieDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
    constructor(private readonly prismaService: PrismaService) { }

    async findAll() {
        return await this.prismaService.movie.findMany({
            where: {
                isAvailable: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                title: true,
                actors: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
        })
    }

    async create(dto: MovieDto): Promise<Movie> {
        const { title, release_year, imageUrl, actorsIds } = dto

        const actors = await this.prismaService.actor.findMany({
            where: {
                id: { in: actorsIds }
            }
        })

        if (!actors || !actors.length) throw new NotFoundException('Не найдено')

        const movie = await this.prismaService.movie.create({
            data: {
                title: title,
                releaseYear: release_year,
                poster: imageUrl ? {
                    create: {
                        url: imageUrl
                    }
                } : undefined,
                actors: {
                    connect: actors.map(actor => ({
                        id: actor.id
                    }))
                }
            }
        })

        return movie
    }

    async findById(id: string): Promise<Movie> {
        const movie = await this.prismaService.movie.findUnique({
            where: {
                id,
            },
            include: {
                actors: true,
                poster: true
            }
        })

        if (!movie || !movie.isAvailable) throw new NotFoundException('Не найдено')

        return movie
    }

    async update(id: string, dto: MovieDto): Promise<Boolean> {
        const movie = await this.findById(id);

        const actors = await this.prismaService.actor.findMany({
            where: {
                id: { in: dto.actorsIds }
            }
        })

        if (!actors || !actors.length) throw new NotFoundException('Не найдено')

        await this.prismaService.movie.update({
            where: {
                id: movie.id
            },
            data: {
                ...dto,
                poster: dto.imageUrl ? {
                    create: {
                        url: dto.imageUrl
                    }
                } : undefined,
                actors: {
                    connect: actors.map(actor => ({
                        id: actor.id
                    }))
                }
            }
        })

        return true
    }

    async delete(id: string): Promise<string> {
        const movie = await this.findById(id)

        this.prismaService.movie.delete({
            where: {
                id: movie.id
            }
        })

        return `Удален фильм ${id}`
    }

}
