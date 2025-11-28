import { Component, HostBinding, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common'; // Необхідний для *ngIf у шаблоні
import { Button } from '../button/button';
import { LaunchModalService } from '../../core/services/launch-modal-service'; // 👈 Новий сервіс
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-launch-component',
  standalone: true,
  imports: [CommonModule, Button, ClickOutsideDirective],
  templateUrl: './launch-component.html',
  styleUrl: './launch-component.scss',
})
export class LaunchComponent implements OnInit, OnDestroy {
  launchModalService = inject(LaunchModalService);
  public isModalActive: boolean = false;

  public modalOpen$ = this.launchModalService.modalState$;
  public modalActive$ = this.launchModalService.modalActiveState$;

  private subscriptions = new Subscription();

  ngOnInit() {
    this.subscriptions.add(
      this.launchModalService.modalActiveState$.subscribe((state) => {
        this.isModalActive = state;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public onOutsideClick(): void {
    this.launchModalService.closeModal();
  }

  @HostBinding('attr.active')
  get isActiveClass(): boolean {
    return this.isModalActive;
  }
}
