
import '../mock/index.js'
import { postData , getData} from '../utils/request.js'

export function fetchPermission() {
  return getData('/permission')
}
export  function login(data) {
    console.log("api login")
    return postData('/login', data);
  }
export async function getSysUsers(pageNo, pageSize) {
    return getData(`/students?pageSize=${pageSize}&pageNo=${pageNo}`)
}