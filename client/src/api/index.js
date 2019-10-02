import {message} from 'antd'
import ajax from './ajax.js'
import jsonp from 'jsonp'

export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST');

export const reqWeather = (lat,lng) =>{
    return new Promise((resolve) => {
        const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&APPID=6e96dc37c0916ed001bee2bfffe5a439`;
        jsonp(url,{},(err,data) => {
            if (err || data.cod ===200) {
                message.error('require weather failed!')
            } else {
                const dayPictureUrl = `http://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`;
                const cityName = data.city.name;
                resolve({dayPictureUrl, cityName})
            }
        })
    })
};

// University Info
export const reqUniv = ()=>ajax('/manage/univ/searchAll');

export const reqUnivByName = (univ_name) => ajax('/manage/univ/searchName',{univ_name},'POST');

export const reqUnivByRank = (univ_rank) => ajax('/manage/univ/searchRank',{univ_rank},'POST');

export const reqAddUniv= (univ) => ajax('/manage/univ/add',univ,'POST');

export const reqUpdateUniv= (univ) => ajax('/manage/univ/update',univ,'POST');

export const reqUnivNum = ()=> ajax('/manage/univ/num',{},'POST');

export const reqDeleteImg = (name) => ajax('/manage/univ/img/delete', {name}, 'POST');

//App
export const reqApp = ()=>ajax('/manage/case/searchAll');
export const reqAppByAppName= (AppName) => ajax('/manage/case/searchAppName',{AppName},'POST');

export const reqAppByUniversity= (University) => ajax('/manage/case/searchUniversity',{University},'POST');

export const reqAppByNation= (Nation) => ajax('/manage/case/searchNation',{Nation},'POST');

export const reqAppByScore= (low_bound, up_bound) => ajax('/manage/case/searchScore',
    {low_bound:low_bound,up_bound:up_bound},'POST');

export const reqAppBySchool= (School) => ajax('/manage/case/searchSchool',{School},'POST');

export const reqAppByDegree= (Degree) => ajax('/manage/case/searchDegree',{Degree},'POST');

export const reqAddApp= (App) => ajax('/manage/case/add',App,'POST');

export const reqUpdateApp= (App) => ajax('/manage/case/update',App,'POST');

//Role
export const reqRoles = () => ajax('/manage/role/list');
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST');
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST');

//User
export const reqUsers = () => ajax('/manage/user/list');
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', {userId}, 'POST');
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/'+(user._id ? 'update' : 'add'), user, 'POST');

