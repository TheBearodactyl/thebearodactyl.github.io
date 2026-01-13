const discord_link = document.getElementById("discord-link");
const hard_to_read = document.getElementById("hardtoread");
const alliwantaudio = new Audio("assets/audio/alliwant.mp3");
var is_hard_to_read = false;

interface SlideData {
	src: string;
	caption: string;
}

class ImageCarousel {
	private container: HTMLElement;
	private slides: SlideData[];
	private curr_idx: number = 0;
	private slide_elements: HTMLElement[] = [];

	constructor(container_id: string, slides: SlideData[]) {
		const el = document.getElementById(container_id);

		if (!el) {
			throw new Error(`element with id "${container_id}" not found`);
		}

		this.container = el;
		this.slides = slides;
		this.init();
	}

	private init(): void {
		this.container.classList.add("carousel-container");
		const fragment = document.createDocumentFragment();

		this.slides.forEach((slide, idx) => {
			const slide_el = document.createElement("div");
			slide_el.classList.add("carousel-slide");

			if (idx === 0) {
				slide_el.classList.add("active");
			}

			const img = document.createElement("img");
			img.src = slide.src;
			img.alt = slide.caption;
			img.classList.add("carousel-image");

			if (idx === 0) {
				img.setAttribute("fetchpriority", "high");
			} else {
				img.loading = "lazy";
			}

			const caption = document.createElement("div");
			caption.classList.add("carousel-caption");
			caption.textContent = slide.caption;

			slide_el.append(img, caption);
			this.slide_elements.push(slide_el);
			fragment.appendChild(slide_el);
		});

		this.container.appendChild(fragment);
		this.create_controls();
	}

	private create_controls(): void {
		const nav = document.createElement("nav");
		nav.classList.add("carousel-nav");

		const prev_btn = document.createElement("button");
		const next_btn = document.createElement("button");

		prev_btn.classList.add("carousel-btn", "carousel-btn-prev");
		prev_btn.setAttribute("aria-label", "Previous slide");
		prev_btn.textContent = "<";
		prev_btn.onclick = () => this.move(-1);

		next_btn.classList.add("carousel-btn", "carousel-btn-next");
		next_btn.setAttribute("aria-label", "Next slide");
		next_btn.textContent = ">";
		next_btn.onclick = () => this.move(1);

		nav.append(prev_btn, next_btn);
		this.container.appendChild(nav);
	}

	private move(direction: number): void {
		this.slide_elements[this.curr_idx].classList.remove("active");

		this.curr_idx =
			(this.curr_idx + direction + this.slides.length) %
			this.slides.length;

		this.slide_elements[this.curr_idx].classList.add("active");
	}
}

function randomize_case(input: string): string {
	return Array.from(input)
		.map((char) =>
			Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase(),
		)
		.join("");
}

function animate_title(
	base_title: string,
	interval_ms: number = 200,
): () => void {
	const interval_id: ReturnType<typeof setInterval> = setInterval(() => {
		document.title = randomize_case(base_title);
	}, interval_ms);

	return () => {
		clearInterval(interval_id);
		document.title = base_title;
	};
}

const stop_title_anim = animate_title("the motherfucking bearodactyl", 200);

const things_i_like: SlideData[] = [
	{ src: "./assets/images/reggie.png", caption: "Reggie (of course)" },
	{ src: "./assets/images/rust.gif", caption: "Rust (the language)" },
	{ src: "./assets/images/spaghetti.png", caption: "Spaghetti" },
	{ src: "./assets/images/op.png", caption: "One Piece" },
];

document.addEventListener("DOMContentLoaded", () => {
	new ImageCarousel("things-i-like", things_i_like);
});

discord_link?.addEventListener("click", () => {
	navigator.clipboard.writeText("@thebearodactyl");
});

function set_css_var(v: string, val: string): void {
	document.documentElement.style.setProperty(v, val);
}

hard_to_read?.addEventListener("click", () => {
	is_hard_to_read = !is_hard_to_read;

	if (is_hard_to_read) {
		alliwantaudio.play();
		set_css_var("--bg-color", "#B0BF1A");
		set_css_var("--text-color", "#2E6F40");
		set_css_var("--text-size", "1px");
	} else {
		alliwantaudio.pause();
		set_css_var("--bg-color", "#191724");
		set_css_var("--text-color", "#E0DEF4");
		set_css_var("--text-size", "16px");
	}
});
