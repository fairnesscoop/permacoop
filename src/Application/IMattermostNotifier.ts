export interface IMattermostNotifier {
  createPost(channelId: string, message: string): Promise<any>;
  createComment(
    channelId: string,
    message: string,
    rootId: string
  ): Promise<any>;
  createReaction(postId: string, emojiName: string): Promise<any>;
}
