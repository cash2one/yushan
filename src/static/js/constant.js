/**
 * Created by jy on 2017/1/17.
 */
/*eslint-disable */
const utils = require('utils');
const apiUrl = require('static/js/api');
const moduleExports = {
    userType: 10,
    mediaType: 11,
    viewType: 12,
    gettype(groupType) {
      let typeList;
      if(!JSON.parse(localStorage.getItem("type"+groupType))){
        utils.ajaxAsync(apiUrl.getApiUrl('getType'), {
          type: groupType,
        }).done(function (data) {
          // console.log(data);
          let ind=[];
          for(let i=0;i<data.length;i++){
            ind.push(data[i])
          }
          localStorage.setItem("type"+groupType, JSON.stringify(ind));
          typeList = JSON.parse(localStorage.getItem("type"+groupType));
        });
      };
      if(JSON.parse(localStorage.getItem("type"+groupType))){
        typeList = JSON.parse(localStorage.getItem("type"+groupType));
      }
      return typeList;
  },
  getTypeName(mock,iden){
    let name1;
    let a=this.gettype(mock);
 /*   let b=this.gettype(11);
    let c=this.gettype(12);*/
  /*  for(let i=0;i<a.length;i++){
      len.push(a[i]);
    }
    for(let i=0;i<b.length;i++){
      len.push(b[i]);
    }
    for(let i=0;i<c.length;i++){
      len.push(c[i]);
    }*/
  try{
    for(let i=0;i<a.length;i++){
      if(a[i].id==iden){
        name1=a[i].name;
      }
    }
  }catch (e){
    console.log(e);
  }

    return name1;
  },
}
module.exports = moduleExports;
