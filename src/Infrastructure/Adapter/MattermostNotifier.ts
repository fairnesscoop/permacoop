import { HttpService } from '@nestjs/axios';
import { BadGatewayException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IMattermostNotifier } from 'src/Application/IMattermostNotifier';

@Injectable()
export class MattermostNotifier implements IMattermostNotifier {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {}

  public async createPost(channelId: string, message: string): Promise<object> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.configService.get<string>('MATTERMOST_API_URL')}/posts`,
        {
          channel_id: channelId,
          message
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'MATTERMOST_ALFRED_TOKEN'
            )}`
          }
        }
      );

      return response.data;
    } catch (e) {
      throw BadGatewayException;
    }
  }

  public async createComment(
    channelId: string,
    message: string,
    rootId: string
  ): Promise<object> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.configService.get<string>('MATTERMOST_API_URL')}/posts`,
        {
          channel_id: channelId,
          message,
          root_id: rootId
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'MATTERMOST_ALFRED_TOKEN'
            )}`
          }
        }
      );

      console.log(response.data);

      return response.data;
    } catch (e) {
      console.log('--error: ', e);
      throw BadGatewayException;
    }
  }

  public async createReaction(
    postId: string,
    emojiName: string
  ): Promise<object> {
    try {
      const response = await this.httpService.axiosRef.post(
        `${this.configService.get<string>('MATTERMOST_API_URL')}/reactions`,
        {
          post_id: postId,
          emoji_name: emojiName,
          user_id: this.configService.get<string>('MATTERMOST_ALFRED_USER_ID')
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>(
              'MATTERMOST_ALFRED_TOKEN'
            )}`
          }
        }
      );

      return response.data;
    } catch (e) {
      throw BadGatewayException;
    }
  }
}
