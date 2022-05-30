import { UUID } from '../utils/uuid.type';
import {
  DeepPartial,
  ObjectLiteral,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractService<Entity extends ObjectLiteral> {
  protected readonly repository: Repository<Entity>;
  protected readonly logger: Logger;

  protected constructor(protected readonly entityName: string) {
    this.logger = new Logger(entityName);
  }

  protected getQueryBuilder(): SelectQueryBuilder<Entity> {
    return this.repository.createQueryBuilder(this.entityName);
  }

  async create(partial: DeepPartial<Entity>): Promise<Entity> {
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
    return this.getQueryBuilder().getMany();
  }

  getAllWithDeleted(): Promise<Entity[]> {
    return this.getQueryBuilder().withDeleted().getMany();
  }

  async getOne(uuid: UUID): Promise<Entity> {
    const entity = await this.getQueryBuilder().whereInIds(uuid).getOne();
    if (!entity) throw new NotFoundException(uuid);
    return entity;
  }

  async update(uuid: UUID, partial: DeepPartial<Entity>): Promise<Entity> {
    let entity = await this.getOne(uuid);
    entity = Object.assign(entity, partial);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.repository.save(entity);
    await this.logger.verbose(`Updated ${uuid}`);
    return this.getOne(uuid);
  }

  async delete(uuid: UUID): Promise<void> {
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
