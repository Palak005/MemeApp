import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';
import { addPost, getDraftKey, saveDraft, loadDraft, clearDraft, getPosts, savePosts } from '../../core/storage';
import { UiButtonComponent } from '../../shared/ui-button/ui-button.component';
import { UiInputComponent } from '../../shared/ui-input/ui-input.component';
import { NgModule } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-composer',
  imports: [FormsModule, UiButtonComponent, UiInputComponent, NgIf],
  templateUrl: './post-composer.component.html',
  styleUrl: './post-composer.component.css'
})

export class PostComposerComponent implements OnInit {

  @Output() close = new EventEmitter<void>();

  title = '';
  body = '';
  tagsText = '';
  mood = '😄';

  userId = 'u1';
  draftKey = '';

  @Input() post: Post | null = null;
  isEdit = false;

  ngOnInit() {
    if (this.post) {
      this.isEdit = true;
      this.title = this.post.title || '';
      this.body = this.post.body;
      this.tagsText = this.post.tags.join(',');
      this.mood = this.post.mood;
    }

    this.draftKey = getDraftKey(this.userId, this.post?.id);
    const draft = loadDraft(this.draftKey);
    if (draft) Object.assign(this, draft);
  }


  saveDraft() {
    saveDraft(this.draftKey, {
      title: this.title,
      body: this.body,
      tagsText: this.tagsText,
      mood: this.mood
    });
  }

  submit() {
    if (!this.body.trim()) return alert('Body is required');

    if (this.isEdit && this.post) {
      const posts = getPosts().map(p =>
        p.id === this.post!.id ? { ...this.post!, ...this.buildPostData() } : p
      );
      savePosts(posts);
    } else {
      addPost({ id: Date.now().toString(), ...this.buildPostData() });
    }

    clearDraft(this.draftKey);
    this.close.emit();
  }

  buildPostData() {
    return {
      author: 'You',
      team: 'Frontend',
      title: this.title,
      body: this.body,
      tags: this.tagsText.split(',').map(t => t.trim()).filter(Boolean),
      mood: this.mood,
      createdAt: Date.now()
    };
  }

}
