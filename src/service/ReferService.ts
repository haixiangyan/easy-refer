import {AxiosResponse} from 'axios'
import service from '@/service/config'

const ReferService = {
  async getReferList(role: TViewRole, page = 1, limit = 10): Promise<AxiosResponse<IReferList>> {
    return await service.get('/refers', {
      params: {role, page, limit}
    })
  },
  async getReferById(referId: string): Promise<AxiosResponse<IRefer>> {
    return await service.get(`/refers/${referId}`)
  }
}

export default ReferService
