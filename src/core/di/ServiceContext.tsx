/**
 * Service Provider Component
 * SOLID: Dependency Inversion Principle
 */

import React, { ReactNode, useMemo } from 'react';
import { defaultServiceContainer, IServices, ServiceContainer } from './ServiceContainer';
import { ServiceContext } from './context';

export interface ServiceProviderProps {
  children: ReactNode;
  services?: Partial<IServices>;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({ children, services }) => {
  const container = useMemo(() => {
    return services ? new ServiceContainer(services) : defaultServiceContainer;
  }, [services]);

  return (
    <ServiceContext.Provider value={container}>
      {children}
    </ServiceContext.Provider>
  );
};
