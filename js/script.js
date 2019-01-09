'use strict';

/* === CAROUSEL == */
var activeSlide = 0;
var numberOfSlides = document.querySelectorAll('.carousel-slide').length;

createCarouselListeners();
autoChangeSlide();

function createCarouselListeners() {
    document.querySelector('.prev').addEventListener('click', function() {
        activeSlide > 0 ? activeSlide -= 1 : activeSlide = numberOfSlides - 1;
        showSlide();
    });
    document.querySelector('.next').addEventListener('click', function() {
        activeSlide + 1 < numberOfSlides ? activeSlide +=1 : activeSlide = 0;
        showSlide();
    });
    var dots = document.querySelectorAll('.dot');
    dots.forEach(function (elem, index) {
        elem.addEventListener('click', function() {
            activeSlide = index;;
            showSlide();
        });
    });
}

function autoChangeSlide() {
    setInterval(function() {
        activeSlide + 1 < numberOfSlides ? activeSlide +=1 : activeSlide = 0;
        showSlide();
    }, 8000);
}

function showSlide() {
    var slides = document.querySelectorAll('.carousel-slide');
    slides.forEach(function (elem) {
        elem.classList.remove('show');
    });
    var dots = document.querySelectorAll('.dot');
    dots.forEach(function (elem) {
        elem.classList.remove('active');
    });
    slides[activeSlide].classList.add('show');
    dots[activeSlide].classList.add('active');
}

/* === GALLERY === */
var galleryImages = document.querySelectorAll('.gallery-img');
var activeImage = 0;

fitImages();
createGalleryListeners();

function fitImages() {
    galleryImages.forEach(function (elem) {
        var width = elem.naturalWidth;
        var height = elem.naturalHeight;
        if (width < height) elem.classList.add("high");
    });
}

function createGalleryListeners() {
    galleryImages.forEach(function (elem, index) {
        elem.addEventListener('click', function() {
            showImage(elem, index);
        });
    });
    document.querySelector('.gallery-modal').addEventListener('click', function() {
        closeImage();
    });
    document.querySelector('.close-modal').addEventListener('click', function(event) {
        closeImage();
        event.stopPropagation();
    });
    document.querySelector('.prev-image').addEventListener('click', function(event) {
        prevImage(activeImage);
        event.stopPropagation();
    });
    document.querySelector('.next-image').addEventListener('click', function(event) {
        nextImage(activeImage);
        event.stopPropagation();
    });
    document.querySelector('.full-gallery').addEventListener('click', function(event) {
        showFullGallery();
    });
}

function showImage(minImage, imgIndex) {
    activeImage = imgIndex;
    document.querySelector('.gallery-modal').classList.add('show');
    var image = document.querySelector('.modal-image');
    image.src = minImage.src.replace('min', 'big');
}

function closeImage() {
    document.querySelector('.gallery-modal').classList.remove('show');
}

function prevImage(imgIndex) {
    imgIndex > 0 ? imgIndex -= 1 : imgIndex = galleryImages.length - 1
    showImage(galleryImages[imgIndex], imgIndex);
}

function nextImage(imgIndex) {
    imgIndex < galleryImages.length - 1 ? imgIndex += 1 : imgIndex = 0;
    showImage(galleryImages[imgIndex], imgIndex);
}

/* === GALLERY - TOGGLE FULL GALLERY ON/OFF === */
function showFullGallery() {
    var toggleFull = document.querySelector('.full-gallery').firstElementChild;
    toggleFull.innerText === 'Rozwiń galerię' ?
        toggleFull.innerText = 'Zwiń galerię' :
        toggleFull.innerText = 'Rozwiń galerię';
    var photoBoxArray = document.querySelectorAll('.photo-box');
    photoBoxArray.forEach(function(elem) {
        elem.classList.toggle('show-full');
    });
}

/* === MAP === */
window.initMap = function() {
	var position = {lat: 50.379482, lng: 20.594736};
	var map = new google.maps.Map(document.querySelector('#map'), {zoom: 8, center: position});
    var marker = new google.maps.Marker({position: position, map: map});
}