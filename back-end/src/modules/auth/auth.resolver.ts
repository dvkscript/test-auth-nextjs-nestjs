import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginEntity } from './entities/login.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { RegisterEntity } from './entities/register.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Mutation(() => LoginEntity, { name: 'login' })
  async login(@Args('body') body: LoginDTO) {
    const data = await this.authService.validateUser(body.email, "");
    console.log(data);
    
    const response = new LoginEntity();
    response.test = "ok";
    return response;
  }

  @Mutation(() => RegisterEntity, { name: 'register' })
  async register(@Args('body') body: RegisterDTO) {
    const result = await this.authService.createUser(body);
    return result
  }

  @Query(() => String)
  hello() {
    return 'Hello, World!';
  }
}
