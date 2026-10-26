export type Picture = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  license: string;
  page: string;
};

export const pictures = {
  walnut: {
    src: "/images/walnut.jpg",
    width: 1600,
    height: 1200,
    alt: "Текстура ореха",
    credit: "Cyril5555",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Texture_de_noyer.jpg",
  },
  oakVeneer: {
    src: "/images/oak-veneer.webp",
    width: 1520,
    height: 760,
    alt: "Дубовый шпон крупным планом",
    credit: "Jandre van Heerden, Poly Haven",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Oak_veneer_01_-_Preview_(Jandre_van_Heerden_via_Poly_Haven).webp",
  },
  chipboard: {
    src: "/images/chipboard.jpg",
    width: 1000,
    height: 828,
    alt: "Срез древесно-стружечной плиты: плотные слои стружки",
    credit: "D-Kuru",
    license: "CC BY-SA 3.0",
    page: "https://commons.wikimedia.org/wiki/File:Particle_board_close_up-horizontal-f22_PNr%C2%B00101.jpg",
  },
  woodSamples: {
    src: "/images/wood-samples.jpg",
    width: 1000,
    height: 1231,
    alt: "Шестнадцать квадратных образцов дерева разных пород и оттенков",
    credit: "Anonimski",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:16_wood_samples.jpg",
  },
  planks: {
    src: "/images/planks.jpg",
    width: 1920,
    height: 1280,
    alt: "Стопка доски, сложенная для просушки",
    credit: "Alex Jones",
    license: "CC0",
    page: "https://commons.wikimedia.org/wiki/File:Stacked_wood_planks_(Unsplash).jpg",
  },
} satisfies Record<string, Picture>;

export const credits = Object.values(pictures);
