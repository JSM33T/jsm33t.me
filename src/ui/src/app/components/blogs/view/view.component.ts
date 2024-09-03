import {
	AfterContentInit,
	AfterViewChecked,
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
import { NgFor, NgIf } from '@angular/common';
import initAOS, { cleanAOS } from '../../../library/invokers/animate-on-scroll';
import { AddBlogPropDirective } from '../../../blog-dom.directive';

@Component({
	selector: 'app-view',
	standalone: true,
	imports: [NgIf, NgFor, RouterModule, AddBlogPropDirective],
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
	isLoading = false;
	content: SafeHtml = ''; // For holding sanitized HTML content

	constructor(
		private route: ActivatedRoute,
		private httpService: HttpService,
		private responseHandler: ResponseHandlerService,
		private sanitizer: DomSanitizer,
		private el: ElementRef,
		private renderer: Renderer2
	) {}

  ngOnInit(): void {
		this.slug = this.route.snapshot.paramMap.get('slug')!;
		this.year = this.route.snapshot.paramMap.get('year')!;
		this.getData();
	}
	ngAfterViewInit(): void {
		initAOS();
	}
	ngOnDestroy(): void {
		cleanAOS();
	}

	setProps() {
		const blogContent = document.querySelector('#blogContent') as HTMLElement;
		if (blogContent) {
			const paragraphs = blogContent.getElementsByTagName('p') as HTMLCollectionOf<HTMLParagraphElement>;
			const paragraphsArray = Array.from(paragraphs);
			for (let p of paragraphsArray) {
				p.classList.add('fs-lg');
			}
		}
		const images = blogContent.getElementsByTagName('img') as HTMLCollectionOf<HTMLImageElement>;
		for (let img of Array.from(images)) {
			img.style.maxWidth = '100%'; // Ensures images fit within the container
			img.style.width = 'auto'; // Maintains aspect ratio
		}
		 // Wrap consecutive images in rows and columns
		
		 for (let i = 0; i < this.imagesArray.length - 1; i++) {
		
            const img1 = this.imagesArray[i];
			
            const img2 = this.imagesArray[i + 1];
            if (img1 && img2) {
                // Check if there are two consecutive images
                const parent = img1.parentElement;
                if (parent && img1.nextSibling === img2) {
                    // Create a new div for row and column classes
                    const rowDiv = document.createElement('div');
                    rowDiv.classList.add('row');
                    
                    const colDiv1 = document.createElement('div');
                    colDiv1.classList.add('col-6');
                    colDiv1.appendChild(img1);
                    
                    const colDiv2 = document.createElement('div');
                    colDiv2.classList.add('col-6');
                    colDiv2.appendChild(img2);

                    rowDiv.appendChild(colDiv1);
                    rowDiv.appendChild(colDiv2);

                    // Replace the consecutive images with the new row structure
                    parent.insertBefore(rowDiv, img1);
                    parent.removeChild(img2);
                    parent.removeChild(img1);

                    // Adjust index to skip the next image
                    i++;
                }
            }
        }
	}
	getData() {
		const response$: Observable<APIResponse<any>> = this.httpService.get(`api/blog/load/${this.year}/${this.slug}`);

		this.responseHandler.handleResponse(response$, false).subscribe({
			next: async (response) => {
				if (response.data) {
					console.log(response.data);
					this.title = response.data.name;
					this.dateAdded = response.data.dateAdded;

					const markdownContent = response.data.content;
					const htmlContent = await marked(markdownContent);
					this.authors = response.data.authors;
					this.content = this.sanitizer.bypassSecurityTrustHtml(htmlContent);
					setTimeout(() => {
						this.setProps();
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
}
