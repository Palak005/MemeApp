import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models/post.model';
import { toggleLike, isLiked, toggleBookmark, isBookmarked, getPosts, savePosts, flagPost } from '../../core/storage';
import { UiButtonComponent } from '../../shared/ui-button/ui-button.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  imports: [UiButtonComponent, NgIf, NgFor],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})

export class PostDetailComponent {
  @Input() post!: Post;
  @Output() close = new EventEmitter<void>();
  spoilersExpanded: boolean[] = [];

  ngOnChanges() {
    if (this.post) {
      const spoilerCount = (this.post.body.match(/\|\|/g) || []).length / 2;
      this.spoilersExpanded = new Array(spoilerCount).fill(false);
    }
  }

  getSegments() {
    const parts = this.post.body.split('||');
    return parts.map((part, index) => ({
      text: part,
      isSpoiler: index % 2 === 1,
      spoilerIndex: Math.floor(index / 2)
    }));
  }

  userId = 'u1';

  likePost() {
    toggleLike(this.userId, this.post.id);
  }

  bookmarkPost() {
    toggleBookmark(this.userId, this.post.id);
  }

  liked() {
    return isLiked(this.userId, this.post.id);
  }

  bookmarked() {
    return isBookmarked(this.userId, this.post.id);
  }

  deletePost() {
    const posts = getPosts().filter(p => p.id !== this.post.id);
    savePosts(posts);
    this.close.emit();
  }

  reportPost() {
    flagPost(this.post.id, 'Inappropriate');
    alert('Reported');
  }

  expandAll() {
    this.spoilersExpanded.fill(true);
  }

  collapseAll() {
    this.spoilersExpanded.fill(false);
  }

  copyLink() {
    const token = `meme-${this.post.id}`;
    navigator.clipboard.writeText(token);
    alert('Link copied!');
  }
}
