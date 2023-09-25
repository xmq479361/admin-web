//引入mockjs
import Mock from 'mockjs';
import {
    baseURL
} from '@/config'

// 获取mock.Random对象
const Random = Mock.Random

// 定义一个接口名为list的接口
Mock.mock(baseURL + '/login', {
    status: 200,
    msg: '登录成功！',
    data: {
        username: 'admin',
        menus: [
            {id: 5, index: 5, name: "学生管理", path: '/student'},
            {id: 1,  index: 1,name: "系统管理", path: '/sys', children: [
                {id: 2, index: 2, name: "人员管理", path: '/sys/user', children: []},
                {id: 3,  index: 3,name: "角色管理", path: '/sys/role', children: []},
                {id: 4,  index: 4,name: "菜单管理", path: '/sys/menu', children: []},
            ]}
        ],
        token() {
            const a = Random.integer(180, 44555).toString(16) + '-' +
                Random.integer(140, 255255).toString(16) + '-' +
                Random.integer(120, 2212320).toString(16)
            console.log('token mock: ', a);
            return a
        }
    }
});


// Mock.mock(baseURL + '/students', (options) => {
Mock.mock(/\/students/, (options) => {
    let respDataSize = 10;
    let total = 54;
    var po = options.url.indexOf("?"); //获取问号的位置
    if (po != -1) {
        var query = options.url.slice(po + 1); //获取到查询参数current=4转换为{current: 4}
        var arr = query.split("&"); //按&分割为数组
        var search = {}; //定义个对象
        arr.forEach(item => {
            var temp = item.split("="); //把数组每个元素按等于分割[current,4]
            search[temp[0]] = temp[1]; //search[ "current"] =4

        })
        console.log(search);
        respDataSize = search['pageSize']
        let pageNo = search['pageNo']
        let maxPage = Math.trunc(total / respDataSize)
        if (pageNo > maxPage) {
            respDataSize = Math.trunc(total % respDataSize)
        }
    }
    let template = {
        id: '@id', //随机id
        name: '@cname', //随机名称 @name英文名称 @cname中文名称
        nickName: '@last', //随机昵称 @last英文昵称 @clast中文昵称
        phone: /^1[34578]\d{9}$/, //随机电话号码
        'age|11-99': 1, //年龄  属性名(age)、生成规则(rule)、属性值(value) 'age|rule': value
        address: '@county(true)', //随机地址 @county(true)省市县  @county(false)||@county()县||区||-
        email: '@email', //随机邮箱
        sex: '@boolean', //随机性别
        createTime: '@datetime', //创建时间 可以自定义格式 @datetime(yyyy-MM-dd hh:mm:ss)
        date: '@date(yyyy-MM-dd hh:mm:ss)', // 随机生成日期 也可以自定义格式
        paragraph: '@cparagraph', // 随机描述 @cparagraph中文随机描述 @paragraph英文随机描述
        headPortrait: Random.image('200x100'), //用户头像1
        avatar() { //用户头像2
            //  # （150~200）（70-110）（70-110）红色色调
            //  # （110~170）（200-225）（200-225）蓝绿色调
            //  # （180-225）（140-255）（120-255） 跨度较大
            const a = '#' + Random.integer(180, 255).toString(16) +
                Random.integer(140, 255).toString(16) +
                Random.integer(120, 220).toString(16)
            return Random.image('100x100', a, ' png ') //dataImage
        },
        'number4|1-3.3-10': 2.456,
    }

    let listTemplate = {total}
    // listTemplate['total'] = total
    listTemplate['datas|' + respDataSize] = [template]
    return {
        status: 200,
        msg: '登录成功！',
        data: Mock.mock(listTemplate)
    }
})

Mock.mock(baseURL + '/students2', {
    status: 200,
    msg: '登录成功！',
    data: {
        total: 100,
        "datas": [{
            id: '@id', //随机id
            name: '@cname', //随机名称 @name英文名称 @cname中文名称
            nickName: '@last', //随机昵称 @last英文昵称 @clast中文昵称
            phone: /^1[34578]\d{9}$/, //随机电话号码
            'age|11-99': 1, //年龄  属性名(age)、生成规则(rule)、属性值(value) 'age|rule': value
            address: '@county(true)', //随机地址 @county(true)省市县  @county(false)||@county()县||区||-
            email: '@email', //随机邮箱
            sex: '@boolean', //随机性别
            createTime: '@datetime', //创建时间 可以自定义格式 @datetime(yyyy-MM-dd hh:mm:ss)
            date: '@date(yyyy-MM-dd hh:mm:ss)', // 随机生成日期 也可以自定义格式
            paragraph: '@cparagraph', // 随机描述 @cparagraph中文随机描述 @paragraph英文随机描述
            headPortrait: Random.image('200x100'), //用户头像1
            avatar() { //用户头像2
                //  # （150~200）（70-110）（70-110）红色色调
                //  # （110~170）（200-225）（200-225）蓝绿色调
                //  # （180-225）（140-255）（120-255） 跨度较大
                const a = '#' + Random.integer(180, 255).toString(16) +
                    Random.integer(140, 255).toString(16) +
                    Random.integer(120, 220).toString(16)
                return Random.image('100x100', a, ' png ') //dataImage
            },
            'number4|1-3.3-10': 2.456,
        }]
    }
});