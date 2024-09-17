import { Component, OnInit } from '@angular/core';
import initAOS, { cleanAOS, disableAOS, enableAOS } from '../../../library/invokers/animate-on-scroll';
import { AudioPlayerComponent, audioRequestService } from '../audio-player/audio-player.component';
// import { disableParallax, enableParallax, initParallax } from '../../../library/invokers/parallax';
import { DefaultScrollbar, DisableScrollbar, SkinnyScrollbar } from '../../../library/helpers/scrollbarhelper';
import { ScrollbarState } from './ScrollbarState';

@Component({
	selector: 'app-side-panel',
	standalone: true,
	imports: [AudioPlayerComponent, AudioPlayerComponent],
	templateUrl: './side-panel.component.html',
	styleUrl: './side-panel.component.css',
})
export class SidePanelComponent implements OnInit {
	ScrollbarState = ScrollbarState;
	currentScrollState: ScrollbarState = ScrollbarState.Disable;
	isAnimationEnabled: boolean = true;
	scrollState: string = 'disable';

	ngOnInit(): void {
		//audioRequestService.requestAudioPlay("https://cdn.jsm33t.me/webassets/floatinggarden.mp3");
		this.setAnimations();
		this.loadScrollbar();
	}

	refreshPrompt() {
		window.location.reload();
	}

	resetPrompt() {
		localStorage.clear();
		window.location.reload();
	}
	enableParallax() {
		//enableParallax();
	}
	disableParallax() {
		//disableParallax()
	}

	//ANIMS
	setAnimations() {
		let anim = localStorage.getItem('animations');
		if (anim != null && anim == 'false') {
			this.isAnimationEnabled = false;
			disableAOS();
			//disableParallax();
		}
	}
	disableAnimations() {
		localStorage.setItem('animations', 'false');
		this.isAnimationEnabled = false;
		disableAOS();
		window.location.reload();
		// disableParallax();
	}
	enableAnimations() {
		localStorage.setItem('animations', 'true');
		this.isAnimationEnabled = true;
		enableAOS();
		//initParallax();
		initAOS();
		cleanAOS();
		window.location.reload();
	}
	reloadApp() {
		window.location.reload();
	}

	//SCROLLBARS

	loadScrollbar() {
		this.scrollState = localStorage.getItem('scrollbar') ?? 'disable';

		if (this.scrollState == 'skinny') {
			this.skinnyScrollbar();
		} else if (this.scrollState == 'default') {
			this.defaultScrollbar();
		} else {
			this.disableScrollbar();
		}
	}

	defaultScrollbar() {
		DefaultScrollbar();
		this.currentScrollState = ScrollbarState.Default;
		localStorage.setItem('scrollbar', 'default');
	}
	disableScrollbar() {
		DisableScrollbar();
		this.currentScrollState = ScrollbarState.Disable;
		localStorage.setItem('scrollbar', 'disable');
	}
	skinnyScrollbar() {
		SkinnyScrollbar();
		this.currentScrollState = ScrollbarState.Skinny;
		localStorage.setItem('scrollbar', 'skinny');
	}
}
