require('dotenv').config({ path: `.env` });

import config from '../../database.config';

export default {
    ...config,
    ...{
        migrations: ['src/migrations/**/*.ts'],
    },
};
