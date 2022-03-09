window.addEventListener('DOMContentLoaded', () => {

    const slider = (sliderLineSelector, itemsSelector, sliderNavSelector, sliderNavItemClass, btnPreSelector, btnNextSelector) => {
        
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
            for (let i=0; i < items.length; i++) {
                const sliderNavItem = document.createElement("div");
                const div = document.createElement("div");
    
                sliderNavItem.className = sliderNavItemClass;
                sliderNav.append(sliderNavItem);
                sliderNavItem.append(div);
            }
        }

        function toggleActiveSlide() {
            const sliderNavItems = sliderNav.querySelectorAll("." + sliderNavItemClass);
            sliderNavItems.forEach((item, i) => {
                item.classList.remove("active");
                if (i === count) {
                    item.classList.add("active");
                }
            });
        }
        
        const items = document.querySelectorAll(itemsSelector);
        // const slider = document.querySelector(sliderSelector);
        const sliderLine = document.querySelector(sliderLineSelector);
        const sliderNext = document.querySelector(btnNextSelector);
        const sliderPre = document.querySelector(btnPreSelector);
        const sliderNav = document.querySelector(sliderNavSelector);
        
        let count = 0;
        let countShowSlids;

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


    };

    const sliderSwiper = (sliderSelector, sliderLineSelector, sliderItemSelector, sliderNavSelector, sliderNavItemClass, countShowSlids) => {
        
        function removeSliderNav() {
            while (sliderNav.firstChild) {
                sliderNav.firstChild.remove();
            }
        }

        function createSliderNav() {
            for (let i=0; i < sliderItems.length/countShowSlids; i++) {
                const sliderNavItem = document.createElement("div");
                const div = document.createElement("div");
    
                sliderNavItem.className = sliderNavItemClass;
                sliderNav.append(sliderNavItem);
                sliderNavItem.append(div);
            }
        }

        function toggleActiveSlide() {
            const sliderNavItems = sliderNav.querySelectorAll("." + sliderNavItemClass);
            sliderNavItems.forEach((item, i) => {
                item.classList.remove("active");
                if (i === count) {
                    item.classList.add("active");
                }
            });
        }

        function handleTouchStart(event) {
            event.preventDefault();
            event.stopPropagation();
            const firstTouch = event.touches[0];

            x1 = firstTouch.clientX;
            arrXDiff = [0];
        }

        function handleTouchMove(event) {
            event.preventDefault();
            event.stopPropagation();

            if (!x1) {
                return false;
            }

            let x2 = event.touches[0].clientX;

            let xDiff = x2 - x1;

            arrXDiff.push(xDiff);
            let i = arrXDiff.length - 1;
            let j = arrXDiff.length - 2;

            position += arrXDiff[arrXDiff.length - 1] - arrXDiff[arrXDiff.length - 2];

            if (position > 0) {
                position = 0;
            }

            if (Math.abs(position) > maxScrollSlider) {
                position = -maxScrollSlider;
            }

            sliderLine.style.left = `${position}px`
        }

        function scrollSlider () {

        }

        const slider = document.querySelector(sliderSelector),
              sliderLine = document.querySelector(sliderLineSelector),
              sliderNav = document.querySelector(sliderNavSelector),
              sliderItems = document.querySelectorAll(sliderItemSelector);

        let x1 = null;
        let count = 0;
        let position = 0;
        let arrXDiff = [0];
        let countShow = countShowSlids;

        const maxScrollSlider = sliderLine.offsetWidth - window.screen.width + 2*slider.offsetLeft;
        console.log(maxScrollSlider);

        slider.addEventListener('touchstart', handleTouchStart);
        slider.addEventListener('touchmove', handleTouchMove);
        slider.addEventListener('touchend', handleTouchEnd);

        createSliderNav();
        toggleActiveSlide();

        function handleTouchEnd(e) {
            
        }
    }

    slider(".seles_wrapper", ".seles_item", ".seles_slider-nav", "seles_slider-nav_item", ".seles_arrow-left", ".seles_arrow-right");

    sliderSwiper(".advantage_slider", ".advantage_wrapper", ".advantage_item", ".advantage_slider-nav", "advantage_slider-nav_item", 2);
    // window.addEventListener('resize', () => {
    //     slider(".seles_wrapper", ".seles_item", ".seles_slider-nav", "seles_slider-nav_item", ".seles_arrow-left", ".seles_arrow-right");
    // });
});