export interface IMovie {
    id: number;
    name: string;
    category: "Animação" | "Ficção";
    duration: number; 
    price: number;
};

export const movies: IMovie[] = [];