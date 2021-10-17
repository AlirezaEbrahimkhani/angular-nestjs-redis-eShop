import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../core/services';

@Injectable()
export class ProductService {
  constructor(private readonly redisCacheService: RedisCacheService) {}
}
