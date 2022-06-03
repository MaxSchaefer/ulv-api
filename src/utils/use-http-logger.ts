import { INestApplication, Logger } from '@nestjs/common';
import * as morgan from 'morgan';

const useHttpLogger = (app: INestApplication): void => {
  const httpLogger = new Logger('HTTP');
  app.use(
    morgan('dev', {
      stream: {
        write: (message) => httpLogger.log(message.replace('\n', '')),
      },
    }),
  );
};

export default useHttpLogger;
