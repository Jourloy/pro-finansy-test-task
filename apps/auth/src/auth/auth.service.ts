import {Injectable} from "@nestjs/common";
import {CreateAuthDto} from "./dto/create-auth.dto";
import {PrismaService} from "src/prisma/prisma.service";
import jwt from "jsonwebtoken";
import * as fs from "fs";
import crypto from "crypto";

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService) {}

	async create(createAuthDto: CreateAuthDto) {
		const _user = await this.prisma.user.findFirst({where: {username: createAuthDto.username}});
		if (_user) {
			return `User already exist`;
		}

		// Create user
		const user = await this.prisma.user.create({
			data: {
				username: createAuthDto.username,
				password: crypto.createHash(`sha256`).update(createAuthDto.password).digest(`hex`),
			},
		});

		// Read private key
		const key = fs.readFileSync(`./keys/private.key`, `utf8`);

		// Generate jwt token
		const jwtToken = jwt.sign(
			{
				id: user.id,
				username: user.username,
			},
			key,
			{
				algorithm: `RS256`,
				expiresIn: `7d`,
			}
		);

		// Create token
		const token = await this.prisma.token.create({
			data: {
				token: jwtToken,
				userId: user.id,
			},
		});

		return {user, token};
	}
}
