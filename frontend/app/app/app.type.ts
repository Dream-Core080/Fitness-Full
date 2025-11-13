export interface Tag {
    id: string;
    name: string;
}
export interface ExerciseCollection {
    id: string;
    title: string;
    thumbnail: string;
    count: number;
}
export interface Exercise {
    _id: string;
    vimeoId: string;
    thumbnail: string;
    title: string;
    lastWatch: number;
    viewcount: number;
    isFavorite: boolean;
}
export interface Category {
    id: string;
    title: string;
    thumbnail: string;
    count: number;
}
export interface ShopEquipment {
    id: string;
    title: string;
    thumbnail: string;
    price: number;
    link: string;
}
export interface getExercisesRequest {
    page: number;
    perPage: number;
    search?: string;
    sortBy?: string;
    category?: string;
    goal?: string;
    equipment?: string;
    collection?: string | null;
}
export interface ExercisesResponse {
    count: number;
    exercises: Exercise[];
}
export interface ExerciseDetailResponse {
    id: string;
    vimeoId: string;
    title: string;
    description: string;
    thumbnail: string;
    isFavorite: boolean;
    note: string;
    categories: {
        _id: string;
        icon: string;
        title: string;
    }[];
    equipments: ShopEquipment[];
    relatedExercises: Exercise[];
    recommendedExercises: Exercise[];
}
export interface updateNoteRequest {
    exerciseId: string;
    note: string;
}

export interface Quiz {
    _id: string;
    title: string;
    level: number;
}