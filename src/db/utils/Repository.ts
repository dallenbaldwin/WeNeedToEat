import { Restaurant } from './../entities/Restaurant.entity';
import { AtHome } from './../entities/AtHome.entity';
import { getRepository } from 'fireorm';

export const atHome = getRepository(AtHome);
export const restaurant = getRepository(Restaurant);
