/* this file contain config for enviroment variables */
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();
 
dotenv.config({ path: join(__dirname, `../enviroment/.env.${process.env.NODE_ENV}`) })