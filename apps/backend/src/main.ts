import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import helmet from "helmet";
import {ValidationPipe} from "@nestjs/common";
import cookieParser from "cookie-parser";
import session from "express-session";
import RedisStore from "connect-redis";
import Redis from "ioredis";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import pkg from "../package.json";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require(`dotenv`).config();

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	// Some things
	app.use(cookieParser());

	// Swagger

	const config = new DocumentBuilder()
		.setTitle(`ProFinansy test task`)
		.setVersion(pkg.version)
		.build();
	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup(`api`, app, document);

	// Defence
	app.enableCors({
		origin: `*`,
		credentials: true,
	});
	app.use(helmet());
	app.useGlobalPipes(new ValidationPipe());

	// Session
	const redis = new Redis({
		host: process.env.REDIS_HOST,
	});

	app.use(
		session({
			store: new RedisStore({client: redis}),
			cookie: {
				maxAge: 1000 * 60 * 60 * 24,
			},
			secret: process.env.SESSION_SECRET,
			saveUninitialized: false,
			resave: false,
		})
	);

	// Start app
	await app.listen(3000);
}
bootstrap();
