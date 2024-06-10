import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Post } from 'src/app/app.models';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  private sub: any;
  public post:Post;

  constructor(
    /* public appSettings:AppSettings,*/
    public appService:AppService,
    private activatedRoute: ActivatedRoute
    /* private embedService: EmbedVideoService,
    public fb: UntypedFormBuilder,
    private domHandlerService: DomHandlerService */) {
    /* this.settings = this.appSettings.settings; */
}

  ngOnInit() {
    console.log("OnInit postComponent");
    console.log(this.activatedRoute.params);
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getPostById(params['id']);
    });
    console.log("OnInit postComponent sub");
    console.log(this.sub);
  }


  public getPostById(id: number){
    console.log("getPostById");
    console.log(id);
    this.appService.getPostById(id).subscribe(data=>{
      this.post = data;
    });
    console.log("this.post");
    console.log(this.post);

  }

}
