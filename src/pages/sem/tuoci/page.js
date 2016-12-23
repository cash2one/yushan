/**
 * Created by jy on 2016/12/6.
 */
/*eslint-disable */
require('cp');
const utils = require('utils');
const tb = require('./charts/table.ejs');
const td = require('./charts/keyword.ejs');
// 引入 ECharts 主模块

require('static/css/reset.css');
require('./page.css');
require('static/vendor/jquery.tablesorter.min');
require('static/vendor/jquery-ui.min');
require('static/css/jquery-ui.min.css');
const apiUrl = require('static/js/api');
//点击全选
    let btn = "";
    let btn_1 = "";
    let b = 0;
    let text = "text_0";
    let  $s =  "";
    let Otbody = "";
    let word = "";
    let datas = "";
    let keydow = "";
    let keywords = [];
    let n = 0;
    //全选（调用）
    function check(btn) {
        $s =   btn.parents("thead").next("tbody").find("input");
        if (btn.is(':checked')) {
            $s.each(function(i){
                $(this).prop('checked',true);
            });
        } else {
            //$s.attr('checked', 'checked');

            $s.each(function(i){
                $(this).prop('checked', false);
            });
        }
        for(var n = 0; n<btn.length; n++) {
            if($(".list tr").eq(n).is(":hidden")){
                $(".list tr ").eq(n).find('input').removeClass();
            }
        }
    }
    //全网 数据
    function trHide(btn,Otbody){
        var data = [];
        console.log(btn);
        for(var n = 0; n<btn.length; n++) {
            if(btn[n].checked == true) {
                if($(".check").eq(n).parent().next().text() != "") {
                    data.push($(".check").eq(n).parents("tr").attr("class"));
                    $(".check").eq(n).parents("tr").hide();
                    btn[n].checked = false;
                }
            }
        }
        var c =("." + Otbody).replace(/\s+/g,"")
        addTable(c,data);
        console.log(data);
    }
    //关键词 数据
    function trHide_1(btn,Otbody){
        var data_1 = [];
        console.log(btn);
        for(var n = 0; n<btn_1.length; n++) {
            if(btn[n].checked == true) {
                if($(".check_1").eq(n).parent().next().text() != "") {
                    data_1.push($(".check_1").eq(n).parents("tr").attr("class"));
                    $(".check_1").eq(n).parents("tr").hide();
                    btn[n].checked = false;
                }
            }
        }
        var b =("." + Otbody).replace(/\s+/g,"");
        addTable(b,data_1);
    }
    //新增表格
    function addTable(text,data) {
        for(var j = 0; j<data.length; j++){
            var Tr = document.createElement("tr");
            $(text).find("tbody").append(Tr);
            var Td1 = document.createElement("td");
            Td1.innerHTML = "<input class='new_check' type='checkbox'/>";

            Tr.appendChild(Td1);
            var Td2 = document.createElement("td");
            Td2.className = "new_keywords";
            Td2.innerHTML = $("."+data[j]).children('td').eq(1).text();
            Tr.appendChild(Td2);
            var Td3 = document.createElement("td");
            Td3.id = data[j];
            Td3.innerHTML = "<button class='remove'>删除</butoon>";
            Tr.appendChild(Td3);
        }
    }
$(() => {
    //点击输入发送请求
    $(".send").click(function() {
        n++;
        if($(".select").val() == "全面搜索") {
            utils.ajax(apiUrl.getApiUrl('getAllSearch'), {
                word:  $(".input_text").val(),
            }).done(function (data) {
                datas = data.kws;
                $('.first_table').append(tb({ data: datas, qw: "qw", num:n }));
                $("#table1 ").tablesorter();
            });
            $("#table1 ").tablesorter();
            //$(".first_table").show();
        }else if($(".select").val() == "关键词搜索") {
            utils.ajax(apiUrl.getApiUrl('getWord'), {
                word:  $(".input_text").val(),
            }).done(function (data) {
                datas = data.wds;
                $('.first_table').html(td({ data: datas, gj: "gj", num:n }));
                $("#table ").tablesorter();
            });
        }
    });
    //点击全选
    $(document).on('click',':input[name = "all"]',function (){
        console.log($(this).attr("class"));
        if($(this).attr("class") == "all") {
            check($(".all"));
        }else if($(this).attr("class") == "all_1") {
            check($(".all_1"));
        }
        console.log(1);
    });

    //导入数据
    $(".right_box").on("click",".lead",function() {
        btn_1 = $(".check_1");
        btn = $(".check");
        Otbody = $(this).parents("table").attr("class");
        trHide(btn,Otbody);
        trHide_1(btn_1,Otbody);
    });
    //点击新增
    $(".add").click(function(event) {
        if($(".add_right_box >table:last >.new_list").text().replace(/\s+/g,"") != ""){
            b++
            text =("text_" + b);
            $(".table_hide").clone(true).children('table').addClass(text).appendTo(".add_right_box");
        }
    });
   //点击删除数据
    $(".new_list").on("click",'.remove',function() {
        for(var n = 0;n < btn.length; n++) {
            if($(".check").eq(n).parents("tr").attr("class") == $(this).parent().attr("id")) {
                $(".check").eq(n).parents("tr").show();
            }
        }
        for(var n = 0;n < btn_1.length; n++) {
            if($(".check_1").eq(n).parents("tr").attr("class") == $(this).parent().attr("id")) {
                $(".check_1").eq(n).parents("tr").show();
            }
        }
        $(this).parents("tr").remove();
    });

    //点击导出
    $(".down").click(function() {
        let kw = [];
        let points = [];
        for(var i = 0;i< $(".add_right_box > table").length;i++) {
            for(var n = 0 ;n<$(".add_right_box > table").eq(i).find(".new_keywords").length;n++){
                console.log(n);
                kw.push($(".add_right_box > table").eq(i).find(".new_keywords").eq(n).text());
                console.log(kw)
            }
            let a = {};
            a.jihua = "计划"+(i+1);
            a.danyuan =  "单元"+(i+1);
            a.url = 'http://yxy.yushan.mobi/yuxuey/lp1?c1=4849216d176b4e27af9116822e472cb1&c2=002&c3=lp1&c4=y2&baidu_sem={keywordid}_{keyword}';
            a.matchModel ='短语-同义包含';
            a.isuse = '启用';
            a.price = '0.45';
            a.keywords = kw;
            points.push( a);
        }
        console.log(points);
        utils.ajax(apiUrl.getApiUrl('addKeyWords'), { data: JSON.stringify(points)});
    })
});