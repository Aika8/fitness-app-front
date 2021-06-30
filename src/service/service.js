import axios from 'axios'


const axiosInstanse  = axios.create({
  baseURL: "https://fitness-rest-api-back.herokuapp.com"
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