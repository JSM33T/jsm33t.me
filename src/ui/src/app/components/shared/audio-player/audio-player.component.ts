import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, interval } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
templateUrl: 'audio-player.component.html',
styleUrl:'audio-player.component.css'
})
export class AudioPlayerComponent implements OnInit, OnDestroy {
  private audio: HTMLAudioElement;
  private destroy$ = new Subject<void>();
  
  currentAudio: string | null = null;
  isPlaying = false;
  duration = 0;
  currentTime = 0;

  constructor(private ngZone: NgZone) {
    this.audio = new Audio();
  }

  ngOnInit() {
    this.listenForAudioRequests();
    this.setupAudioEventListeners();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private listenForAudioRequests() {
    audioRequestService.audioRequests$
      .pipe(takeUntil(this.destroy$))
      .subscribe((audioFile: string) => {
        this.playAudio(audioFile);
      });
  }

  private setupAudioEventListeners() {
    this.audio.addEventListener('loadedmetadata', () => {
      this.ngZone.run(() => {
        this.duration = this.audio.duration;
      });
    });

    this.audio.addEventListener('timeupdate', () => {
      this.ngZone.run(() => {
        this.currentTime = this.audio.currentTime;
      });
    });

    this.audio.addEventListener('ended', () => {
      this.ngZone.run(() => {
        this.isPlaying = false;
        this.currentTime = 0;
      });
    });
  }

  playAudio(audioFile: string) {
    const filename = audioFile.split('/').pop()?.toString().slice(0, -4)
    this.audio.src = audioFile;
    if(filename)
    {
        this.currentAudio =decodeURIComponent(filename) ;
    }
    this.audio.load(); // Ensure the audio is loaded before playing
    this.audio.play().then(() => {
      this.ngZone.run(() => {
        this.isPlaying = true;
      });
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play().then(() => {
        this.isPlaying = true;
      }).catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
    this.currentTime = 0;
  }

  onSeek(event: Event) {
    const seekTime = +(event.target as HTMLInputElement).value;
    this.audio.currentTime = seekTime;
    this.currentTime = seekTime;
  }

  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}

// Audio request service (placeholder)
class AudioRequestService {
  private audioRequestSubject = new Subject<string>();
  audioRequests$ = this.audioRequestSubject.asObservable();

  requestAudioPlay(audioFile: string) {
    this.audioRequestSubject.next(audioFile);
  }
}

const audioRequestService = new AudioRequestService();

export { audioRequestService };