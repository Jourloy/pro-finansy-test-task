import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {ClientsModule, Transport} from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: `AUTH_SERVICE`,
				transport: Transport.REDIS,
				options: {
					host: `redis`, // If async, use host: process.env.REDIS_HOST
				},
			},
		]),
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
