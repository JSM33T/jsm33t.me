import { Component } from '@angular/core';
import { disableAOS } from '../../../library/invokers/animate-on-scroll';
import { AudioPlayerComponent } from "../audio-player/audio-player.component";

@Component({
	selector: 'app-side-panel',
	standalone: true,
	imports: [AudioPlayerComponent,AudioPlayerComponent],
	templateUrl: './side-panel.component.html',
	styleUrl: './side-panel.component.css',
})
export class SidePanelComponent {
	disableAnimations() {
		disableAOS();
	}
}
