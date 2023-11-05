import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

	constructor(@Inject(`AUTH_SERVICE`) private client: ClientProxy) {}

	public async create(createAuthDto: CreateAuthDto) {
		return this.client.send('createUser', createAuthDto);
	}
}
