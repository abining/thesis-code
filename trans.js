const fs = require('fs');
const xlsx = require('xlsx');

// 读取 JSON 文件
const data = JSON.parse(fs.readFileSync('data/response.json', 'utf8'));

// 定义列名
const headers = [
    '经度', // location.lng
    '纬度', // location.lat
    'navi 经度', // navi_location.lng
    'navi 纬度', // navi_location.lat
    '地址', // 拼接地址
    '名称', // item.name
    '分类标签', // detail_info.classified_poi_tag
    '标签', // detail_info.tag
    '类型', // detail_info.type
    '详情链接', // detail_info.detail_url
    '综合评分', // detail_info.overall_rating
    '图片数量', // detail_info.image_num
    '评论数量', // detail_info.comment_num
    '营业时间', // detail_info.shop_hours
    '标签' // detail_info.label
];

// 提取数据
const rows = data.results.map(item => {
    const { location, detail_info, address, province, city, area } = item;
    const navi_location = detail_info?.navi_location || {};

    return [
        location.lng, // 经度
        location.lat, // 纬度
        navi_location.lng || '', // navi 经度
        navi_location.lat || '', // navi 纬度
        `${address}, ${area}, ${city}, ${province}`, // 拼接地址
        item.name, // 名称
        detail_info.classified_poi_tag, // 分类标签
        detail_info.tag, // 标签
        detail_info.type, // 类型
        detail_info.detail_url, // 详情链接
        detail_info.overall_rating, // 综合评分
        detail_info.image_num, // 图片数量
        detail_info.comment_num, // 评论数量
        detail_info.shop_hours, // 营业时间
        detail_info.label // 标签
    ];
});

// 创建工作簿
const worksheet = xlsx.utils.aoa_to_sheet([headers, ...rows]); // 添加列名
const workbook = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// 写入 Excel 文件
xlsx.writeFile(workbook, 'data/output.xlsx');

// 写入 CSV 文件
const csvData = xlsx.utils.sheet_to_csv(worksheet);
fs.writeFileSync('data/output.csv', csvData);