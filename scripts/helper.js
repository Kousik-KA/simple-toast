export const DEFAULT_OPTIONS = {
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
  styleToast: {},
};

export const getHighestZIndex = () => {
  const DEFAULT_ZINDEX = 1000;
  const pageElements = Array.from(document.querySelectorAll("body *")) || [];
  if (pageElements.length === 0) return DEFAULT_ZINDEX;
  const zIndexList = pageElements
    .map((a) => parseFloat(window.getComputedStyle(a).zIndex))
    .filter((a) => !isNaN(a));

  zIndexList.push(DEFAULT_ZINDEX);

  return zIndexList.sort().pop();
};

export const createToastContainer = (position) => {
  const toastContainer = document.createElement("div");
  toastContainer.classList.add("simple__toast--toast-container");
  toastContainer.dataset.position = position;
  document.body.appendChild(toastContainer);
  return toastContainer;
};
