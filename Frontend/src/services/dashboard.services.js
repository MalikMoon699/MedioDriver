import API from "../utils/api";

export const getStates = async () => {
  try {
    const res = await API.get("/api/dashboard/get-states");
    return res.data;
  } catch (err) {
    throw err.response?.data;
  }
};

export const getWeeklyUploads = async () => {
  try {
    const res = await API.get("/api/dashboard/get-weekly-uploads");
    return res.data;
  } catch (err) {
    throw err.response?.data;
  }
};

export const getUploadsByType = async () => {
  try {
    const res = await API.get("/api/dashboard/get-uploads-by-type");
    return res.data;
  } catch (err) {
    throw err.response?.data;
  }
};

export const getRecentUploads = async (limit=5) => {
  try {
    const res = await API.get("/api/dashboard/get-recent-uploads", {
      params: { limit },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data;
  }
};

export const fallBackWeeklyUploads = [
  { label: "Mon", count: 0 },
  { label: "Tue", count: 0 },
  { label: "Wed", count: 0 },
  { label: "Thu", count: 0 },
  { label: "Fri", count: 0 },
  { label: "Sat", count: 0 },
  { label: "Sun", count: 0 },
];

export const fallBackByTypeUploads = [
  { label: "Images", count: 0 },
  { label: "Videos", count: 0 },
  { label: "Documents", count: 0 },
  { label: "Audio", count: 0 },
  { label: "Others", count: 0 },
];

