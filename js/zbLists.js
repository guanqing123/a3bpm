$(function () {
    config({
        // jsApiList: ['biz.util.open','device.geolocation.get'], // 需要鉴权使用的jsapi
        onSuccess: function (userinfo) {
            //alert("just du it!");
           // $.fn.cookie('ShenQingDW',userinfo.DanWeiBH);
        }
    });
    Vue.component("sea-dialog", {
        data: function () {
            return {
                currentDisVal: "",
                currentVal: "",
                record: {}
            }
        },
        props: ['id', 'title', 'config'],
        template: "#sea-dialog",
        methods:{
            searchAll:function (e) {
                if(e.target.value===''){
                    this.searchZbmc(e)
                }
            },
            searchZbmc:function (e) {
                this.$emit('searchmc',e)
            }
        }
    });
    let zbmcdata = {
        DanWeiBH: "GLZZ201905240001",//$.fn.cookie('ShenQingDW'),
        BuMenBH: 'GLZZ201905250002',//_userinfo.BuMenBH,
        NianDu: '2019',//_userinfo.NianDu,//'2019',
        YongHuBH: 'XTYH201905300002',//_userinfo.YongHuBH,
        ZhiBiaoMC: '',
    };

    let vm = new Vue({
        el: "#zbLists",
        data: {
            zbmcConfig: {
                options: [],
                disField: "zhiBiaoMC",
                keyField: "bianHao",
                showsearch:true,
                fields: [{
                    name: '指标名称',
                    key: 'ZhiBiaoMC'
                },{
                    name: '批复金额',
                    key: 'PiFuJE'
                }, {
                    name: '可用余额',
                    key: 'KeYongYE'
                },{
                    name: '执行率',
                    key: 'ZhiXingLV'
                }],
                searchZbmc:function(e){
                    zbmcdata.DanJuBH = "";
                    zbmcdata.ZhiBiaoMC = e.target.value;
                    console.info(e);
                    zbmcList(vm,zbmcdata);
                }
            },
        },
        mounted: function () {
            let vm = this;
            zbmcList(vm,zbmcdata)
        }
    })

});
function zbmcList(vm,zbmcdata) {
    fetch(Global.baseUrl + '/bpm/zbcx/list', {
        method: 'post',
        body: JSON.stringify(zbmcdata),
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(json => {
            if(json.msgCode=='1'){
                if(json.list.length>0){
                    vm.zbmcConfig.options = json.list;
                }else{
                    $(".empty").show().html('当前没有指标可查询！')
                }
            }
        });
}