import { UUID } from '../utils/uuid.type';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { Logger, NotFoundException } from '@nestjs/common';
import { ClsService, ClsServiceManager } from 'nestjs-cls';
import { CLS_GROUP_KEY } from '../utils/cls-group-key-setup';
import { AbstractEntity } from '../entities/abstract.entity';

export abstract class AbstractService<Entity extends AbstractEntity> {
  protected readonly repository: Repository<Entity>;
  protected readonly logger: Logger;
  private readonly clsService: ClsService;

  protected constructor(protected readonly entityName: string) {
    this.logger = new Logger(entityName);
    this.clsService = ClsServiceManager.getClsService();
  }

  protected getQueryBuilder(): SelectQueryBuilder<Entity> {
    const qb = this.repository.createQueryBuilder(this.entityName);
    this.whenGroupKeyIsSetAppendToQueryBuilder(qb);
    return qb;
  }

  protected async save(entity: Entity): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await this.repository.save(entity);
  }

  async create(partial: DeepPartial<Entity>): Promise<Entity> {
    const entity = this.repository.create(partial);
    this.whenGroupKeyIsSetAppendToEntity(entity);
    await this.save(entity);
    this.logger.verbose(`Created ${entity.uuid}`);
    return this.getOne(entity.uuid);
  }

  getAll(): Promise<Entity[]> {
    return this.getQueryBuilder().getMany();
  }

  getAllWithDeleted(): Promise<Entity[]> {
    return this.getQueryBuilder().withDeleted().getMany();
  }

  async getOne(uuid: UUID): Promise<Entity> {
    const entity = await this.getQueryBuilder().andWhereInIds(uuid).getOne();
    if (!entity) throw new NotFoundException(uuid);
    return entity;
  }

  async update(uuid: UUID, partial: DeepPartial<Entity>): Promise<Entity> {
    let entity = await this.getOne(uuid);
    entity = this.repository.merge(entity, partial);
    await this.save(entity);
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

  private whenGroupKeyIsSet(cb: (groupKey: string) => void): void {
    const groupKey = this.clsService.get(CLS_GROUP_KEY);
    if (groupKey) cb(groupKey);
  }

  private whenGroupKeyIsSetAppendToEntity(entity: Entity): void {
    this.whenGroupKeyIsSet((groupKey) => {
      entity.groupKey = groupKey;
    });
  }

  private whenGroupKeyIsSetAppendToQueryBuilder(
    qb: SelectQueryBuilder<Entity>,
  ): void {
    this.whenGroupKeyIsSet((groupKey) => {
      qb.andWhere(`${this.entityName}.groupKey = :groupKey`, {
        groupKey: groupKey,
      });
    });
  }
}
