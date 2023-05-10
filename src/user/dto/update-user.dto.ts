import { IsNumber, IsOptional, IsString, Matches, Max, Min } from 'class-validator'

export class UpdateUserDto {
    @IsOptional()
    @IsString({
        message: 'First name must be string'
    })
    firstname: string

    @IsOptional()
    @IsString({
        message: 'Last name must be string'
    })
    lastname: string

    @IsOptional()
    @IsNumber({}, {
        message: 'Age must be number'
    })
    @Min(1, {
        message: 'Age must be over 1'
    })
    @Max(100, {
        message: 'Age must be under 1'
    })
    age: number

    @IsOptional()
    @Matches(/^[0-9]{3}:[0-9]{3}$/, {
        message:
            "Coordinate must be format xxx:yyy, x and y must be number form 0 to 9",
    })
    coordinate: string
}