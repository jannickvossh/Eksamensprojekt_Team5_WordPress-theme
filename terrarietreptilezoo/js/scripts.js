/*
 * Functionality for headers and site navigations
 */

const siteHeader = document.getElementById('site-header');
const mobileMenuOpen = document.getElementById('mobile-menu-open');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');

// Get all focusable elements inside the mobile menu
const getFocusableElements = () => {
    return mobileMenu.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
};

// Function to trap focus in menu
const trapFocusInMenu = (shouldTrap) => {
    // Find alle fokusérbare elementer på siden
    const allFocusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');

    allFocusableElements.forEach(element => {
        // Hvis elementet ikke er i menuen og ikke er åbn-knappen
        if (!mobileMenu.contains(element) && element !== mobileMenuOpen) {
            if (shouldTrap) {
                // Gør elementet ufokusérbart når menuen er åben
                element.setAttribute('tabindex', '-1');
                element.setAttribute('aria-hidden', 'true');
            } else {
                // Gendan fokusérbarhed når menuen lukkes
                element.removeAttribute('tabindex');
                element.removeAttribute('aria-hidden');
            }
        }
    });
};

// Function to manage focusable elements based on menu state
const manageFocusableElements = (isOpen) => {
    const focusableElements = getFocusableElements();

    focusableElements.forEach(element => {
        if (isOpen) {
            // Remove tabindex=-1 when menu is open
            element.removeAttribute('tabindex');
        } else {
            // Add tabindex=-1 when menu is closed to prevent focus
            element.setAttribute('tabindex', '-1');
        }
    });
};

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        siteHeader.classList.add('is-scrolled');
    } else {
        siteHeader.classList.remove('is-scrolled');
    }
});

// Function to close the mobile menu
const closeMobileMenu = () => {
    if (mobileMenu.classList.contains('is-open')) {
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('no-scroll');

        // Update ARIA attributes when menu is closed
        mobileMenuOpen.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');

        // Make elements unfocusable when menu is closed
        manageFocusableElements(false);

        // Remove focus trap
        trapFocusInMenu(false);

        // Return focus to the open button
        mobileMenuOpen.focus();
    }
};

if (mobileMenuOpen != null && mobileMenu != null) {
    // Add ARIA attributes
    mobileMenuOpen.setAttribute('aria-label', 'Open mobile menu');
    mobileMenuOpen.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');

    // Initially make all focusable elements inside menu unfocusable
    manageFocusableElements(false);

    mobileMenuOpen.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('is-open')) {
            mobileMenu.classList.add('is-open');
            document.body.classList.add('no-scroll');

            // Update ARIA attributes when menu is opened
            mobileMenuOpen.setAttribute('aria-expanded', 'true');
            mobileMenu.setAttribute('aria-hidden', 'false');

            // Make elements focusable when menu is open
            manageFocusableElements(true);

            // Trap focus in mobile menu
            trapFocusInMenu(true);

            // Optional: Move focus to first focusable element or close button
            if (mobileMenuClose) {
                mobileMenuClose.focus();
            }
        }
    });

    // Add keyboard event listener to close menu with Escape key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            closeMobileMenu();
        }
    });
}

if (mobileMenuClose != null && mobileMenu != null) {
    // Add ARIA attribute for close button
    mobileMenuClose.setAttribute('aria-label', 'Close mobile menu');

    mobileMenuClose.addEventListener('click', () => {
        closeMobileMenu();
    });
}

/*
 * Functionality for carousels
 */

if (document.querySelectorAll('.is-carousel')) {
    const carouselItems = document.querySelectorAll('.is-carousel');

    for (let i = 0; i < carouselItems.length; i++) {
        createPagination(carouselItems[i]);
        const paginationPrev = carouselItems[i].querySelector('.pagination-arrows__arrow--prev');
        const paginationNext = carouselItems[i].querySelector('.pagination-arrows__arrow--next');

        let carouselItem;

        if (carouselItems[i].classList.contains('wp-block-post-template')) {
            carouselItem = carouselItems[i].querySelectorAll('.wp-block-post');
        } else {
            carouselItem = carouselItems[i].querySelectorAll('.wp-block-column');
        }

        carouselItem.forEach((item) => {
            item.classList.add('carousel-item');
        });

        let itemCount = carouselItem.length;
        // console.log(itemCount);
        let itemsInView;

        if (itemCount.length == 1) {
            carouselItems[i].classList.add('item-count--1');
        } else if (itemCount.length == 2) {
            carouselItems[i].classList.add('item-count--2');
        } else if (itemCount >= 3) {
            carouselItems[i].classList.add('item-count--3');
        }

        // On ios, if the address bar shows or hides, it calls a risize event, which it shouldnt. To prevent this, we only check resize in width.
        let lastWidth = window.innerWidth;

        window.addEventListener('resize', () => {
            if (window.innerWidth !== lastWidth) {
                lastWidth = window.innerWidth;
                carouselReset(carouselItem);
            }
        });

        if (window.innerWidth < 600) {
            itemsInView = 1;
        } else if (window.innerWidth >= 600 && window.innerWidth < 840) {
            itemsInView = 2;
        } else {
            itemsInView = 3;
        }

        paginationPrev.addEventListener('click', () => {
            carouselPrev(carouselItems[i], carouselItem);
        });

        paginationNext.addEventListener('click', () => {
            carouselNext(carouselItems[i], carouselItem, itemCount, itemsInView);
        });

        // Tilføj simpel swipe-detektion til carousel
        addSwipeToCarousel(carouselItems[i], carouselItem, itemCount, itemsInView);
    }
}

function carouselReset(carouselItem) {
    for (let i = 0; i < carouselItem.length; i++) {
        carouselItem[i].style.transform = "translateX(0px)";
    }
}

function carouselPrev(carousel, carouselItem) {
    let carouselX = carousel.getBoundingClientRect().x;
    let itemX = carouselItem[0].getBoundingClientRect().x;
    let itemWidth = carouselItem[0].getBoundingClientRect().width;
    let itemGap = carouselItem[1].getBoundingClientRect().x - itemX - itemWidth;
    let currentPos = itemX - carouselX;
    if (currentPos >= -1) {
        currentPos = 0;
    } else {
        for (let i = 0; i < carouselItem.length; i++) {
            carouselItem[i].style.transform = "translateX(" + (currentPos + itemWidth + itemGap) + "px)";
        }
    }
}

function carouselNext(carousel, carouselItem, count, inView) {
    let carouselX = carousel.getBoundingClientRect().x;
    let itemX = carouselItem[0].getBoundingClientRect().x;
    let itemWidth = carouselItem[0].getBoundingClientRect().width;
    let itemGap = carouselItem[1].getBoundingClientRect().x - itemX - itemWidth;
    let allItemsWidth = (itemWidth + itemGap) * count - itemGap;
    let currentPos = itemX - carouselX;
    if (currentPos < ((allItemsWidth - (itemWidth + itemGap) * (inView)) * -1)) {
        currentPos = allItemsWidth;
    } else {
        for (let i = 0; i < carouselItem.length; i++) {
            carouselItem[i].style.transform = "translateX(" + (currentPos - itemWidth - itemGap) + "px)";
        }
    }
}

function createPagination(parent) {
    const paginationArrows = document.createElement("div");
    const paginationArrowPrev = document.createElement("div");
    const paginationArrowNext = document.createElement("div");

    const paginationArrowIcon = '<svg class="pagination-arrows__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 25.455"><path d="M30,10H12.044c2.204-2.838,3.41-6.443,3.41-10h-5.455c0,4.916-3.4,10-9.091,10h-.909v5.455h.909c5.691,0,9.091,5.085,9.091,10h5.455c0-3.557-1.207-7.162-3.411-10h17.956v-5.455Z"/></svg>';
    paginationArrowPrev.innerHTML = paginationArrowIcon;
    paginationArrowNext.innerHTML = paginationArrowIcon;

    paginationArrows.classList.add('pagination-arrows');
    paginationArrowPrev.classList.add('pagination-arrows__arrow', 'pagination-arrows__arrow--prev');
    paginationArrowNext.classList.add('pagination-arrows__arrow', 'pagination-arrows__arrow--next');

    paginationArrows.append(paginationArrowPrev, paginationArrowNext);
    parent.appendChild(paginationArrows);
}

// // // // FOR JANNICK FROM FREDERIK // // // //

// Simple swipe-function that implements swiping / dragging with existing functionality
function addSwipeToCarousel(carousel, carouselItem, itemCount, itemsInView) {
    let startX = 0;
    let startY = 0; // Track vertical position too
    let isSwiping = false;
    let hasMoved = false;
    let minimumSwipe = 40;
    let isHorizontalSwipe = false; // Flag to determine swipe direction

    // Prevent dragging of ALL elements in the carousel (images, links, text, etc.)
    carousel.querySelectorAll('*').forEach(element => {
        element.addEventListener('dragstart', e => e.preventDefault());
    });

    // Add specific handling for images to prevent default browser drag behavior
    carousel.querySelectorAll('img').forEach(img => {
        img.style.userSelect = 'none';
        img.style.webkitUserDrag = 'none';
        img.style.MozUserDrag = 'none';
        img.draggable = false; // Use property instead of setAttribute
        
        // Add pointer-events style to allow touch events to pass through
        img.style.pointerEvents = 'auto';
    });

    // Apply a grab cursor to show the carousel is draggable
    carousel.style.cursor = 'grab';
    
    // Helper function to check if element should be excluded from swiping
    function shouldExcludeFromSwiping(element) {
        // Only exclude navigation arrows and buttons
        return element.closest('.pagination-arrows__arrow') ||
            element.tagName === 'BUTTON' ||
            element.closest('button') !== null;
    }

    // Function to disable/enable scrolling
    function disableScroll() {
        document.body.classList.add('no-scroll-y');
    }

    function enableScroll() {
        document.body.classList.remove('no-scroll-y');
    }

    // Touch events - SINGLE touchstart event (removed duplicate)
    carousel.addEventListener('touchstart', e => {
        // Don't initiate swipe on buttons or navigation arrows
        if (shouldExcludeFromSwiping(e.target)) {
            isSwiping = false;
            return;
        }

        hasMoved = false;
        isHorizontalSwipe = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isSwiping = true;
        
        // Change cursor to grabbing during swipe
        carousel.style.cursor = 'grabbing';
    }, { passive: true });

    // Add touchmove event listener to detect swipe direction
    carousel.addEventListener('touchmove', e => {
        if (!isSwiping) return;
        
        const moveX = e.touches[0].clientX;
        const moveY = e.touches[0].clientY;
        const diffX = moveX - startX;
        const diffY = moveY - startY;
        
        // Mark as moved if there is any significant movement
        if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
            hasMoved = true;
            
            // Determine if this is primarily a horizontal swipe
            // If horizontal movement is greater than vertical by a factor of * (number)
            if (Math.abs(diffX) > Math.abs(diffY) * 0.8) {
                isHorizontalSwipe = true;
                
                // Only prevent default if it's primarily horizontal
                if (e.cancelable) {
                    e.preventDefault();
                    disableScroll();
                }
            }
        }
    }, { passive: false }); // Important: passive: false to allow preventDefault

    carousel.addEventListener('touchend', e => {
        if (!isSwiping) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        isSwiping = false;
        enableScroll(); // Re-enable scroll when touch ends
        carousel.style.cursor = 'grab'; // Restore grab cursor

        // If no movement or not horizontal swipe, allow normal link function
        if (!hasMoved || !isHorizontalSwipe) {
            return;
        }

        // Only activate swipe if moved enough
        if (Math.abs(diffX) > minimumSwipe) {
            if (diffX > 0) {
                carouselPrev(carousel, carouselItem);
            } else {
                carouselNext(carousel, carouselItem, itemCount, itemsInView);
            }
        }
    }, { passive: true });

    // Mouse events
    carousel.addEventListener('mousedown', e => {
        // Don't initiate swipe on buttons or navigation arrows
        if (shouldExcludeFromSwiping(e.target)) {
            isSwiping = false;
            return;
        }

        hasMoved = false;
        startX = e.clientX;
        startY = e.clientY;
        isSwiping = true;
        
        // Change cursor to grabbing during swipe
        carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mousemove', e => {
        if (!isSwiping) return;

        const diffX = e.clientX - startX;
        const diffY = e.clientY - startY;
        
        // Mark as moved with any significant movement
        if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
            hasMoved = true;
            
            // Only disable scroll and prevent default if primarily horizontal
            if (Math.abs(diffX) > Math.abs(diffY) * 0.8) {
                disableScroll();
                e.preventDefault();
            }
        }
    });

    carousel.addEventListener('mouseup', e => {
        if (!isSwiping) return;

        const diffX = e.clientX - startX;

        isSwiping = false;
        enableScroll(); // Re-enable scroll when mouse click ends
        carousel.style.cursor = 'grab'; // Restore grab cursor

        // If no movement, allow normal link function
        if (!hasMoved) {
            return;
        }

        // Only activate swipe if moved enough
        if (Math.abs(diffX) > minimumSwipe) {
            if (diffX > 0) {
                carouselPrev(carousel, carouselItem);
            } else {
                carouselNext(carousel, carouselItem, itemCount, itemsInView);
            }
        }
    });

    carousel.addEventListener('mouseleave', () => {
        if (isSwiping) {
            isSwiping = false;
            enableScroll(); // Re-enable scroll if mouse leaves element
            carousel.style.cursor = 'grab'; // Restore grab cursor
        }
    });
}

// // // // FOR JANNICK // // // //

/*
 * Accordion function for mobile navigation
 */

const mobileNav = document.getElementById('primary-menu-list-mobile');
const mobileNavParents = mobileNav.querySelectorAll('.menu-item-has-children');

for (let i = 0; i < mobileNavParents.length; i++) {
    const subMenu = mobileNavParents[i].querySelector('.sub-menu');
    const subMenuItems = subMenu.querySelectorAll('.menu-item');

    mobileNavParents[i].firstChild.href = "#";

    subMenu.classList.add(`item-count--${subMenuItems.length}`);

    mobileNavParents[i].firstChild.addEventListener('click', (e) => {
        e.preventDefault();

        if (!subMenu.classList.contains('is-open')) {
            subMenu.classList.add('is-open');
        } else {
            subMenu.classList.remove('is-open');
        }
    });
}