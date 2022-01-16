/* eslint-disable prettier/prettier */
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

Injectable();
export class UsersService {
  private users: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(
    name: string,
    age: number,
    position: string,
    gender: string,
  ) {
    const newUser = new this.userModel({
      name: name,
      age: age,
      position: position,
      gender: gender,
    });
    const result = await newUser.save();
    return result.id as string;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      age: user.age,
      position: user.position,
      gender: user.gender,
    }));
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId);
    return {
      id: user.id,
      name: user.name,
      age: user.age,
      position: user.position,
      gender: user.gender,
    };
  }

  async updateUser(
    userId: string,
    name: string,
    age: number,
    position: string,
    gender: string,
  ) {
    const updatedUser = await this.findUser(userId);
    if (name) {
      updatedUser.name = name;
    }
    if (age) {
      updatedUser.age = age;
    }
    if (position) {
      updatedUser.position = position;
    }
    if (gender) {
      updatedUser.gender = gender;
    }
    updatedUser.save();
  }

  async deleteUser(userId: string) {
    await this.userModel.deleteOne({ _id: userId }).exec();
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotAcceptableException('could not find user');
    }
    if (!user) {
      throw new NotAcceptableException('could not find user');
    }
    return user;
  }
}
