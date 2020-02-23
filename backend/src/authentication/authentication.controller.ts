import {BadRequestException, Body, Controller, Param, Post, UnauthorizedException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
import * as qs from 'qs';
import * as jwt_decode from 'jwt-decode';

@Controller('authentication')
export class AuthenticationController {

    constructor(
        @InjectRepository(User) private readonly usersRepository: Repository<User>
    ) {
    }

    @Post('/register')
    async register(@Body() user: User) {
       const existingUser = await this.usersRepository.count({where: {email: user.email}});
       if (existingUser > 0) {
           throw new BadRequestException('Email address already exists');
       }
       const hash = await bcrypt.hash(user.password, 12);
       user.password = hash;
       await this.usersRepository.save(user);
       return user;
    }

    @Post('/login')
    async login(@Body() user: User) {
        const existingUser = await this.usersRepository.findOne({where: {email: user.email}});
        if (!existingUser) {
            throw new BadRequestException('Invalid credentials');
        }

        const passwordOk = await bcrypt.compare(user.password, existingUser.password);
        if (!passwordOk) {
            throw new BadRequestException('Invalid credentials');
        }

        const accessToken = await jwt.sign({email: existingUser.email, name: existingUser.name}, 'secret');
        return {email: user.email, name: user.name, access_token: accessToken};
    }

    @Post('/authenticate/:provider') async authenticate(@Param('provider') provider: string, @Body() body: any) {
        switch (provider) {
            case 'facebook':
                return await this.loginFacebook(body);
            case 'google':
                return await this.loginGoogle(body);
        }
    }

    async loginFacebook(body: any) {
        const {data} = await axios.post('https://graph.facebook.com/v6.0/oauth/access_token', {
            client_id: body.clientId,
            client_secret: process.env.FB_SECRET,
            code: body.code,
            redirect_uri: body.redirectUri,
        });
        const {data: about} = await axios.get(`https://graph.facebook.com/me?fields=id,name,birthday,email&access_token=${data.access_token}`);
        const accessToken = await jwt.sign({email: about.email, name: about.name}, 'secret');
        return {email: about.email, name: about.name, access_token: accessToken};
    }

    async loginGoogle(body: any) {
        const query = qs.stringify({
            code: body.code,
            client_id: body.clientId,
            client_secret: 'UkAoORDRalYMlL9Vkl_nkYrf',
            grant_type: 'authorization_code',
            redirect_uri: body.redirectUri,
        });
        const {data} = await axios.post('https://oauth2.googleapis.com/token', query,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
        const userInfo = jwt_decode(data.id_token);
        const accessToken = await jwt.sign({email: userInfo.email, name: userInfo.name}, 'secret');
        return {email: userInfo.email, name: userInfo.name, access_token: accessToken};
    }
}
