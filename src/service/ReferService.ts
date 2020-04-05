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
  },
  async editRefer(referId: string, referForm: TReferForm): Promise<AxiosResponse<TRefer>> {
    return await service.post(`/refers/${referId}`, {
      referForm
    })
  },
  async patchRefer(referId: string, referForm: TReferPatch): Promise<AxiosResponse<TRefer>> {
    return await service.patch(`/refers/${referId}`, {
      referForm
    })
  },
  async applyRefer(jobId: string, referForm: TReferForm): Promise<AxiosResponse> {
    return await service.post('/refers', {
      jobId, referForm
    })
  },
  async deleteRefer(referId: string): Promise<AxiosResponse> {
    return await service.delete(`/refers/${referId}`)
  }
}

export default ReferService
