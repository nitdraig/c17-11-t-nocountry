import { AppDetail, Testimonial, UserProfile } from "../types/types";

export const user: UserProfile[] = [
  {
    id: "1",
    first_name: "Roberto",
    last_name: "Perez",
    address: "Recoleta - Buenos Aires",
    description:
      "Soy Roberto, un amante apasionado de los animales. Además de cuidar mascotas, también ofrezco servicios de peluquería canina para que tus amigos peludos luzcan siempre hermosos.",
    time: "16hs - 21hs",
    services: [
      {
        name: "Paseo de mascotas",
        description: "Paseo a domicilio",
        price: 2020,
      },
      {
        name: "Corte de pelo",
        description: "Peluquería canina profesional",
        price: 300,
      },
      {
        name: "Baño y cepillado",
        description:
          "Baño relajante y cepillado para mantener la higiene y salud del pelaje",
        price: 500,
      },
    ],
    phone: "+5491123456789",
    picture:
      "https://cdn.pixabay.com/photo/2017/08/12/18/31/male-2634974_1280.jpg",
  },
  {
    id: "2",
    first_name: "Mariana",
    last_name: "González",
    address: "Palermo - Buenos Aires",
    description:
      "Hola, soy Mariana. Me encantan los animales y disfruto cuidarlos y mimarlos. Ofrezco paseos relajantes y juegos divertidos para mantener a tus mascotas activas y felices.",
    time: "8hs - 15hs",
    services: [
      {
        name: "Paseo de perros",
        description: "Paseo recreativo con juegos y ejercicio",
        price: 1800,
      },
      {
        name: "Visita a domicilio",
        description: "Visita para alimentación y compañía",
        price: 1500,
      },
      {
        name: "Entrenamiento básico",
        description: "Sesiones de entrenamiento para obediencia básica",
        price: 2500,
      },
    ],
    phone: "+5491123456789",
    picture:
      "https://cdn.pixabay.com/photo/2017/06/09/17/11/model-2387582_1280.jpg",
  },
  {
    id: "3",
    first_name: "Laura",
    last_name: "Rodríguez",
    address: "Belgrano - Buenos Aires",
    description:
      "Hola, soy Laura. Tengo una gran pasión por los animales y estoy aquí para brindarles el mejor cuidado posible. Además de paseos y cuidado básico, ofrezco entrenamiento especializado para perros de todas las edades y tamaños.",
    time: "9hs - 18hs",
    services: [
      {
        name: "Paseo y juegos",
        description:
          "Paseo con actividades divertidas para mantener a tus mascotas felices y saludables",
        price: 1500,
      },
      {
        name: "Entrenamiento avanzado",
        description:
          "Sesiones de entrenamiento personalizado para perros con necesidades específicas",
        price: 3000,
      },
      {
        name: "Cuidado nocturno",
        description: "Cuidado y compañía para mascotas durante la noche",
        price: 2000,
      },
    ],
    phone: "+5491123456789",
    picture:
      "https://cdn.pixabay.com/photo/2018/01/02/09/47/woman-3055841_1280.jpg",
  },
  {
    id: "4",
    first_name: "Jorge",
    last_name: "López",
    address: "Caballito - Buenos Aires",
    description:
      "¡Hola! Soy Jorge, un amante de los animales con años de experiencia en el cuidado de mascotas. Estoy disponible para paseos diarios, cuidado en el hogar y mucho más. ¡Tu mascota estará en buenas manos conmigo!",
    time: "7hs - 20hs",
    services: [
      {
        name: "Paseo matutino",
        description:
          "Paseo temprano por la mañana para comenzar el día con energía",
        price: 1800,
      },
      {
        name: "Cuidado en el hogar",
        description: "Cuidado de mascotas en el hogar del cliente",
        price: 2500,
      },
      {
        name: "Juego interactivo",
        description:
          "Sesiones de juego para mantener a tus mascotas activas y felices",
        price: 1500,
      },
    ],
    phone: "+5491123456789",
    picture:
      "https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_1280.jpg",
  },
  {
    id: "5",
    first_name: "Carolina",
    last_name: "Martínez",
    address: "San Telmo - Buenos Aires",
    description:
      "¡Hola a todos! Soy Carolina, una amante de los animales que se dedica a proporcionar el mejor cuidado posible para tus mascotas. Conmigo, puedes esperar paseos divertidos, juegos interactivos y mucho más.",
    time: "10hs - 19hs",
    services: [
      {
        name: "Paseo por el parque",
        description:
          "Paseo en entornos naturales para una experiencia enriquecedora",
        price: 2200,
      },
      {
        name: "Cuidado durante vacaciones",
        description: "Cuidado completo durante la ausencia del dueño",
        price: 3500,
      },
      {
        name: "Sesión de fotos",
        description:
          "Sesión profesional para capturar los mejores momentos de tus mascotas",
        price: 1000,
      },
    ],
    phone: "+5491123456789",
    picture:
      "https://cdn.pixabay.com/photo/2018/01/03/19/54/fashion-3059143_1280.jpg",
  },
  {
    id: "6",
    first_name: "Fernando",
    last_name: "Sánchez",
    address: "Villa Crespo - Buenos Aires",
    description:
      "¡Hola a todos! Soy Fernando, un amante de los animales con una pasión por brindarles el mejor cuidado posible. Conmigo, tus mascotas recibirán atención amorosa y personalizada, ¡garantizado!",
    time: "8hs - 17hs",
    services: [
      {
        name: "Paseo por la naturaleza",
        description:
          "Paseo en entornos naturales para una experiencia relajante",
        price: 2000,
      },
      {
        name: "Cuidado de gatos",
        description: "Cuidado especializado para gatos en su propio hogar",
        price: 1800,
      },
      {
        name: "Visita al parque",
        description: "Visita al parque para socializar y ejercitar",
        price: 1500,
      },
    ],
    phone: "+5491123456789",
    picture:
      "https://cdn.pixabay.com/photo/2018/10/29/21/46/human-3782189_1280.jpg",
  },
];

export const appDetails: AppDetail[] = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1601758177266-bc599de87707?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "MascoCuidado busca acercar Dueños de Mascotas a Cuidadores expertos, además de la ofrecerte la posibilidad de conocer al cuidador antes de elegirlo, te brindamos una lista de los mejores puntuados. ",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1563460716037-460a3ad24ba9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Sabemos que no le confiarías tu mejor amigo a cualquier persona, por eso mismo te ayudamos a elegir quien mejor se adecue a tus necesidades, tiempos y sea el indicado para este gran trabajo.",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1545529468-42764ef8c85f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Registrate, entra y elige tu cuidador ideal. Pueden ponerse de acuerdo, y llegar a colaborar en esta labor, También puedes dejar una reseña de la persona, para ayudar a otros dueños a encontrarlo.",
  },
];
export const testimonials: Testimonial[] = [
  {
    name: "Juan Perez",
    role: "Recoleta - Buenos Aires",
    imageSrc:
      "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "MascoCuidado encaja a la perfección con mi estilo de vida, me facilitó mucho el proceso de cuidado de mi mascota.",
  },
  {
    name: "Yanina Figueroa",
    role: "Rosario - Santa Fe",
    imageSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description:
      "Increíble el tiempo que me ahorro desde que mascocuidado me da la simplicidad de conectar con gente tan experimentada en el cuidado de mi Perrito.",
  },
];
