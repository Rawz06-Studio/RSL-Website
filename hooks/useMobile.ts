import { ref, onMounted, onUnmounted } from "vue";

const MOBILE_BREAKPOINT = 768;

export function useMobile() {
  const isMobile = ref(false);

  const updateIsMobile = () => {
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
  };

  onMounted(() => {
    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", updateIsMobile);
  });

  return isMobile;
}
