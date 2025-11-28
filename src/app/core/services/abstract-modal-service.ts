import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Абстрактний базовий клас для всіх сервісів керування модальними вікнами.
 * Містить загальну логіку управління станом (Mounted/Active) та анімацією.
 *
 * Не має декоратора @Injectable, оскільки призначений лише для успадкування.
 */
export abstract class AbstractModalService {
  // Внутрішні BehaviorSubject для керування станом
  protected isMountedSource = new BehaviorSubject<boolean>(false);
  protected isActiveSource = new BehaviorSubject<boolean>(false);

  protected animationTimeout: any;
  // Час анімації повинен відповідати CSS
  protected readonly ANIMATION_DURATION: number = 300;

  // Публічні Observable для доступу до стану з компонента (використання з AsyncPipe)
  public modalState$: Observable<boolean> = this.isMountedSource.asObservable();
  public modalActiveState$: Observable<boolean> = this.isActiveSource.asObservable();

  protected clearAnimationTimeout(): void {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
      this.animationTimeout = null;
    }
  }

  // Загальна логіка відкриття модального вікна
  public openModal(): void {
    this.clearAnimationTimeout();

    this.isMountedSource.next(true); // 1. Додати в DOM

    // Затримка 10мс для запуску CSS-переходу
    this.animationTimeout = setTimeout(() => {
      this.isActiveSource.next(true); // 2. Активувати анімацію (додати клас 'is-active')
    }, 10);
  }

  public toggle() {
    const state = this.isMountedSource.getValue();
    state ? this.closeModal() : this.openModal();
  }

  // Загальна логіка закриття модального вікна
  public closeModal(): void {
    this.clearAnimationTimeout();

    this.isActiveSource.next(false); // 1. Деактивувати анімацію (прибрати клас 'is-active')

    // Чекаємо завершення анімації, перш ніж видалити з DOM
    this.animationTimeout = setTimeout(() => {
      this.isMountedSource.next(false); // 2. Видалити з DOM
      this.animationTimeout = null;
    }, this.ANIMATION_DURATION);
  }
}
