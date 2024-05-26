import { Test, TestingModule } from '@nestjs/testing';
import { DashboardsResolver } from './resolvers/dashboards.resolver';

describe('DashboardsResolver', () => {
  let resolver: DashboardsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardsResolver],
    }).compile();

    resolver = module.get<DashboardsResolver>(DashboardsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
