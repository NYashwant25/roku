import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/user.entity';
import { UserDto } from '../user/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class LoginService {

    constructor(
        @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
        private configService: ConfigService
    ) { }


    async createUser(req: any): Promise<any> {
        const r_email = req.email;
        const r_full_name = req.fname;
        const r_password = req.password;
        if(!r_email || !r_full_name || !r_password) {
            throw new HttpException('Fields missing', HttpStatus.BAD_REQUEST);  
        }
        const user = await this.usersRepository.findOne({ r_email });
        if(user) {
            throw new HttpException('Email ID already Exists', HttpStatus.BAD_REQUEST);
        }
        const userObj = new UserDto();
        userObj.r_email = r_email;
        userObj.r_full_name = r_full_name;
        const hashedPassword = await bcrypt.hash(r_password, 10);
        userObj.r_password = hashedPassword;
        const savedUser = await this.usersRepository.save(userObj);
        return !!savedUser;
    }

    async validateUser(req: any): Promise<any> {
        const r_email = req.email;
        const r_password = req.password;
        
        const user = await this.usersRepository.findOne({ r_email });
        if (!user) {
            throw new HttpException('No Such Users Found', HttpStatus.BAD_REQUEST);
        }
        
        const isValid = await bcrypt.compare(r_password, user.r_password);
        if(isValid) {
            return true;
        }
        
        return false;
    }
}
