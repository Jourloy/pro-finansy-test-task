import {Body, Controller, Get, Post, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {AuthService} from "./auth.service";
import {CreateAuthDto} from "./dto/create-auth.dto";
import {CurrentUser, ICurrentUser} from "src/decorators/user.decorator";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller(`auth`)
@ApiTags(`auth`)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(`/`)
	@ApiOperation({summary: `Create user`})
	async create(@Body() createAuthDto: CreateAuthDto) {
		return this.authService.create(createAuthDto);
	}

	@Get(`/`)
	@ApiOperation({summary: `Get user data from JWT`})
	async get(@CurrentUser() user: ICurrentUser, @Res() res: Response) {
		res.status(200).json(user);
	}

	@Get(`/session`)
	@ApiOperation({summary: `Get user session`})
	async getSession(@Req() req: Request, @Res() res: Response) {
		res.status(200).json(req.session);
	}
}
