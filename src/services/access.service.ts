import { CustomerRepository } from '@/repositories/customer.repository'

type DependencyInjectable = {
  customerRepository: () => typeof CustomerRepository
}

export default class AccessService {
  protected readonly customerRepository: typeof CustomerRepository

  constructor(container: DependencyInjectable) {
    this.customerRepository = container.customerRepository()
  }

  async signUp() {
    return { test: 'test response' }
  }
}
