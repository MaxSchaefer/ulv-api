import { ApiHeaderOptions } from '@nestjs/swagger';

const xGroupKeySwaggerHeader: ApiHeaderOptions = {
  name: 'X-Group-Key',
  description: 'Scope the request by the given key',
};

export default xGroupKeySwaggerHeader;
