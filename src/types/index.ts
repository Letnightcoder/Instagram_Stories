export interface Story {
  id: string;
  username: string;
  userImage: string;
  image: string;
  viewed: boolean;
}

export interface StoryGroup {
  userId: string;
  username: string;
  userImage: string;
  stories: Story[];
}