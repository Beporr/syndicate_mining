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
            console.log("removeSliderNav")
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

        console.log(1);
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

    slider(".seles_wrapper", ".seles_item", ".seles_slider-nav", "seles_slider-nav_item", ".seles_arrow-left", ".seles_arrow-right");

    window.addEventListener('resize', () => {
        slider(".seles_wrapper", ".seles_item", ".seles_slider-nav", "seles_slider-nav_item", ".seles_arrow-left", ".seles_arrow-right");
    });
});