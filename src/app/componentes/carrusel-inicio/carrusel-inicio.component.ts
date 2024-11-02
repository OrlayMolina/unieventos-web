import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel-inicio',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './carrusel-inicio.component.html',
  styleUrl: './carrusel-inicio.component.css'
})
export class CarruselInicioComponent {

  slides = [
    { imageUrl: 'url-del-primer-slide', altText: 'First slide' },
    { imageUrl: 'url-del-segundo-slide', altText: 'Second slide' },
    { imageUrl: 'url-del-tercer-slide', altText: 'Third slide' },
  ];

  activeSlide = 0;

  setActiveSlide(index: number) {
    this.activeSlide = index;
  }

  nextSlide() {
    this.activeSlide = (this.activeSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.activeSlide = (this.activeSlide - 1 + this.slides.length) % this.slides.length;
  }
}
