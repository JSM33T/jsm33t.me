import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeeroomalbumComponent } from './coffeeroomalbum.component';

describe('CoffeeroomalbumComponent', () => {
	let component: CoffeeroomalbumComponent;
	let fixture: ComponentFixture<CoffeeroomalbumComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CoffeeroomalbumComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CoffeeroomalbumComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
