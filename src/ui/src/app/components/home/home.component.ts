import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import initAOS, { cleanAOS } from '../../library/invokers/animate-on-scroll';
import { audioRequestService } from '../shared/audio-player/audio-player.component';
import { environment } from '../../../environment/environment';
import Parallax from 'parallax-js';
import { ParallaxService } from '../../services/parallax.service';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
	webassets: string = environment.cdnUrl;
	//private parallaxInstance: Parallax | null = null;

	constructor(private parallaxService: ParallaxService) {}

	ngOnInit(): void {
        initAOS();
		this.parallaxService.initParallax('scene');
	}

	ngOnDestroy(): void {
		cleanAOS();
		this.parallaxService.destroyParallax('scene');
	}

	

	// private initParallax(): void {
	//     const scene = document.getElementById('scene') as HTMLElement;
	//     if (scene) {
	//         this.parallaxInstance = new Parallax(scene, {
	//             relativeInput: true
	//         });
	//     }
	// }

	// private destroyParallax(): void {
	//     if (this.parallaxInstance) {
	//         this.parallaxInstance.destroy();
	//         this.parallaxInstance = null;
	//     }
	// }
}
