import { UUID } from '../utils/uuid.type';
import { ObjectLiteral, Repository } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractService<Entity extends ObjectLiteral> {
  protected readonly repository: Repository<Entity>;
  protected readonly logger: Logger;

  protected constructor(protected readonly entityName: string) {
    this.logger = new Logger(`${entityName}Service`);
  }

  async create(partial: Partial<Entity>): Promise<Entity> {
    const res = await this.repository
      .createQueryBuilder()
      .insert()
      .values(partial)
      .execute();
    if (res.identifiers.length === 0)
      throw new Error('Insert executed without affect');
    const uuid = Object.values(res.identifiers[0])[0] as unknown as UUID;
    this.logger.verbose(`Created ${uuid}`);
    return this.getOne(uuid);
  }

  getAll(): Promise<Entity[]> {
    return this.repository.createQueryBuilder().getMany();
  }

  getAllWithDeleted(): Promise<Entity[]> {
    return this.repository.createQueryBuilder().withDeleted().getMany();
  }

  async getOne(uuid: UUID): Promise<Entity> {
    const entity = await this.repository
      .createQueryBuilder()
      .whereInIds(uuid)
      .getOne();
    if (!entity) throw new NotFoundException(uuid);
    return entity;
  }

  async update(uuid: UUID, partial: Partial<Entity>): Promise<Entity> {
    const entity = await this.getOne(uuid);
    const res = await this.repository
      .createQueryBuilder()
      .update()
      .set(partial)
      .whereEntity(entity)
      .execute();
    if (res.affected === 0) throw new Error('Update executed without affect');
    this.logger.verbose(`Updated ${uuid}`);
    return this.getOne(uuid);
  }

  async delete(uuid: UUID) {
    const entity = await this.getOne(uuid);
    const res = await this.repository
      .createQueryBuilder()
      .softDelete()
      .whereEntity(entity)
      .execute();
    if (res.affected === 0) throw new Error('Delete executed without affect');
    this.logger.verbose(`Deleted ${uuid}`);
  }
}
