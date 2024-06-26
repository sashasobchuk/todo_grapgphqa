import { Test, TestingModule } from '@nestjs/testing';
import { ShapesResolver } from './shapes.resolver';

describe('ShapesResolver', () => {
  let resolver: ShapesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShapesResolver],
    }).compile();

    resolver = module.get<ShapesResolver>(ShapesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
