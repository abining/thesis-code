const axios = require('axios');
const fs = require('fs').promises;

// 配置参数
const config = {
  query: '民宿',
  region: '245',
  city_limit: true,
  output: 'json',
  ak: 'JKZyC85ioOnR3FER68bsDO3AcAJS1DGn',
  page_size: 20,
  ret_coordtype: 'wgs84ll', // 坐标系类型，wgs84ll表示WGS84坐标系
  coord_type: '1',
  scope: '2'
};

// 延迟函数
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// 主函数
async function getAllPOIs() {
  let allResults = [];
  let pageNum = 0;
  let total = Infinity;
  
  try {
    while (allResults.length < total) {
      const url = 'https://api.map.baidu.com/place/v2/search';
      const response = await axios.get(url, {
        params: {
          ...config,
          page_num: pageNum
        }
      });
      
      const data = response.data;
      
      // 第一次请求时获取总数
      if (pageNum === 0) {
        total = data.total;
        console.log(`总共找到 ${total} 条数据`);
      }
      
      // 添加结果
      if (data.results && data.results.length > 0) {
        allResults = allResults.concat(data.results);
        console.log(`已获取 ${allResults.length}/${total} 条数据`);
      }
      
      // 检查是否还有更多数据
      if (data.results.length < config.page_size) {
        break;
      }
      
      // 下一页
      pageNum++;
      
      // 添加延迟避免请求过快
      await delay(500);
    }
    
    // 保存结果到文件
    await fs.writeFile(
      'data/response.json', 
      JSON.stringify({
        status: 0,
        message: "ok",
        total: allResults.length,
        result_type: "poi_type",
        query_type: "general",
        results: allResults
      }, null, 2)
    );
    
    console.log('数据已保存到 data/response.json');
    
  } catch (error) {
    console.error('获取数据时出错:', error.message);
  }
}

// 运行程序
getAllPOIs();

// const response = require('./data/response.json');
// console.log(response.results.length,'有多少项目');