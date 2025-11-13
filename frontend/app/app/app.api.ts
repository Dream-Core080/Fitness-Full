import { apiCall } from "@/utils/api";
import {
  Tag,
  ExerciseCollection,
  Quiz,
  Category,
  ShopEquipment,
  getExercisesRequest,
  ExercisesResponse,
  ExerciseDetailResponse,
  updateNoteRequest,
} from "./app.type";

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({ url: "tags", method: "GET" });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchAllCollections = async (): Promise<ExerciseCollection[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/collections/all",
      method: "GET",
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchCollections = async (
  tag: string
): Promise<ExerciseCollection[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/collections",
      method: "GET",
      params: { tag },
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchRecentHistories = async (
  body: getExercisesRequest
): Promise<ExercisesResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/exercises/get_exercise_history",
      method: "GET",
      params: body,
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchRecommended = async (
  body: getExercisesRequest
): Promise<ExercisesResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/exercises/get_exercise_recommended",
      method: "GET",
      params: body,
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchNewlyAdded = async (
  body: getExercisesRequest
): Promise<ExercisesResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/exercises/get_exercise_library",
      method: "GET",
      params: body,
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/categories",
      method: "GET",
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchShopEquipments = async (): Promise<ShopEquipment[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/equipments",
      method: "GET",
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchExercises = async (
  body: getExercisesRequest
): Promise<ExercisesResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/exercises/get_exercise_library",
      method: "GET",
      params: body,
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchFavorites = async (
  body: getExercisesRequest
): Promise<ExercisesResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/exercises/get_exercise_favorite",
      method: "GET",
      params: body,
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchExerciseDetail = async (
  exerciseId: string
): Promise<ExerciseDetailResponse> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/exercises/get_exercise",
      method: "GET",
      params: { exerciseId },
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateNote = async (body: updateNoteRequest) => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/exercises/update_note",
      method: "POST",
      params: body,
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const updateFavorite = async (params: {
  exerciseId: string | undefined;
  isFavorite: boolean;
}) => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/exercises/update_favorite",
      method: "POST",
      params,
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const fetchQuizzes = async (): Promise<Quiz[]> => {
  try {
    const request = await apiCall();
    const { data } = await request({
      url: "/quizzes",
      method: "GET",
    });
    return Promise.resolve(data);
  } catch (error: any) {
    return Promise.reject(error);
  }
};
