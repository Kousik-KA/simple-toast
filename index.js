import Toast from "./toast.js";

const toast = new Toast({
  message: "Hello, world!",
  onClose: () => console.log("Toast closed"),
  position: "top-center",
  closeOnClick: false,
  // autoClose: 3000,
  animation: "slide",
  pauseOnHover: true,
  // type: "error",
  theme: "light",
  autoClose: false,
});
