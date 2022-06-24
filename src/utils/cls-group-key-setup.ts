import { ClsService } from 'nestjs-cls';
import { Request } from 'express';

export const CLS_GROUP_KEY = 'group-key';

const clsGroupKeySetupFunction = (
  clsService: ClsService,
  req: Request,
): void => {
  const groupKey = req.header('x-group-key');
  if (groupKey) {
    clsService.set(CLS_GROUP_KEY, groupKey);
  }
};

export default clsGroupKeySetupFunction;
