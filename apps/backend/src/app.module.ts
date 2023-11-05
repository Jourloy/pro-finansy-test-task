import {MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthModule} from "./auth/auth.module";
import {JwtMiddleware} from "./middlewares/jwt.middleware";

@Module({
	imports: [AuthModule],
	controllers: [],
	providers: [],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes(`*`);
	}
}
