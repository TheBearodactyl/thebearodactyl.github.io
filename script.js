var discord_link = document.getElementById("discord-link");
var hard_to_read = document.getElementById("hardtoread");
var alliwantaudio = new Audio("assets/audio/alliwant.mp3");
var is_hard_to_read = false;
var ImageCarousel = /** @class */ (function () {
    function ImageCarousel(container_id, slides) {
        this.curr_idx = 0;
        this.slide_elements = [];
        var el = document.getElementById(container_id);
        if (!el) {
            throw new Error("element with id \"".concat(container_id, "\" not found"));
        }
        this.container = el;
        this.slides = slides;
        this.init();
    }
    ImageCarousel.prototype.init = function () {
        var _this = this;
        this.container.classList.add("carousel-container");
        var fragment = document.createDocumentFragment();
        this.slides.forEach(function (slide, idx) {
            var slide_el = document.createElement("div");
            slide_el.classList.add("carousel-slide");
            if (idx === 0) {
                slide_el.classList.add("active");
            }
            var img = document.createElement("img");
            img.src = slide.src;
            img.alt = slide.caption;
            img.classList.add("carousel-image");
            if (idx === 0) {
                img.setAttribute("fetchpriority", "high");
            }
            else {
                img.loading = "lazy";
            }
            var caption = document.createElement("div");
            caption.classList.add("carousel-caption");
            caption.textContent = slide.caption;
            slide_el.append(img, caption);
            _this.slide_elements.push(slide_el);
            fragment.appendChild(slide_el);
        });
        this.container.appendChild(fragment);
        this.create_controls();
    };
    ImageCarousel.prototype.create_controls = function () {
        var _this = this;
        var nav = document.createElement("nav");
        nav.classList.add("carousel-nav");
        var prev_btn = document.createElement("button");
        var next_btn = document.createElement("button");
        prev_btn.classList.add("carousel-btn", "carousel-btn-prev");
        prev_btn.setAttribute("aria-label", "Previous slide");
        prev_btn.textContent = "<";
        prev_btn.onclick = function () { return _this.move(-1); };
        next_btn.classList.add("carousel-btn", "carousel-btn-next");
        next_btn.setAttribute("aria-label", "Next slide");
        next_btn.textContent = ">";
        next_btn.onclick = function () { return _this.move(1); };
        nav.append(prev_btn, next_btn);
        this.container.appendChild(nav);
    };
    ImageCarousel.prototype.move = function (direction) {
        this.slide_elements[this.curr_idx].classList.remove("active");
        this.curr_idx =
            (this.curr_idx + direction + this.slides.length) %
                this.slides.length;
        this.slide_elements[this.curr_idx].classList.add("active");
    };
    return ImageCarousel;
}());
function randomize_case(input) {
    return Array.from(input)
        .map(function (char) {
        return Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase();
    })
        .join("");
}
function animate_title(base_title, interval_ms) {
    if (interval_ms === void 0) { interval_ms = 200; }
    var interval_id = setInterval(function () {
        document.title = randomize_case(base_title);
    }, interval_ms);
    return function () {
        clearInterval(interval_id);
        document.title = base_title;
    };
}
var stop_title_anim = animate_title("the motherfucking bearodactyl", 100);
var things_i_like = [
    { src: "./assets/images/reggie.png", caption: "Reggie (of course)" },
    { src: "./assets/images/rust.gif", caption: "Rust (the language)" },
    { src: "./assets/images/spaghetti.png", caption: "Spaghetti" },
];
document.addEventListener("DOMContentLoaded", function () {
    new ImageCarousel("things-i-like", things_i_like);
});
discord_link === null || discord_link === void 0 ? void 0 : discord_link.addEventListener("click", function () {
    navigator.clipboard.writeText("@thebearodactyl");
});
function set_css_var(v, val) {
    document.documentElement.style.setProperty(v, val);
}
hard_to_read === null || hard_to_read === void 0 ? void 0 : hard_to_read.addEventListener("click", function () {
    is_hard_to_read = !is_hard_to_read;
    if (is_hard_to_read) {
        alliwantaudio.play();
        set_css_var("--bg-color", "#B0BF1A");
        set_css_var("--text-color", "#2E6F40");
        set_css_var("--text-size", "1px");
    }
    else {
        alliwantaudio.pause();
        set_css_var("--bg-color", "#191724");
        set_css_var("--text-color", "#E0DEF4");
        set_css_var("--text-size", "16px");
    }
});
