import axios from 'axios';


const axiosInstanse  = axios.create({
  baseURL: "https://fitness-rest-api-back.herokuapp.com"
});

// const axiosInstanse  = axios.create({
//   baseURL: "http://localhost:8081"
// });


export const getAllPosts = async() => {
  return await axiosInstanse.get(`/api/posts`);
}

export const getPost = async(id) => {
  return await axiosInstanse.get(`/api/post?id=${id}`);
}

// class EService{


//   async getAllPosts() {
//     return await axiosInstanse.get(`/api/posts`);
//   }

//   async getPost(id) {
//     return await axiosInstanse.get(`/api/post?id=${id}`);;
//   }

//   async addPost(post) {
//     return await axiosInstanse.post(`/api/post`, post);
//   }

// }
