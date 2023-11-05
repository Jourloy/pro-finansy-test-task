import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const CurrentUser = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const locals = context.switchToHttp().getResponse().locals;
		const id = locals.id;
		const username = locals.username;
		
		return {id: id, username: username};
	}
);

export interface ICurrentUser {
	id: string;
	username: string;
}