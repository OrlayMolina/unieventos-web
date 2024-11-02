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
    { imageUrl: 'https://firebasestorage.googleapis.com/v0/b/unieventosimagenes.appspot.com/o/jumbotron-2.JPG?alt=media&token=2ef05749-2f28-446f-8357-7981d03ca4df', altText: 'First slide' },
    { imageUrl: 'https://firebasestorage.googleapis.com/v0/b/unieventosimagenes.appspot.com/o/jumbotron-1.JPG?alt=media&token=154e84c9-9e69-42a7-92c2-2f47aa2426e9', altText: 'Second slide' },
    { imageUrl: 'https://firebasestorage.googleapis.com/v0/b/unieventosimagenes.appspot.com/o/jumbotron-3.JPG?alt=media&token=6613ac0a-96d6-4218-8024-4a7841b74571', altText: 'Third slide' },
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
