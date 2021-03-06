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
                    if (index * countShowSlids < items.length - 1) {
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
        // console.log(sliderLine.offsetHeight);

        // sliderLine.parentNode.style.height = sliderLine.scrollHeight + 20 + "px";
        let count = 0;
        // console.log(sliderLine.offsetHeight);


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
        setTimeout(() => {
            sliderLine.parentNode.style.height = sliderLine.scrollHeight + 20 + "px";
        }, 10);
        console.log(sliderLine.scrollHeight)
    };

    const sliderSwiper = (sliderSelector, sliderLineSelector, sliderItemSelector,
          sliderNavSelector, sliderNavItemClass, countShowSlids) => {
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

            let sliderIndex = Math.abs(position/showSlideWidth);

            if (Math.floor(sliderIndex) < sliderNavItems.length) {
                sliderNavItems[Math.floor(sliderIndex)].classList.add("active");
            }
        }

        function handleTouchStart(event) {
            const firstTouch = event.touches[0];

            startPositionTouch = firstTouch.clientX;
            arrPositionTouchDiff = [0];
        }

        function handleTouchMove(event) {
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

        function handleTouchEnd(event) {
            const sliderNavItems = sliderNav.querySelectorAll("." + sliderNavItemClass);
            const showSlideWidth = sliderLine.offsetWidth/sliderNavItems.length;
            
            for (let i = 0; i < sliderNavItems.length; i++) {

                if ((-showSlideWidth * (i+1) <= position) && (-showSlideWidth * i > position)) {
                    if (PositionTouchDiff > 20) {
                        position = -showSlideWidth * i;
                    }
        
                    if (PositionTouchDiff < -20) {
                        position = -showSlideWidth * (i+1);
                    }

                    sliderMove();
                    toggleActiveSlide();
                }
            }
        }

        const slider = document.querySelector(sliderSelector),
              sliderLine = document.querySelector(sliderLineSelector),
              sliderNav = document.querySelector(sliderNavSelector),
              sliderItems = document.querySelectorAll(sliderItemSelector);

        // sliderLine.parentNode.style.height = sliderLine.offsetHeight * 1.4 + 20 + "px";

        let startPositionTouch = null;
        let position = 0;
        let PositionTouch = 0;
        let PositionTouchDiff =  0;
        let arrPositionTouchDiff = [0];

        removeSliderNav();
        createSliderNav();
        sliderNavigation();
        toggleActiveSlide();

        const sliderNavItems = sliderNav.querySelectorAll("." + sliderNavItemClass);        
        const maxScrollSlider = sliderLine.offsetWidth - sliderLine.offsetWidth / sliderNavItems.length;

        slider.addEventListener('touchstart', handleTouchStart);
        slider.addEventListener('touchmove', handleTouchMove);
        slider.addEventListener('touchend', handleTouchEnd);

    }

    const popup = (modalSelector, modalOpenSelector, modalCloseSelector, modalBtnSelector = null, formSelector = null) => {

        const modal = document.querySelector(modalSelector);
        const modalOpen = document.querySelectorAll(modalOpenSelector);
        const modalClose = document.querySelector(modalCloseSelector);
        const modalBtn = document.querySelector(modalBtnSelector);

        if(formSelector) {
            const form = document.querySelector(formSelector);
            

            form.onsubmit = function () {
                const inputs = document.querySelectorAll(formSelector + " input");
                const checkBox = inputs[3];
                let emptyInputs = Array.from(inputs).filter(input => input.value === '');
                
                inputs.forEach(input => {
                    if (input.value === "") {
                        input.classList.add('invalid');
                    } else {
                        input.classList.remove('invalid');
                    }
                });
                
                if (checkBox) {
                    if(!checkBox.checked) {
                        checkBox.classList.add("invalid");
                        console.log('no checkBox')
                        return false;
                    } else {
                        checkBox.classList.remove("invalid");
                    }
                }
                
                if (emptyInputs.length !== 0) {
                    console.log('no input')
                    return false;
                }
                
                console.log("Check")
                modal.style.display = 'none';
                document.querySelector(".popup-success").style.display = 'flex';
                return false;
            }

        }

        modalOpen.forEach(item => {
            item.addEventListener('click', () => {
                document.body.style.overflow = 'hidden';
                modal.style.display = 'flex';
            });
        });

        modalClose.addEventListener('click', () => {
            document.body.style.overflow = 'visible';
            modal.style.display = 'none';
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.style.overflow = 'visible';
                modal.style.display = 'none';
            }
        });
    };

    popup(".popup", "[data-popup]", ".popup_close", ".popup_form_button", ".popup_form");
    popup(".popup-success", 'none', ".popup-success_close", ".question_form_btn", ".question_form");
    
    if (window.screen.width >= 992) {
        slider(".seles_wrapper", ".seles_item", ".seles_slider-nav",
               "seles_slider-nav_item", ".seles_arrow-left", ".seles_arrow-right", 2);
    
        slider(".seles_wrapper", ".seles_item", ".seles_slider-nav",
        "seles_slider-nav_item", ".seles_arrow-left", ".seles_arrow-right", 2);        }

    if (window.screen.width < 992 && window.screen.width >= 768) {
        sliderSwiper(".seles_slider", ".seles_wrapper", ".seles_item",
                     ".seles_slider-nav", "seles_slider-nav_item", 2);
    }

    if (window.screen.width < 768) {
        sliderSwiper(".advantage_slider", ".advantage_wrapper", ".advantage_item",
                     ".advantage_slider-nav", "advantage_slider-nav_item", 2);
        sliderSwiper(".seles_slider", ".seles_wrapper", ".seles_item",
                     ".seles_slider-nav", "seles_slider-nav_item", 1);
    }


    window.addEventListener("resize", () => {
        if (window.screen.width >= 992) {
            slider(".seles_wrapper", ".seles_item", ".seles_slider-nav",
                   "seles_slider-nav_item", ".seles_arrow-left", ".seles_arrow-right", 2);
        }
    
        if (window.screen.width < 992 && window.screen.width >= 768) {
            sliderSwiper(".seles_slider", ".seles_wrapper", ".seles_item",
                         ".seles_slider-nav", "seles_slider-nav_item", 2);
        }
    
        if (window.screen.width < 768) {
            sliderSwiper(".advantage_slider", ".advantage_wrapper", ".advantage_item",
                         ".advantage_slider-nav", "advantage_slider-nav_item", 2);
            sliderSwiper(".seles_slider", ".seles_wrapper", ".seles_item",
                         ".seles_slider-nav", "seles_slider-nav_item", 1);
        }
    })
});