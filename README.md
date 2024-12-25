# 说明

- 本项目用于下载百度地图的民宿数据，并转换为Excel文件
- 数据来源：[百度地图](https://lbsyun.baidu.com/faq/api?title=webapi/guide/webservice-placeapi/circle)

# 目录结构

- data 存放数据
- trans.js 数据转换
- index.js 主函数
- README.md 说明
- data/response.json 数据
- data/BaiduMap_cityCode_1102.txt 城市代码的对照表，来源：[baiduMap](https://lbsyun.baidu.com/faq/api?title=webapi/guide/webservice-placeapi/circle)

# 运行下载代码

```bash
node index.js
```

# 数据转换

```bash
node trans.js
```