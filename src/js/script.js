window.addEventListener('DOMContentLoaded', () => {

    const slider = (sliderLineSelector, itemsSelector, sliderNavSelector,
          sliderNavItemClass, btnPreSelector, btnNextSelector, countShowSlids) => {
        
        function rollSlider() {
            sliderLine.style.left = `${-count*(sliderLine.offsetWidth/items.length)}px`;
        }

        function disableBtn() {
            if (count >= items.length - 2) {
                sliderNext.disabled = true;
            } else {
                sliderNext.disabled = false;
            }

            if (count <= 0) {
                sliderPre.disabled = true;
            } else {
                sliderPre.disabled = false;
            }
        } 

        function removeSliderNav() {
            while (sliderNav.firstChild) {
                sliderNav.firstChild.remove();
            }
        }

        function createSliderNav() {
            for (let i=0; i < items.length/countShowSlids; i++) {
                const sliderNavItem = document.createElement("div");
                const div = document.createElement("div");
    
                sliderNavItem.className = sliderNavItemClass;
                sliderNav.append(sliderNavItem);
                sliderNavItem.append(div);
            }
        }

        function sliderNavigation() {
            const sliderNavItems = document.querySelectorAll('.' + sliderNavItemClass);

            sliderNavItems.forEach((item, index) => {
                item.addEventListener('click', () => {
                    if (index * countShowSlids < items.length - 2) {
                        count = index * countShowSlids;
                    } else {
                        count = index * countShowSlids - 1;
                    }

                    disableBtn();
                    rollSlider();
                    toggleActiveSlide();
                });
            });
        }

        function toggleActiveSlide() {
            const sliderNavItems = sliderNav.querySelectorAll("." + sliderNavItemClass);
            sliderNavItems.forEach((item, index) => {
                item.classList.remove("active");
                if (index === Math.round(count/countShowSlids)) {
                    item.classList.add("active");
                }
            });
        }
        
        const items = document.querySelectorAll(itemsSelector);
        const sliderLine = document.querySelector(sliderLineSelector);
        const sliderNext = document.querySelector(btnNextSelector);
        const sliderPre = document.querySelector(btnPreSelector);
        const sliderNav = document.querySelector(sliderNavSelector);
        
        let count = 0;

        removeSliderNav();
        createSliderNav();        
        disableBtn();
        toggleActiveSlide();

        sliderNext.addEventListener('click', () => {
            if (count < items.length - 3) {
                count += 2;
            } else {
                count += 1;
            }
            disableBtn();
            rollSlider();
            toggleActiveSlide();
        });

        sliderPre.addEventListener('click', () => {
            if (count >= 2) {
                count += -2;
            } else {
                count += -1;
            }
            disableBtn();
            rollSlider();
            toggleActiveSlide();
        });
        sliderNavigation();
    };

    const sliderSwiper = (sliderSelector, sliderLineSelector, sliderItemSelector,
          sliderNavSelector, sliderNavItemClass, countShowSlids) => {

        function createSliderNav() {
            for (let i=0; i < sliderItems.length/countShowSlids; i++) {
                const sliderNavItem = document.createElement("div");
                const div = document.createElement("div");
    
                sliderNavItem.className = sliderNavItemClass;
                sliderNav.append(sliderNavItem);
                sliderNavItem.append(div);
            }
        }

        function sliderMove() {
            if (position > 0) {
                position = 0;
            }

            if (Math.abs(position) > maxScrollSlider) {
                position = -maxScrollSlider;
            }

            sliderLine.style.left = `${position}px`;
        }

        function sliderNavigation() {
            const sliderNavItems = document.querySelectorAll('.' + sliderNavItemClass);
            const showSlideWidth = sliderLine.offsetWidth/sliderNavItems.length;

            sliderNavItems.forEach((item, index) => {
                item.addEventListener('touchstart', () => {
                    position = -showSlideWidth * (index);
                    sliderMove()
                    toggleActiveSlide();
                });
            });
        }

        function toggleActiveSlide() {
            const sliderNavItems = sliderNav.querySelectorAll("." + sliderNavItemClass);

            const showSlideWidth = sliderLine.offsetWidth/sliderNavItems.length;

            sliderNavItems.forEach(item => {
                item.classList.remove("active");
            });

            for (let i = 0; i < sliderNavItems.length; i++) {

                if ((showSlideWidth * (i+1) + position >= window.screen.width/2) &&
                 (showSlideWidth * i + position <= window.screen.width/2)) {
                    sliderNavItems[i].classList.add("active");
                }
            }
        }

        function handleTouchStart(event) {
            event.preventDefault();
            event.stopPropagation();
            const firstTouch = event.touches[0];

            startPositionTouch = firstTouch.clientX;
            arrPositionTouchDiff = [0];
            sliderNavigation();
        }

        function handleTouchMove(event) {
            event.preventDefault();
            event.stopPropagation();

            if (!startPositionTouch) {
                return false;
            }

            PositionTouch = event.touches[0].clientX;

            PositionTouchDiff = PositionTouch - startPositionTouch;

            arrPositionTouchDiff.push(PositionTouchDiff);

            position += arrPositionTouchDiff[arrPositionTouchDiff.length - 1] -
             arrPositionTouchDiff[arrPositionTouchDiff.length - 2];

            sliderMove();
            toggleActiveSlide();
        }

        function handleTouchEnd() {
            const sliderNavItems = sliderNav.querySelectorAll("." + sliderNavItemClass);
            const showSlideWidth = sliderLine.offsetWidth/sliderNavItems.length;
            const sliderItemsCheckPoints = [];
            
            for (let i = 0; i < sliderNavItems.length; i++) {
                sliderItemsCheckPoints.push(-showSlideWidth * i);

                if ((-showSlideWidth * (i+1) <= position) && (-showSlideWidth * i > position)) {
                    if (PositionTouchDiff > 20) {
                        position = -showSlideWidth * (i);
                        sliderMove()
                        toggleActiveSlide();
                        sliderNavigation()
                    }
        
                    if (PositionTouchDiff < -20) {
                        position = -showSlideWidth * (i+1);
                        sliderMove();
                        toggleActiveSlide();
                        sliderNavigation()
                    }
                }
            }
        }

        const slider = document.querySelector(sliderSelector),
              sliderLine = document.querySelector(sliderLineSelector),
              sliderNav = document.querySelector(sliderNavSelector),
              sliderItems = document.querySelectorAll(sliderItemSelector);

        let startPositionTouch = null;
        let position = 0;
        let PositionTouch = 0;
        let PositionTouchDiff =  0;
        let arrPositionTouchDiff = [0];

        const maxScrollSlider = sliderLine.offsetWidth - window.screen.width + 2*slider.offsetLeft;

        slider.addEventListener('touchstart', handleTouchStart);
        slider.addEventListener('touchmove', handleTouchMove);
        slider.addEventListener('touchend', handleTouchEnd);

        createSliderNav();
        toggleActiveSlide();
        sliderNavigation();
    }

    if (window.screen.width < 992) {
        sliderSwiper(".advantage_slider", ".advantage_wrapper", ".advantage_item",
                     ".advantage_slider-nav", "advantage_slider-nav_item", 2);
        sliderSwiper(".seles_slider", ".seles_wrapper", ".seles_item",
                     ".seles_slider-nav", "seles_slider-nav_item", 1);
    } else {
        slider(".seles_wrapper", ".seles_item", ".seles_slider-nav",
               "seles_slider-nav_item", ".seles_arrow-left", ".seles_arrow-right", 2);
    }
});