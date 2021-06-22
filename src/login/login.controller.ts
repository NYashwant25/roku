import { Controller, Post, Request } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {

    constructor(private loginService: LoginService) {}
    
    @Post('create')
    async newPassword(@Request() req: any) {
        return this.loginService.createUser(req.body);
    }

    @Post()
    async login(@Request() req: any) {
        return this.loginService.validateUser(req.body);
    }
}
