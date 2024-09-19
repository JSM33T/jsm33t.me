import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ParallaxService } from '../../../../services/parallax.service';
import initAOS from '../../../../library/invokers/animate-on-scroll';
import { audioRequestService } from '../../../shared/audio-player/audio-player.component';
import { environment } from '../../../../../environment/environment';
import { initializeLightGallery } from '../../../../library/invokers/lightgallery';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-singularity',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './singularity.component.html',
	styleUrl: './singularity.component.css',
})
export class SingularityComponent implements OnInit,OnDestroy {

    @ViewChild('myDiv') myDiv!: ElementRef;
    mp3Link : string =  environment.cdnUrl + '/music/singularity-original/JSM33T%20-%20Singularity%20(Original%20Mix).mp3'
    flacLink : string = environment.cdnUrl + '/music/singularity-original/JSM33T%20-%20Singularity%20(Original%20Mix).flac'

    constructor(private parallaxService: ParallaxService) {}
    ngOnDestroy(): void {
        this.parallaxService.destroyParallax('coverparallax');
    }

    scrollToLinks() {
        this.myDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }

	ngOnInit(): void {
        initializeLightGallery();
		initAOS();
		this.parallaxService.initParallax('coverparallax');
	}
	baseadd: string = environment.cdnUrl + '';

	playA() {
		audioRequestService.requestAudioPlay(environment.cdnUrl + '/music/singularity-original/JSM33T%20-%20Singularity%20(Original%20Mix).mp3');
	}

	initParallax() {}
}
