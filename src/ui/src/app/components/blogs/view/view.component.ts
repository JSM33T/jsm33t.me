import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    OnInit,
    Renderer2,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { ResponseHandlerService } from '../../../library/helpers/response-handler';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { NgClass, NgFor, NgIf } from '@angular/common';
import initAOS, { cleanAOS, refreshAOS } from '../../../library/invokers/animate-on-scroll';
import { AddBlogPropDirective } from '../../../blog-dom.directive';

@Component({
    selector: 'app-view',
    standalone: true,
    imports: [NgIf, NgFor, RouterModule, AddBlogPropDirective,NgClass],
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css'], // Corrected to styleUrls
})
export class ViewComponent implements OnInit, AfterViewInit, OnDestroy {
    slug: string = '';
    year: string = '';
    title: string = '';
    authors: any = [];
    dateAdded: string = '';
    imagesArray: any = [];
    blogTitle: string = '';
    isLoading = true;
    content: SafeHtml = '';
    isLiked: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private httpService: HttpService,
        private responseHandler: ResponseHandlerService,
        private sanitizer: DomSanitizer,
        private el: ElementRef,
        private renderer: Renderer2,
    ) { }

    ngOnInit(): void {
        this.slug = this.route.snapshot.paramMap.get('slug')!;
        this.year = this.route.snapshot.paramMap.get('year')!;
        this.getData();
        this.getLikeStat();
    }
    ngAfterViewInit(): void {
        initAOS();
    }
    ngOnDestroy(): void {
        cleanAOS();
    }

    setProps() { }

    getData() {
        const response$: Observable<APIResponse<any>> = this.httpService.get(
            `api/blog/load/${this.year}/${this.slug}`,
        );

        this.responseHandler.handleResponse(response$, false).subscribe({
            next: async (response) => {
                if (response.data) {
                    this.title = response.data.name;
                    this.dateAdded = response.data.dateAdded;

                    const markdownContent = response.data.content;
                    const htmlContent = await marked(markdownContent);
                    this.authors = response.data.authors;
                    this.content = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
                    setTimeout(() => {
                        this.setProps();
                        initAOS();
                    }, 100);
                } else {
                    console.log('no markdown data');
                }
                this.isLoading = false;
            },
            error: (error) => {
                console.log(error.error);
                this.isLoading = false;
            },
        });
    }



    togglelike() {

        this.isLiked = !this.isLiked;
        const likeData = {
            slug : this.slug
        }
    
        const response$: Observable<APIResponse<any>> = this.httpService.post(
            `api/blog/addlike`,likeData,
        );
        this.responseHandler.handleResponse(response$, false).subscribe({
            next: async (response) => {
                // if (response.data) {
                // } else {
                // }
                this.getLikeStat();
            },
            error: (error) => {
                this.getLikeStat();
                console.log(error.error);
            },
        });
        
    }

    getLikeStat() {

        const response$: Observable<APIResponse<any>> = this.httpService.get(
            `api/blog/getlikestatus/` + this.slug
        );
        this.responseHandler.handleResponse(response$, false).subscribe({
            next: async (response) => {
                if (response.data) {
                    console.log(response.data);
                    this.isLiked = response.data;
                }
                else {
                    this.isLiked = false;
                }
            },
            error: (error) => {
                console.log(error.error);
                this.isLiked = false;
            },
        });


    }

}
