import request from "@/utils/request.js";

// 获取精彩评论
export const getHotComments = params => request.get("/comment/hot", { params });

// 获取评论
export const getComments = params => request.get("/comment/new", { params })
