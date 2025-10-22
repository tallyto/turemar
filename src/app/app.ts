import { Component, signal, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None // Desabilita o encapsulamento para aplicar estilos globalmente
})
export class App implements AfterViewInit {
  protected readonly title = signal('turemar');

  ngAfterViewInit() {
    this.setupMobileMenu();
    this.setupSmoothScrolling();
  }

  private setupMobileMenu() {
    // Adiciona funcionalidade do menu mobile
    if (typeof window !== 'undefined') {
      (window as any).toggleMobileMenu = () => {
        const menu = document.getElementById('mobile-menu');
        const button = document.querySelector('[aria-controls="mobile-menu"]');
        
        if (menu && button) {
          const isHidden = menu.classList.contains('hidden');
          
          if (isHidden) {
            menu.classList.remove('hidden');
            button.setAttribute('aria-expanded', 'true');
          } else {
            menu.classList.add('hidden');
            button.setAttribute('aria-expanded', 'false');
          }
        }
      };
    }
  }

  private setupSmoothScrolling() {
    // Configura scroll suave para navegação oceânica
    if (typeof document !== 'undefined') {
      document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
          e.preventDefault();
          const targetId = target.getAttribute('href')?.substring(1);
          const targetElement = document.getElementById(targetId!);
          
          if (targetElement) {
            // Scroll suave como as ondas do mar
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Fecha o menu mobile se estiver aberto
            const mobileMenu = document.getElementById('mobile-menu');
            const button = document.querySelector('[aria-controls="mobile-menu"]');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
              button?.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });
    }
  }
}
