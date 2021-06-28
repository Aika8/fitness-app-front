import axios from 'axios'


const axiosInstanse  = axios.create({
  baseURL: "http://localhost:8080"
});


class EService{


  async getAllPosts() {
    return await axiosInstanse.get(`/api/posts`);
  }

  async getPost(id) {
    return await axiosInstanse.get(`/api/post?id=${id}`);;
  }

}

export default EService;