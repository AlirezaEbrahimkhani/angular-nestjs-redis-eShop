import { Injectable } from '@nestjs/common';
import { RedisCacheService } from '../../core';

@Injectable()
export class CustomerService {
  constructor(private readonly redisCacheService: RedisCacheService) {}
}
