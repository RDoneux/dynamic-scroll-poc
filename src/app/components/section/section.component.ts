import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { FadeOptions } from './section.types';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() backgroundImage!: string;
  @Input() fade: FadeOptions = ['in', 'out'];

  @ViewChild('background') private _background!: ElementRef;
  private get background(): HTMLDivElement {
    return this._background.nativeElement;
  }

  @ViewChild('scrollable') private _scrollable!: ElementRef;
  private get scrollable(): HTMLDivElement {
    return this._scrollable.nativeElement;
  }

  private maxZoom: number = 1.5;

  @HostListener('document:scroll', ['$event'])
  private onScroll(event: Event) {
    this.isVisible() ? this.hideComponent() : this.showComponent();
    
    const scrollFactor: number = this.scale(
      [this.getStartOfComponent(), this.getEndOfComponent()],
      [1, this.maxZoom]
    )(window.scrollY);

    this.background.style.opacity = `${this.fadeValue()}`;
    this.background.style.transform = `scale(${scrollFactor})`;
  }

  private getStartOfComponent(): number {
    return this.scrollable.offsetTop - window.innerHeight;
  }

  private getEndOfComponent(): number {
    return this.scrollable.offsetTop + this.scrollable.offsetHeight;
  }

  private hideComponent(): void {
    this.background.style.opacity = '0';
  }

  private showComponent(): void {
    this.background.style.opacity = '1';
  }

  private isVisible(): boolean {
    return window.scrollY + window.innerHeight < this.scrollable.offsetTop;
  }

  private fadeValue(): number {
    const fadeSpace: number = 300;
    const endBoundary: number =
      this.scrollable.offsetTop + this.scrollable.offsetHeight;
    const startBoundary: number = this.scrollable.offsetTop;
    const scrollValue: number = window.scrollY + window.innerHeight;

    if (
      scrollValue > endBoundary + fadeSpace ||
      scrollValue < startBoundary - fadeSpace
    )
      return 0;

    if (
      scrollValue > endBoundary - fadeSpace &&
      scrollValue < endBoundary + fadeSpace &&
      this.fade.includes('out')
    ) {
      return this.scale(
        [endBoundary - fadeSpace, endBoundary + fadeSpace],
        [1, 0]
      )(scrollValue);
    }
    if (
      scrollValue > startBoundary - fadeSpace &&
      scrollValue < startBoundary + fadeSpace &&
      this.fade.includes('in')
    ) {
      return this.scale(
        [startBoundary - fadeSpace, startBoundary + fadeSpace],
        [0, 1]
      )(scrollValue);
    }
    return 1;
  }

  private scale = (
    fromRange: number[],
    toRange: number[]
  ): ((from: number) => number) => {
    const d = (toRange[1] - toRange[0]) / (fromRange[1] - fromRange[0]);
    return (from: number) => (from - fromRange[0]) * d + toRange[0];
  };
}
