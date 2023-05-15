const API_URL = process.env.REACT_APP_API_URL;

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/auth/signup`,
  SIGN_IN: `${API_URL}/api/auth/login`,
  CREATE: `${API_URL}/api/quiz`,
  GETQUESTIONS: `${API_URL}/api/quiz/questions`,
};
