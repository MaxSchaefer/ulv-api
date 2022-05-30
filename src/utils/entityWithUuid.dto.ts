import { IsUUID } from 'class-validator';
import { UUID } from './uuid.type';

export class EntityWithUuidDto {
  @IsUUID()
  uuid: UUID;
}
