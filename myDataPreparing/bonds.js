


const fs = require('fs');

const source = require('./source')

const bondList = source.bondList

// Функция для преобразования даты в формат DD.MM.YYYY
function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
}

// Функция для преобразования массива объектов в CSV строку
function convertToCSV(dataArray) {
  const csvRows = [];
  
  // Заголовки для CSV
  csvRows.push('couponPeriodDays,couponValue,faceValue,dateToClient,priceValue,symbolTicker,symbolShowName,riskCategory,currency,rate,subordinated,floatingCoupon,sector');
  
  // Преобразование каждого объекта в CSV строку
  dataArray.forEach(item => {
    const couponPeriodDays = item.couponPeriodDays;
    const couponValue = item.couponValue;
    const faceValue = item.faceValue;
    const dateToClient = formatDate(item.dateToClient); // Преобразование даты
    const priceValue = item.price.value;
    const symbolTicker = item.symbol.ticker;
    const symbolShowName = item.symbol.showName;

    const riskCategory = item.riskCategory; 
    const currency= item.price.currency; 
    const rate= item.rate;
    const subordinated= item.subordinated;
    const floatingCoupon= item.floatingCoupon;
    const sector= item.symbol.sector
    
    // Формирование строки CSV для объекта
    csvRows.push(`${couponPeriodDays},${couponValue},${faceValue},${dateToClient},${priceValue},${symbolTicker},${symbolShowName},${riskCategory},${currency},${rate},${subordinated},${floatingCoupon},${sector}`);
  });
  
  // Возврат всех строк, объединенных переносом строки
  return csvRows.join('\n');
}

// Использование функции для преобразования данных
const csvData = convertToCSV(bondList);

// Сохранение данных в файл CSV
fs.writeFileSync('output.csv', csvData);
