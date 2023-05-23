import axios from "axios";
import { API_ROUTES } from "../utils/constants";

function formatQuestions(questionsArray) {
  console.log("test", questionsArray);
  return questionsArray.map((question) => {
    const newQuestion = { ...question };
    newQuestion.id = newQuestion._id;
    return newQuestion;
  });
}

export function storeInLocalStorage(token, userId) {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
}

export function getFromLocalStorage(item) {
  return localStorage.getItem(item);
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getFromLocalStorage("token");
    const userId = getFromLocalStorage("userId");
    if (!token) {
      return defaultReturnObject;
    }
    return { authenticated: true, user: { userId, token } };
  } catch (err) {
    console.error("getAuthenticatedUser, Something Went Wrong", err);
    return defaultReturnObject;
  }
}
export async function listQuestions() {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_ROUTES.LISTQUESTIONS}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response);
    const questions = response.data;

    return questions;
  } catch (err) {
    console.log("err");
    return [];
  }
}

export async function createQuiz(newQuiz, token) {
  try {
    const response = await axios({
      method: "post",
      url: `${API_ROUTES.CREATE}/qcm`,
      data: newQuiz,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la création du quiz");
  }
}
export async function createOpen(newOpen, token) {
  try {
    const response = await axios({
      method: "post",
      url: `${API_ROUTES.CREATE}/open`,
      data: newOpen,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur lors de la création du quiz");
  }
}
export async function createOrderedImages(newOrderedImages, token) {
  try {
    const response = await axios({
      method: "post",
      url: `${API_ROUTES.CREATE}/orderedImages`,
      data: newOrderedImages,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating ordered images");
  }
}
