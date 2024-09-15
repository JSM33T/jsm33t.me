import { Component, OnInit } from '@angular/core';
import initAOS, { cleanAOS, disableAOS, enableAOS } from '../../../library/invokers/animate-on-scroll';
import { AudioPlayerComponent, audioRequestService } from '../audio-player/audio-player.component';
// import { disableParallax, enableParallax, initParallax } from '../../../library/invokers/parallax';
import { DefaultScrollbar, DisableScrollbar, SkinnyScrollbar } from '../../../library/helpers/scrollbarhelper';

@Component({
	selector: 'app-side-panel',
	standalone: true,
	imports: [AudioPlayerComponent, AudioPlayerComponent],
	templateUrl: './side-panel.component.html',
	styleUrl: './side-panel.component.css',
})
export class SidePanelComponent implements OnInit {
	enableParallax() {
		//enableParallax();
	}
	disableParallax() {
		//disableParallax()
	}
	isAnimationEnabled: boolean = true;

	ngOnInit(): void {
		//audioRequestService.requestAudioPlay("https://cdn.jsm33t.me/webassets/floatinggarden.mp3");
		this.setAnimations();
	}

	//ANIMS
	setAnimations() {
		let anim = localStorage.getItem('animations');
		if (anim != null && anim == 'false') {
			this.disableAnimations();
			this.isAnimationEnabled = false;
			//disableParallax();
		}
	}
	disableAnimations() {
		localStorage.setItem('animations', 'false');
		this.isAnimationEnabled = false;
		disableAOS();
		// disableParallax();
	}
	enableAnimations() {
		localStorage.setItem('animations', 'true');
		this.isAnimationEnabled = true;
		enableAOS();
		//initParallax();
		initAOS();
		cleanAOS();
	}

	//SCROLLBARS

	defaultScrollbar() {
		DefaultScrollbar();
	}
	disableScrollbar() {
		DisableScrollbar();
	}
	skinnyScrollbar() {
		SkinnyScrollbar();
	}
}
