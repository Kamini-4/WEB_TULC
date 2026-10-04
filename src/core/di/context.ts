import { createContext } from 'react';
import { defaultServiceContainer, IServices } from './ServiceContainer';

export const ServiceContext = createContext<IServices>(defaultServiceContainer);
