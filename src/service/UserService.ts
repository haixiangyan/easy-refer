import {AxiosResponse} from 'axios'
import service from '@/service/config'

const UserService = {
  async editUser(userForm: TUserForm): Promise<AxiosResponse<IUser>> {
    return await service.put('/user', {
      userForm
    })
  }
}

export default UserService
