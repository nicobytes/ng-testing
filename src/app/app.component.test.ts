import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { queryAllByDirective, RouterLinkDirectiveStub } from '../testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
    selector: 'app-banner',
    standalone: true,
    imports: [RouterTestingModule]
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class BannerComponentStub {}

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterTestingModule]
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class FooterComponentStub {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [
        RouterTestingModule,
        BannerComponentStub,
        FooterComponentStub,
        AppComponent
    ],
    declarations: [RouterLinkDirectiveStub],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(7);
  });

  it('should there are 7 routerLinks with match routes', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = links.map(link => link.injector.get(RouterLinkDirectiveStub))
    expect(links.length).toEqual(7);
    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
  });
});
