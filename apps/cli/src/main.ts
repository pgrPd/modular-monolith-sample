#!/usr/bin/env node

import { CreateUserService, InMemoryUserRepository } from '@myapp/users';
import { CreateOrderService, InMemoryOrderRepository } from '@myapp/orders';

const userRepository = new InMemoryUserRepository();
const createUserService = new CreateUserService(userRepository);

const orderRepository = new InMemoryOrderRepository();
const createOrderService = new CreateOrderService(orderRepository);

async function main() {
  console.log('\n📦 Modular Monolith CLI\n');
  const command = process.argv[2];

  try {
    if (command === 'create-user') {
      const email = process.argv[3] || 'user@example.com';
      const name = process.argv[4] || 'Test User';
      const user = await createUserService.execute(email, name);
      console.log('✅ User created:', user);
    } else if (command === 'list-users') {
      const users = await userRepository.findAll();
      console.log('👥 Users:', users);
    } else if (command === 'create-order') {
      const userId = process.argv[3] || 'user-1';
      const order = await createOrderService.execute(userId);
      console.log('✅ Order created:', order);
    } else if (command === 'help') {
      console.log('Available commands:');
      console.log('  create-user [email] [name]  - Create a new user');
      console.log('  list-users                   - List all users');
      console.log('  create-order [userId]        - Create a new order');
      console.log('  help                         - Show this help message');
    } else {
      console.log('Unknown command. Use "help" to see available commands.');
    }
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
