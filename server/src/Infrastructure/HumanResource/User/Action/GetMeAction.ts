import {Controller, Get, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {LoggedUser} from '../Decorator/LoggedUser';
import {User} from 'src/Domain/HumanResource/User/User.entity';
import {UserView} from 'src/Application/HumanResource/User/View/UserView';

@Controller('users')
@ApiTags('Human Resource')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'))
export class GetMeAction {
  @Get('me')
  @ApiOperation({summary: 'Get current user'})
  public async index(@LoggedUser() user: User): Promise<UserView> {
    return new UserView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getRole(),
      false
    );
  }
}
