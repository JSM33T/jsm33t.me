import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import studioItems from "./studioitems";
import initAOS, { cleanAOS } from "../../../library/invokers/animate-on-scroll";
import { InitMasonryGrid } from "../../../library/invokers/masonry_grid";
import Initswiper from "../../../library/invokers/swiper";
import { NgFor, NgOptimizedImage } from "@angular/common";
import { RouterLink } from "@angular/router";
import { environment } from "../../../../environment/environment";

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [NgFor, RouterLink, NgOptimizedImage],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
	providers: [],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

webAssets : string = environment.cdnUrl;

	ngAfterViewInit(): void {
		this.cleanupFn = InitMasonryGrid();
	}

	ngOnInit(): void {
		Initswiper();
		initAOS();
	}

	private cleanupFn?: () => void;
	assetLocation: string = environment.cdnUrl + '/webassets/studio/';
	items = studioItems;
	

	ngOnDestroy() {
		if (this.cleanupFn) {
			this.cleanupFn();
		}
		cleanAOS();
	}
	getGroupsJson(groups: string[]): string {
		return JSON.stringify(groups);
	}
}
