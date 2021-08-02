
import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "21824668-10aeb8c8af54ec25684dd6884";

const fetchHits = ({ searchQuery = "", currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `/?key=${KEY}&q=${searchQuery}&page=${currentPage}&image_type=photo&orientation=horizontal&per_page=${pageSize}`
    )
    .then((response) => response.data.hits);
};

export default { fetchHits };
