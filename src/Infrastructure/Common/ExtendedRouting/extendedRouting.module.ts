import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { RouteNameResolver } from './RouteNameResolver';

@Module({
  imports: [DiscoveryModule],
  providers: [RouteNameResolver],
  exports: [RouteNameResolver]
})
export class ExtendedRoutingModule {}
