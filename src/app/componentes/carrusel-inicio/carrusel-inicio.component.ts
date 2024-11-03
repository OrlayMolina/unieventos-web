import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class CarruselInicioComponent implements OnInit, OnDestroy{

  slides = [
    { imageUrl: 'https://firebasestorage.googleapis.com/v0/b/unieventosimagenes.appspot.com/o/jumbotron-2.JPG?alt=media&token=7b35f0a1-65c7-447f-ba6d-955fd0c6d6bf', altText: 'First slide' },
    { imageUrl: 'https://firebasestorage.googleapis.com/v0/b/unieventosimagenes.appspot.com/o/jumbotron-1.JPG?alt=media&token=154e84c9-9e69-42a7-92c2-2f47aa2426e9', altText: 'Second slide' },
    { imageUrl: 'https://firebasestorage.googleapis.com/v0/b/unieventosimagenes.appspot.com/o/jumbotron-3.JPG?alt=media&token=46c1cbcf-b07f-4c73-94b0-8fbdec529d01', altText: 'Third slide' },
  ];

  activeSlide = 0;
  intervalId: any;

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4500);
  }

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
