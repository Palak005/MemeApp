import { Component, OnInit } from '@angular/core';
import { UiButtonComponent } from '../../shared/ui-button/ui-button.component';
import { UiCardComponent } from '../../shared/ui-card/ui-card.component';
import { UiInputComponent } from '../../shared/ui-input/ui-input.component';
import { Post } from '../../models/post.model';
import { getPosts, isBookmarked, isLiked } from '../../core/storage';
import { UiTagComponent } from '../../shared/ui-tag/ui-tag.component';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { getPreferences, savePreferences } from '../../core/storage';
import { PostDetailComponent } from '../../modals/post-detail/post-detail.component';
import { PostComposerComponent } from '../../modals/post-composer/post-composer.component';
import { timeAgo } from '../../core/time.util';

@Component({
  selector: 'app-feed',
  imports: [PostComposerComponent, UiButtonComponent, UiCardComponent, UiInputComponent, UiTagComponent, NgFor,NgIf, DatePipe, PostDetailComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})

export class FeedComponent implements OnInit {
  timeAgo = timeAgo;
  sortOrder: 'newest' | 'oldest' = 'newest';
  selectedTeam = '';
  selectedMood = '';
  selectedTags: string[] = [];
  likedOnly = false;

  posts: Post[] = [];
  filteredPosts: Post[] = [];
  searchText = '';
  selectedPost: Post | null = null;

  openPost(post: Post) {
    this.selectedPost = post;
  }

  closePost() {
    this.selectedPost = null;
  }

  loadPosts() {
    this.posts = getPosts();
    this.applyFilters();
  }

  applyFilters() {
    const text = this.searchText.toLowerCase().trim();

    let result = this.posts.filter(post => {
      const title = post.title?.toLowerCase() || '';
      const body = post.body.toLowerCase();
      return title.includes(text) || body.includes(text);
    });

    if (this.selectedTeam) {
      result = result.filter(p => p.team === this.selectedTeam);
    }

    if (this.selectedMood) {
      result = result.filter(p => p.mood === this.selectedMood);
    }

    if (this.selectedTags.length) {
      result = result.filter(p =>
        this.selectedTags.every(tag => p.tags.includes(tag))
      );
    }

    if (this.savedOnly) {
      result = result.filter(p => isBookmarked('u1', p.id));
    }

    if (this.likedOnly) {
      result = result.filter(p => isLiked('u1', p.id));
    }


    // SORTING
    result.sort((a, b) => {
      return this.sortOrder === 'newest'
        ? b.createdAt - a.createdAt
        : a.createdAt - b.createdAt;
    });

    if (this.savedOnly) {
      result = result.filter(p => isBookmarked('u1', p.id));
    }

    savePreferences({
      sortOrder: this.sortOrder,
      selectedTeam: this.selectedTeam,
      selectedMood: this.selectedMood
    });

    this.filteredPosts = result;
  }

  onSearchChange() {
    this.applyFilters();
  }

  ngOnInit() {
    const pref = getPreferences();
    this.sortOrder = pref.sortOrder || 'newest';
    Object.assign(this, pref);
    this.loadPosts();
  }

  toggleSort() {
    this.sortOrder = this.sortOrder === 'newest' ? 'oldest' : 'newest';
    savePreferences({ sortOrder: this.sortOrder });
    this.applyFilters();
  }
  showComposer = false;

  openComposer() {
    this.showComposer = true;
  }

  closeComposer() {
    this.showComposer = false;
    this.loadPosts(); // refresh feed after new post
  }

  editingPost: Post | null = null;

  editPost(post: Post) {
    this.editingPost = post;
    this.showComposer = true;
  }

  savedOnly = false;

  toggleSaved() {
    this.savedOnly = !this.savedOnly;
    this.applyFilters();
  }

  tagsInput = '';

  updateTags(val: string) {
    this.selectedTags = val.split(',').map(t => t.trim()).filter(Boolean);
    this.applyFilters();
  }

  toggleLiked() {
    this.likedOnly = !this.likedOnly;
    this.applyFilters();
  }
}
