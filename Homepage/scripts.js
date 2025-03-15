document.addEventListener('DOMContentLoaded', () => {
    const carousel = {
        slides: document.querySelectorAll('.slide-item'),
        current: 0,

        // 初始化
        init() {
            this.bindEvents();
            this.updateDisplay(this.current);
        },

        // 绑定事件
        bindEvents() {
            const nextBtn = document.querySelector('.next');
            const prevBtn = document.querySelector('.prev');

            if (nextBtn && prevBtn) {
                nextBtn.addEventListener('click', () => this.next());
                prevBtn.addEventListener('click', () => this.prev());
            }

            // 触摸滑动支持
            let touchStartX = 0;
            const slidesContainer = document.querySelector('.slides');
            slidesContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });
            slidesContainer.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) {
                    diff > 0 ? this.next() : this.prev();
                }
            });

            // 键盘导航支持
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prev();
                if (e.key === 'ArrowRight') this.next();
            });
        },

        // 更新显示
        updateDisplay(index) {
            this.slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
                slide.style.zIndex = i === index ? 2 : 1;
            });
            this.current = index;
        },

        // 下一张
        next() {
            this.updateDisplay((this.current + 1) % this.slides.length);
        },

        // 上一张
        prev() {
            this.updateDisplay((this.current - 1 + this.slides.length) % this.slides.length);
        }
    };

    // 初始化轮播
    carousel.init();
});