import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MelancholyComponent } from './melancholy.component';

describe('MelancholyComponent', () => {
	let component: MelancholyComponent;
	let fixture: ComponentFixture<MelancholyComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MelancholyComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MelancholyComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
