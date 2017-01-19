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
      let typeName;
      if(!JSON.parse(localStorage.getItem("type"+groupType))){
        utils.ajax(apiUrl.getApiUrl('getType'), {
          type: groupType,
        }).done(function (data) {
          // console.log(data);
          let ind=[];
          for(let i=0;i<data.length;i++){
            ind.push({
              id:data[i].id,
              name:data[i].name,
            })
          }
          localStorage.setItem("type"+groupType, JSON.stringify(ind));
        });
      };
      if(JSON.parse(localStorage.getItem("type"+groupType))){
        typeName = JSON.parse(localStorage.getItem("type"+groupType));
      }
      return typeName;
  },
  getTypeName(iden){
      let name1;
    let len=[];
    let a=this.gettype(10);
    let b=this.gettype(11);
    let c=this.gettype(12);
    for(let i=0;i<a.length;i++){
      len.push(a[i]);
    }
    for(let i=0;i<b.length;i++){
      len.push(b[i]);
    }
    for(let i=0;i<c.length;i++){
      len.push(c[i]);
    }
    for(let i=0;i<len.length;i++){
      if(len[i].id==iden){
        name1=len[i].name;
      }
    }
    return name1;
  },
}
module.exports = moduleExports;
