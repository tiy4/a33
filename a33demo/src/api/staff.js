import staff from './request'

const staffApi = (data) => {
    return staff.get({
        url: '/staff/findAll',
        data
    })
}
const hobbyApi = (data) => {
    return staff.get({
        url: '/staff_hobby/findAll',
        data
    })
}

export default { staffApi, hobbyApi }