
import '../mock/index.js'
import { postData , getData} from '../utils/request.js'

export  function login(data) {
    console.log("api login")
    return postData('/login', data);
  }
export async function getMenus(params) {
    return getData(`/sys/menu/treeList`,params);
}