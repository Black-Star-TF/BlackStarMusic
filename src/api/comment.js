import request from "@/utils/request.js";

// 获取精彩评论
export const getHotComments = params => request.get("/comment/hot", { params });
