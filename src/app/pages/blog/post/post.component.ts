import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Post } from 'src/app/app.models';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  private sub: any;
  public post: Post;

  constructor(
    /* public appSettings:AppSettings,*/
    public appService:AppService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
    /* private embedService: EmbedVideoService,
    public fb: UntypedFormBuilder,
    private domHandlerService: DomHandlerService */) {
    /* this.settings = this.appSettings.settings; */
  }

  ngOnInit() {
    
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.getPostById(params['id']);
    });

  }

  public getPostById(id: number){
    
    this.appService.getPostById(id).subscribe(({ response }) => {
      this.post = response;      
    });        
  }

  renderHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}