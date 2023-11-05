import {Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {PrismaModule} from "src/prisma/prisma.module";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
	imports: [
		ClientsModule.register([
			{
				name: `AUTH_SERVICE`,
				transport: Transport.REDIS,
				options: {
					host: "localhost",
					port: 6379,
				},
			},
		]),
		PrismaModule,
	],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
