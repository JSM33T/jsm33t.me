import { Component, OnInit } from '@angular/core';
import initAOS, { cleanAOS, disableAOS, enableAOS } from '../../../library/invokers/animate-on-scroll';
import { AudioPlayerComponent, audioRequestService } from "../audio-player/audio-player.component";

@Component({
	selector: 'app-side-panel',
	standalone: true,
	imports: [AudioPlayerComponent,AudioPlayerComponent],
	templateUrl: './side-panel.component.html',
	styleUrl: './side-panel.component.css',
})
export class SidePanelComponent implements OnInit {
    ngOnInit(): void {
        audioRequestService.requestAudioPlay("https://cdn.jsm33t.me/webassets/floatinggarden.mp3");
    }
	disableAnimations() {
		disableAOS();
	}
    enableAnimations() {
        enableAOS();
		initAOS();
        cleanAOS();
	}
}
