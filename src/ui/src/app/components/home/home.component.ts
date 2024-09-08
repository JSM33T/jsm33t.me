import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { initParallax } from '../../library/invokers/parallax';
import initAOS, { cleanAOS } from '../../library/invokers/animate-on-scroll';
import { audioRequestService } from '../shared/audio-player/audio-player.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
	ngOnDestroy(): void {
		cleanAOS();
	}
	ngOnInit(): void {
		initAOS();
		initParallax();
	}

}
