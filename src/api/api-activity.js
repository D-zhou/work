import AXIOS_INSTANCE from './index';

/**
 * 活动列表
 */
export const activityList = (opt) => {
    return AXIOS_INSTANCE.get(`/api/appoint_bk/activities`);
};


/**
 * 新增预约
 */
export const addRecord = (opt) => {
    return AXIOS_INSTANCE.post('/api/appoint_bk/blood/appoints', opt);
};

//  预约列表
export const recordList = (opt) => {
    return AXIOS_INSTANCE.get(`/api/appoint_bk/blood/appoints?is_cancel=0&page=${opt.pageIndex}&limit=10&keyword=${opt.keyword}`)
};

//  取消预约
export const concalPre = (opt) => {
    return AXIOS_INSTANCE.put(`/api/appoint_bk/blood/appoints?id=${opt.id}`, opt.data)
};