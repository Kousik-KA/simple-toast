const DEFAULT_OPTIONS = {
  position: "top-right",
  autoClose: 5000,
  animation: "shrink",
  onClose: () => {},
  closeOnClick: true,
  showCloseButton: true,
  showProgressBar: true,
  pauseOnHover: false,
  type: "default",
  theme: "light",
};

class Toast {
  #_options = null;
  #_toast = null;
  #_timeVisible = 0;
  #_isPaused = false;
  #_timeoutId = null;
  #_intervalId = null;
  #_bindedRemove = this.remove.bind(this);

  constructor(options) {
    // Create the toast
    this.#_toast = document.createElement("div");
    this.#_toast.classList.add("toast");

    this.pause = () => {
      if (this.#_timeoutId) {
        clearTimeout(this.#_timeoutId);
        this.#_timeoutId = null;
      }
      this.#_isPaused = true;
    };
    this.resume = () => {
      if (this.#_options.autoClose !== false && !this.#_timeoutId) {
        this.#_timeoutId = setTimeout(() => {
          this.remove();
          clearTimeout(this.#_timeoutId);
        }, this.#_options.autoClose - this.#_timeVisible);
      }
      this.#_isPaused = false;
    };
    this.update(options);
    this.#_toast.classList.add(`${this.animation}-enter`);

    this.#_toast.onanimationend = () => {
      this.#_toast.classList.remove(`${this.animation}-enter`);
    };

    const closeIcon = document.createElement("span");
    closeIcon.classList.add("close-icon");
    closeIcon.innerHTML = "&times;";
    this.#_toast.appendChild(closeIcon);
    closeIcon.addEventListener("click", this.#_bindedRemove);
  }

  set position(value) {
    const selector = `.toast-container[data-position=${value}]`;

    const currentToastContainer = this.#_toast.parentElement;
    const toastContainer =
      document.querySelector(selector) || createToastContainer(value);
    toastContainer.append(this.#_toast);

    if (currentToastContainer && !currentToastContainer.hasChildNodes()) {
      currentToastContainer.remove();
    }
  }

  set message(value) {
    this.#_toast.textContent = value;
  }

  set autoClose(value) {
    this.#_timeVisible = 0;
    if (value === false) return;
    if (this.#_timeoutId !== null) clearTimeout(this.#_timeoutId);
    this.#_timeoutId = setTimeout(() => {
      this.remove();
      clearTimeout(this.#_timeoutId);
    }, value);
  }

  set closeOnClick(value) {
    this.#_toast.style.cursor = value ? "pointer" : "default";
    // this.#_toast.classList.toggle("can-close", !value);
    if (value) {
      this.#_toast.addEventListener("click", this.#_bindedRemove);
    } else {
      this.#_toast.removeEventListener("click", this.#_bindedRemove);
    }
  }

  set showProgressBar(value) {
    let lastTimeRendered = new Date().getTime();
    if (this.#_intervalId) clearInterval(this.#_intervalId);
    this.#_isPaused = false;
    if (value === false || this.#_options.autoClose === false) return;
    this.#_intervalId = setInterval(() => {
      if (!this.#_isPaused) {
        this.#_timeVisible += new Date().getTime() - lastTimeRendered;
        // console.log(this.#_timeVisible, "+++", this.#_intervalId);
        const percentage = 1 - this.#_timeVisible / this.#_options.autoClose;
        this.#_toast.style.setProperty(
          "--progress",
          percentage < 0 ? 0 : percentage
        );
      }
      lastTimeRendered = new Date().getTime();
    }, 10);
  }

  set pauseOnHover(value) {
    if (value) {
      this.#_toast.addEventListener("mouseenter", this.pause);
      this.#_toast.addEventListener("mouseleave", this.resume);
    } else {
      this.#_toast.removeEventListener("mouseenter", this.pause);
      this.#_toast.removeEventListener("mouseleave", this.resume);
    }
  }

  set type(value) {
    this.#_toast.dataset.type = value;
  }
  set theme(value) {
    this.#_toast.dataset.theme = value;
  }
  update(options) {
    this.#_options = { ...DEFAULT_OPTIONS, ...options };
    Object.entries({ ...DEFAULT_OPTIONS, ...options }).forEach(
      ([key, value]) => {
        this[key] = value;
      }
    );
  }

  remove() {
    const toastContainer = this.#_toast.parentElement;
    this.#_toast.classList.add(`${this.animation}-leave`);

    this.#_toast.addEventListener("transitionend", () => {
      console.log(this.#_intervalId, "transitionend");
      clearInterval(this.#_intervalId);
      this.#_toast.remove();
      this.onClose();
      if (!toastContainer.hasChildNodes()) {
        toastContainer.remove();
      }
    });

    this.#_toast.addEventListener("animationend", () => {
      console.log(this.#_intervalId, "animationend");
      clearInterval(this.#_intervalId);
      this.#_toast.remove();
      console.log(this.#_intervalId);
      this.onClose();
      if (!toastContainer.hasChildNodes()) {
        toastContainer.remove();
      }
    });
  }
}

function createToastContainer(position) {
  const toastContainer = document.createElement("div");
  toastContainer.classList.add("toast-container");
  toastContainer.dataset.position = position;
  document.body.appendChild(toastContainer);
  return toastContainer;
}

export default Toast;
