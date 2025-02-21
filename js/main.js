document.addEventListener("DOMContentLoaded", function () {
    // Tập hợp tất cả các phần tử cần sử dụng
    const backTop = document.querySelector("#back-top");
    // slide
    const autoSlides = document.querySelectorAll(".js__autoSlideContainer");

    const stickyHeaderPC = document.querySelector(".js__stickyHeader");
    const video169s = document.querySelectorAll(".js__video169");
    const fancyboxes = document.querySelectorAll(".fancybox-full");

    // show sub menu
    const dropdownSubMenu = document.querySelectorAll(".js__dropDown");
    const subMenu = document.querySelector(".js__clickShowMenuMb");

    // more menu
    const navbarMoreIcon = document.querySelector('.js__navbarMoreIcon')
    const navbarMoreContent = document.querySelector('.js__navbarMoreContent')


    // search mb
    const searchMbs = document.querySelectorAll(".js__searchMb");
    // navbar mb
    const navbarMb = document.querySelector(".js__navbarMenuMb");


    // Xử lý sự kiện khi nhấn nút "back to top"
    function handleBackTop() {
        if(!backTop) return;
        
        backTop.onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
        
    }

    // xử lý sự kiện để show sub menu
    function handleShowSubMenu() {
        if (!subMenu) return;
        var closeSubMenu = document.querySelector(".js__closeSubMenu");
        var overlay = document.querySelector(".js__overlay");
        var parentBox = subMenu.parentElement;

        subMenu.onclick = function () {
            this.parentElement.classList.add("active");
            document.querySelector("body").style.overflow = "hidden";
        };
        closeSubMenu.onclick = function () {
            parentBox.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };
        overlay.onclick = function () {
            parentBox.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };
    }


     // Xử lý tăng giảm font size
     function handleChangeFontSize() {
        const changeSizeButtonContainers = document.querySelectorAll('.js__changeSizeButton');

        if(changeSizeButtonContainers.length === 0) return

        changeSizeButtonContainers.forEach((changeSizeButtonContainer) => {
            const sizeDefault = changeSizeButtonContainer.querySelector('.js__defaultSize');
            const sizePlus = changeSizeButtonContainer.querySelector('.js__plusSize');
    
            const sizeContent = document.querySelector(".js__changeSizeContent");
            const paragraphs = sizeContent.querySelectorAll("p");
            let increaseCount = 0;
            const maxIncrease = 3;
    
            // Lưu kích thước mặc định ban đầu của từng thẻ <p>
            const defaultFontSizes = Array.from(paragraphs).map((p) =>
                parseInt(window.getComputedStyle(p).fontSize)
            );
    
            sizePlus.onclick = function () {
                if (increaseCount < maxIncrease) {
                    increaseCount++;
                    paragraphs.forEach((paragraph, index) => {
                        const newFontSize = defaultFontSizes[index] + increaseCount + "px";
                        paragraph.style.fontSize = newFontSize;
                    });
                }
            };
    
            sizeDefault.onclick = function () {
                if (increaseCount > 0) {
                    increaseCount--;
                    paragraphs.forEach((paragraph, index) => {
                        const newFontSize = defaultFontSizes[index] + increaseCount + "px";
                        paragraph.style.fontSize = newFontSize;
                    });
                }
            };
        });
    }
    // xử lý sự kiện show more menu
    function handleMoreMenu() {
        if(!navbarMoreIcon || !navbarMoreContent) return;

        navbarMoreIcon.onclick = function() {
            this.classList.toggle('active')
            navbarMoreContent.classList.toggle('active')
        }

    }

    // Xử lý sự kiện để show dropdown submenu
    function handleShowDropdownSubMenu() {
        dropdownSubMenu &&
            dropdownSubMenu.forEach((item) => {
                var parent = item.parentElement;
                var nextEle = parent.querySelector(".js__listSubMenu");
                item.onclick = function () {
                    parent.classList.toggle("active");
                    if (nextEle.style.maxHeight) {
                        nextEle.style.maxHeight = null;
                    } else {
                        nextEle.style.maxHeight = nextEle.scrollHeight + "px";
                    }
                };
            });
    }

    // Xử lý sự kiện show search mb
    function handleShowSearchMb() {
        if (!searchMbs) return;
        searchMbs.forEach((searchMb) => {
            var closeSearchMb =
                document.querySelector(".js__closeSearchMb");
            var formSearchMb = document.querySelector(".js__formSearchMb");
            const focusElement =
                formSearchMb.querySelector(".js__focusSearchMb");
            searchMb.onclick = function () {
                formSearchMb.classList.add("active");
                focusElement.focus();
            };
            closeSearchMb.onclick = function () {
                formSearchMb.classList.remove("active");
                focusElement.value = "";
            };
        });
    }

    // Xử lý sự kiện scroll navbar mb
    function handleNavbarMb() {
        if (!navbarMb) return;

        const container = navbarMb.querySelector(".js__navbarMb");
        const scrollBtn = navbarMb.querySelector(".js__navbarIcon");

        let scrollAmount = 0;
        let scrollPosition = 0;

        scrollBtn.addEventListener("click", function () {
            const scrollDistance = 100;
            scrollAmount = scrollPosition + scrollDistance;
            scrollAmount = Math.min(
                scrollAmount,
                container.scrollWidth - container.clientWidth
            );
            container.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            });
            scrollPosition = scrollAmount;
        });
    }

    // Xử lý video tỉ lệ 16:9
    function handleVideo169() {
        if (video169s) {
            video169s.forEach((video169) => {
                var videos = video169.querySelectorAll("iframe");
                if (videos) {
                    videos.forEach((video) => {
                        var w = video.offsetWidth;
                        video.style.height = (w * 9) / 16 + "px";
                    });
                }
            });
        }
    }

    // Khởi tạo fancybox
    function initFancybox() {
        if (fancyboxes) {
            fancyboxes.forEach(function () {
                $(".fancybox-full a").fancybox();
            });
        }
    }

    // khởi tạo slider với nhiều item có width auto
    function initSliderAutoItems() {
        if (autoSlides) {
            autoSlides.forEach((item) => {
                var slider = item.querySelector(".js__swiperAuto");
                var next = item.querySelector(".swiper-button-next");
                var prev = item.querySelector(".swiper-button-prev");
                new Swiper(slider, {
                    slidesPerView: "auto",
                    spaceBetween: 20,
                    navigation: {
                        nextEl: next || null,
                        prevEl: prev || null,
                    },
                });
            });
        }
    }

    // Xử lý thanh header dính
    function handleStickyHeader() {
        if (stickyHeaderPC) {
            const isSticky = scrollY > 300;
            stickyHeaderPC.classList.toggle("sticky", isSticky);
        }
    }
    // Hàm hiển thị nút backTop dựa trên vị trí cuộn trang
function handleBackTopVisibility() {
    if (backTop) {
        if (
            document.body.scrollTop > 300 ||
            document.documentElement.scrollTop > 300
        ) {
            backTop.style.opacity = 1;
            backTop.style.visibility = "visible";
        } else {
            backTop.style.opacity = 0;
            backTop.style.visibility = "hidden";
        }
    }
}
    // Xử lý sự kiện khi cuộn trang
    function handleWindowScroll() {
        window.onscroll = function () {
            handleStickyHeader();
            handleBackTopVisibility()
        };
    }

    // Khởi tạo tất cả các chức năng
    function initApp() {
        handleBackTop();
        handleShowSubMenu();
        handleShowDropdownSubMenu();
        handleMoreMenu();
        handleShowSearchMb();
        handleNavbarMb();
        handleVideo169();
        initFancybox();
        handleChangeFontSize();
        // slide
        initSliderAutoItems();
        // scroll
        handleWindowScroll();
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});
