export interface IMattermostNotifier {
  createPost(channelId: string, message: string): Promise<object>;
  createComment(
    channelId: string,
    message: string,
    rootId: string
  ): Promise<object>;
  createReaction(postId: string, emojiName: string): Promise<object>;
}
