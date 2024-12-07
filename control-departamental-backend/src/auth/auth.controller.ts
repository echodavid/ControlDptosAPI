import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Auth, GetRawHeaders, GetUser } from './decorators';
import { VALID_ROLES } from './interfaces';
import { User } from './entities/user.entity';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post('admin/login')
  loginAdmin(@Body() loginUserDto: LoginUserDto) {
    
    return this.authService.loginAdmin(loginUserDto);
  }


  

  @Get('check-auth-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User

  ){
    return this.authService.checkAuthStatus(user);
  }













  // Ejemplo, protegiendo una ruta con un solo rol
  @Get('private3')
  @Auth(VALID_ROLES.ADMIN)
  private3(
    @GetRawHeaders() headers: any,
    @GetUser() user: any
  ){
    return {
      message: 'Hello from auth controller private3',
      ok: true
    }
  }
  
}
