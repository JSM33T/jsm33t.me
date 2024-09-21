import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { APIResponse } from '../../../library/interfaces/api-response.model';
import { Observable } from 'rxjs';
import { ResponseHandlerService } from '../../../library/helpers/response-handler';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { NgClass, NgFor, NgIf } from '@angular/common';
import initAOS, { cleanAOS } from '../../../library/invokers/animate-on-scroll';
import { cleanLightGallery, initializeLightGallery } from '../../../library/invokers/lightgallery';
declare var bootstrap: any;

@Component({
	selector: 'app-view',
	standalone: true,
	imports: [NgIf, NgFor, RouterModule, NgClass],
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit, AfterViewInit, OnDestroy {
	slug: string = '';
	year: string = '';
	title: string = '';
	authors: any = [];
	tags: any = [];
	dateAdded: string = '';
	imagesArray: any = [];
	blogTitle: string = '';
	isLoading = true;
	content: SafeHtml = '';
	isLiked: boolean = false;
	likesCount: number = 0;

	constructor(private route: ActivatedRoute, private httpService: HttpService, private responseHandler: ResponseHandlerService, private sanitizer: DomSanitizer, private el: ElementRef, private renderer: Renderer2) {}

    sidebar: any;
    
	ngOnInit(): void {
		this.slug = this.route.snapshot.paramMap.get('slug')!;
		this.year = this.route.snapshot.paramMap.get('year')!;
		this.getData();
		this.getLikeStat();
	}
	ngAfterViewInit(): void {
		initAOS();
        this.sidebar = document.getElementById('sidebar');
	}
	ngOnDestroy(): void {
		cleanLightGallery();
		cleanAOS();
	}

	setProps() {}

	//props to loaded blog
	addClasses() {
		const imgTag = this.el.nativeElement.querySelectorAll('img');
		imgTag.forEach((imgTag: HTMLElement) => {
			this.renderer.addClass(imgTag, 'w-100');
			this.renderer.addClass(imgTag, 'gallery-item');
			this.renderer.addClass(imgTag, 'img_pointer');
		});

		const pTags = this.el.nativeElement.querySelectorAll('p');
		pTags.forEach((pTag: HTMLElement) => {
			this.renderer.addClass(pTag, 'fs-lg');
		});

		const aTags = this.el.nativeElement.querySelectorAll('a');
		aTags.forEach((aTag: HTMLElement) => {
			this.renderer.setAttribute(aTag, 'target', '_blank');
		});
	}

	getData() {
		const response$: Observable<APIResponse<any>> = this.httpService.get(`api/blog/load/${this.year}/${this.slug}`);

		this.responseHandler.handleResponse(response$, false).subscribe({
			next: async (response) => {
				if (response.data) {
					this.title = response.data.name;
					this.dateAdded = response.data.dateAdded;

					const markdownContent = response.data.content;
					if (markdownContent) {
						console.log(response.data);
						const htmlContent = await marked(markdownContent);
						this.content = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
						this.tags = response.data.tags ? String(response.data.tags).split(',') : [];
						setTimeout(() => {
							console.log('adding classes');
							this.addClasses();
							console.log('initializing  lightgallery');
							initializeLightGallery();
						}, 10);
					} else {
						this.content = 'error fetching the blog...';
					}

					this.authors = response.data.authors;

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
			slug: this.slug,
		};

		const response$: Observable<APIResponse<any>> = this.httpService.post(`api/blog/addlike`, likeData);
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
		const response$: Observable<APIResponse<any>> = this.httpService.get(`api/blog/getlikestatus/` + this.slug);
		this.responseHandler.handleResponse(response$, false).subscribe({
			next: async (response) => {
				if (response.data) {
					console.log(response.data);
					this.isLiked = response.data.isLiked;
					this.likesCount = response.data.likesCount;
				} else {
					this.isLiked = false;
				}
			},
			error: (error) => {
				console.log(error.error);
				this.isLiked = false;
			},
		});
	}

	toggleSidebar(): void {
		const bsOffcanvas = new bootstrap.Offcanvas(this.sidebar);
		if (this.sidebar.classList.contains('show')) {
			bsOffcanvas.hide();
		}
        //  else {
		// 	bsOffcanvas.show();
		// }
	}
}
