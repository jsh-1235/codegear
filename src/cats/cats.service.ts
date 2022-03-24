import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
// import { Cat } from './cat.interface';

@Injectable()
export class CatsService {
  // private readonly cats: Cat[] = [];

  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  async findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  async findOne(id: number): Promise<Cat> {
    return this.catsRepository.findOne(id);
  }

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const { name, age, breed } = createCatDto;

    const cat = this.catsRepository.create({
      name,
      age,
      breed,
    });

    await this.catsRepository.save(cat);

    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<void> {
    const found = await this.catsRepository.findOne(id);

    if (found) {
      const { name, age, breed } = updateCatDto;

      found.name = name;
      found.age = age;
      found.breed = breed;

      await this.catsRepository.save(found);

      // await getConnection()
      //   .createQueryBuilder()
      //   .update(Cat)
      //   .set({
      //     name,
      //     age,
      //     breed,
      //   })
      //   .where('id = :id', { id })
      //   .execute();
    } else {
      throw new NotFoundException(`Can't find cat with id ${id}`);
    }
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
