import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {MicroserviceOptions, Transport} from "@nestjs/microservices";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
		transport: Transport.REDIS,
		options: {
			name: `AUTH_SERVICE`,
			host: process.env.REDIS_HOST,
		},
	});

	await app.listen();
}
bootstrap();
