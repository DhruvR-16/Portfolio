// Shared by the home sections and the project pages.
export const ease = [0.16, 1, 0.3, 1];

export const rise = {
  initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-10% 0px' },
};

export const two = (i) => String(i + 1).padStart(2, '0');
