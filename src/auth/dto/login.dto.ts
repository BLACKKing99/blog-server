/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty } from 'class-validator';

export default class LoginDto {
    @IsNotEmpty()
    account: number;
    @IsNotEmpty()
    password: string;
}
