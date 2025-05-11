import { IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator"

export class MovieDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsInt()
    @IsNotEmpty()
    @Min(1888)
    @Max(new Date().getFullYear())
    release_year: number
    imageUrl: string
    actorsIds: string[]
}