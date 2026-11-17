/** Números con punto de miles. */
export const miles = (n: number | string) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
