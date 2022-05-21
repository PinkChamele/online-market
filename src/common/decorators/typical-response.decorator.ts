import { getSchemaPath } from '@nestjs/swagger';

const ApiSchema = (dto: string | Function) => ({
  type: 'object',
  properties: {
    data: {
      $ref: getSchemaPath(dto),
    },
  },
});

export default ApiSchema;
