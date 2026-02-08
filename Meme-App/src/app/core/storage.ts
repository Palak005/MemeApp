const POSTS_KEY = 'meme_posts';
const USER_KEY = 'current_user';
const PREF_KEY = 'meme_preferences';
const LIKES_KEY = 'meme_likes';
const BOOKMARK_KEY = 'meme_bookmarks';

import { Post } from '../models/post.model';

export function seedData() {
  if (!localStorage.getItem(POSTS_KEY)) {
    const initialPosts: Post[] = [
    {
        id: '1',
        author: 'Aman',
        team: 'Frontend',
        title: 'POV:',
        body: 'You fix one CSS bug and the layout breaks in 3 other places.',
        tags: ['css', 'devlife'],
        mood: '😵',
        createdAt: Date.now() - 1000 * 60 * 10
    },
    {
        id: '2',
        author: 'Priya',
        team: 'Backend',
        body: 'console.log("works on my machine")',
        tags: ['backend'],
        mood: '😂',
        createdAt: Date.now() - 1000 * 60 * 45
    },
    {
        id: '3',
        author: 'Rahul',
        team: 'QA',
        title: 'Bug report be like',
        body: 'Steps to reproduce: ||No idea|| Expected: app should work magically',
        tags: ['testing', 'bug'],
        mood: '🫠',
        createdAt: Date.now() - 1000 * 60 * 60 * 3
    },
    {
        id: '4',
        author: 'Sneha',
        team: 'DevOps',
        body: 'Deploying on Friday evening because "it’s a small change" 🤡',
        tags: ['devops', 'deployment'],
        mood: '💀',
        createdAt: Date.now() - 1000 * 60 * 60 * 6
    },
    {
        id: '5',
        author: 'Vikram',
        team: 'Data',
        title: 'Data team starter pack',
        body: '||CSV|| ||Excel|| ||Why is this column named col_final_v3_last??||',
        tags: ['data', 'analytics'],
        mood: '📊',
        createdAt: Date.now() - 1000 * 60 * 60 * 12
    },
    {
        id: '6',
        author: 'Neha',
        team: 'Mobile',
        body: 'Android works. iOS broken. Same code. Same logic. Same tears.',
        tags: ['mobile', 'ios', 'android'],
        mood: '😭',
        createdAt: Date.now() - 1000 * 60 * 60 * 20
    },
    {
        id: '7',
        author: 'Arjun',
        team: 'Security',
        title: 'Security review',
        body: 'Dev: "But it works!"  \nSecurity: "||That’s the problem||"',
        tags: ['security'],
        mood: '🛡️',
        createdAt: Date.now() - 1000 * 60 * 60 * 30
    },
    {
        id: '8',
        author: 'Meera',
        team: 'Product',
        body: 'Can we just add one small feature before release?',
        tags: ['product'],
        mood: '😇',
        createdAt: Date.now() - 1000 * 60 * 60 * 48
    },
    {
        id: '9',
        author: 'Karan',
        team: 'Frontend',
        body: 'When API changes but backend says "no changes from our side" 🙂',
        tags: ['api', 'frontend'],
        mood: '🤡',
        createdAt: Date.now() - 1000 * 60 * 60 * 72
    },
    {
        id: '10',
        author: 'Anita',
        team: 'QA',
        title: 'QA life',
        body: 'Developer: "I tested it" \nQA: "||You opened the app. That’s not testing||"',
        tags: ['qa', 'testing'],
        mood: '🔍',
        createdAt: Date.now() - 1000 * 60 * 60 * 96
    }
    ];


    localStorage.setItem(POSTS_KEY, JSON.stringify(initialPosts));
  }

  if (!localStorage.getItem(USER_KEY)) {
    localStorage.setItem(USER_KEY, JSON.stringify({
      id: 'u1',
      name: 'You',
      team: 'Frontend'
    }));
  }
}

export function getPosts(): Post[] {
  return JSON.parse(localStorage.getItem(POSTS_KEY) || '[]');
}

export function savePosts(posts: Post[]) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function addPost(post: Post) {
  const posts = getPosts();
  posts.unshift(post);
  savePosts(posts);
}

export function getPreferences() {
  return JSON.parse(localStorage.getItem(PREF_KEY) || '{}');
}

export function savePreferences(pref: any) {
  localStorage.setItem(PREF_KEY, JSON.stringify(pref));
}

export function getLikes(): any {
  return JSON.parse(localStorage.getItem(LIKES_KEY) || '{}');
}

export function toggleLike(userId: string, postId: string) {
  const likes = getLikes();
  likes[userId] = likes[userId] || {};
  likes[userId][postId] = !likes[userId][postId];
  localStorage.setItem(LIKES_KEY, JSON.stringify(likes));
}

export function isLiked(userId: string, postId: string) {
  return !!getLikes()?.[userId]?.[postId];
}

export function getBookmarks(): any {
  return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '{}');
}

export function toggleBookmark(userId: string, postId: string) {
  const b = getBookmarks();
  b[userId] = b[userId] || {};
  b[userId][postId] = !b[userId][postId];
  localStorage.setItem(BOOKMARK_KEY, JSON.stringify(b));
}

export function isBookmarked(userId: string, postId: string) {
  return !!getBookmarks()?.[userId]?.[postId];
}

export function getDraftKey(userId: string, postId?: string) {
  return postId ? `draft:${userId}:post:${postId}` : `draft:${userId}:new`;
}

export function saveDraft(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadDraft(key: string) {
  return JSON.parse(localStorage.getItem(key) || 'null');
}

export function clearDraft(key: string) {
  localStorage.removeItem(key);
}

const FLAGS_KEY = 'meme_flags';

export function flagPost(postId: string, reason: string) {
  const flags = JSON.parse(localStorage.getItem(FLAGS_KEY) || '[]');
  flags.push({ postId, reason, status: 'open' });
  localStorage.setItem(FLAGS_KEY, JSON.stringify(flags));
}

