import {Injectable, Logger, NestMiddleware} from "@nestjs/common";
import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import * as fs from "fs";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
	private logger = new Logger(JwtMiddleware.name);

	use(req: Request, res: Response, next: () => void) {
		const cookies = req.cookies;
		const headers = req.headers;

		let jwtToken = null;
		const l = {
			id: ``,
			username: ``,
		};

		if (cookies && cookies[`authorization`]) {
			if (cookies[`authorization`]) {
				jwtToken = cookies[`authorization`];
			}
		} else if (headers && headers[`authorization`]) {
			if (headers[`authorization`]) {
				jwtToken = headers[`authorization`];
			}
		}

		const publicKey = fs.readFileSync(`./keys/public.key.pub`, `utf8`);

		if (jwtToken) {
			try {
				const decode = jwt.verify(jwtToken, publicKey, {algorithms: [`RS256`]});
				l.id = decode[`id`];
				l.username = decode[`username`];
				res.locals = l;
				next();
			} catch (e) {
				this.logger.error(e);
				res.locals = l;
				next();
			}
		} else next();
	}
}
