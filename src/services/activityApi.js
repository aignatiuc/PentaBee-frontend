import API from './';
import { userEndpoints } from '@/constants/apiEndpoints';

export default {
  getActivityList(filter){
    return API.get(userEndpoints.ACTIVITIES + filter);
  },
  getActivityDetails (id) {
    return API.get(userEndpoints.ACTIVITIES + '/' + id);
  },
  deleteActivity(id){
    return API.delete(userEndpoints.ACTIVITIES + '/' + id + '/delete')
  },
  createActivity(data){
    return API.post(userEndpoints.ACTIVITIES + '/create', data)
  },
  editActivity(id, data){
    return API.post( userEndpoints.ACTIVITIES +'/' + id + '/edit', data)
  },
  getTypes() {
    return API.get( 'http://api.pentabee.local/api/activity-types')
  },
  applyActivity(id){
    return API.post(userEndpoints.ACTIVITIES +'/'+ id + '/apply')
  },
  inviteUser(activityId, userId){
    return API.post(userEndpoints.ACTIVITIES +'/'+ activityId +'/invite' +'/'+  userId)
  },
};
