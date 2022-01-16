/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async addUser(
    @Body('name') userName: string,
    @Body('age') userAge: number,
    @Body('position') userPosition: string,
    @Body('gender') userGender: string,
  ) {
    const generatedId = await this.usersService.insertUser(
      userName,
      userAge,
      userPosition,
      userGender,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getUsers();
    return users;
  }

  @Get(':id')
  getUser(@Param('id') userId: string) {
    return this.usersService.getSingleUser(userId);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body('name') userName: string,
    @Body('age') userAge: number,
    @Body('position') userPosition: string,
    @Body('gender') userGender: string,
  ) {
    await this.usersService.updateUser(
      userId,
      userName,
      userAge,
      userPosition,
      userGender,
    );
    return null;
  }
  @Delete(':id')
  async removeUser(@Param('id') userId: string) {
    await this.usersService.deleteUser(userId);
    return null;
  }
}
