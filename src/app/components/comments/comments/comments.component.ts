import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { itemsList, itemsListModal } from '../../../shared/utils/itemsList';
import { commentsList, commentsListModal } from '../../../shared/utils/commentsList';
import { Constants } from '../../../core/constants/constants';
import { CommonModule, DatePipe } from '@angular/common';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentsService } from '../../../core/services/comments.service';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [ CommonModule, CommentFormComponent, DatePipe ],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent  {
 
  itemId!: string;
  showReplies: boolean = false
  showReplyForm: boolean = false

  // activeUser!: itemsListModal;
  logo = Constants.logo
  loading: boolean = false
  rloading:boolean = false

  commentsList!: any[];
  repliesList!: any[];
  commentId!: number;
  replyParentId!: number | null;
  serverUrl = environment.DEV_SERVER
  @Output() commentsUpdated = new EventEmitter()

  constructor(
    private commentService: CommentsService
  ) { }




  setItemId(id: string) {
    this.itemId = id
    this.commentsList = []
    this.getComments()
  }

  getComments() {
   
    this.loading = true
    if (this.itemId) {

      this.commentService.getComments(this.itemId).subscribe(comments => {
        this.commentsList = comments.filter((c: any) => c.parentId === null)
        this.loading = false
      })
    }
  }

  getReplies(id: number) {
    this.showReplies = true
    this.rloading = true
    this.repliesList = []
   

    this.commentService.getComments(this.itemId).subscribe(comments => {
      this.repliesList = comments.filter((c: any) => c.parentId === id)
      this.commentId = id;
      this.rloading = false
    })


  }

  addToCommentsList(arr: any[]) {
    let newComment = {
      text: arr[ 0 ],
      parentId: arr[ 1 ],
      postId: this.itemId
    }

    if(newComment.parentId === null){

      this.commentService.addComments(newComment).subscribe(k => {
        this.getComments()
        this.commentsUpdated.emit(this.itemId)
      })
    }else{
      this.commentService.addComments(newComment).subscribe(k => {
        
        this.showReplyForm = false
        this.getReplies(newComment.parentId)
        this.commentsUpdated.emit(this.itemId)
       
      })

    }



  }

  toggleReplyForm(parentId: number) {
    this.showReplyForm = !this.showReplyForm;
    this.replyParentId = this.showReplyForm ? parentId : null;
  }

 
}
