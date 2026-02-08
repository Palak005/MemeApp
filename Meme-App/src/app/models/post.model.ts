export interface Post {
  id: string;
  author: string;
  team: string;
  title?: string;
  body: string;
  tags: string[];
  mood: string;
  createdAt: number;
}
