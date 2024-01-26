// D. Две фишки

/**
 * Рита и Гоша играют в игру. У Риты есть n фишек, на каждой из которых написано количество очков. Сначала Гоша называет число k, затем Рита должна выбрать две фишки, сумма очков на которых равна заданному числу.
   Рите надоело искать фишки самой, и она решила применить свои навыки программирования для решения этой задачи. Помогите ей написать программу для поиска нужных фишек.
 */

   const _readline = require('readline');

   const _reader = _readline.createInterface({
       input: process.stdin
   });
   
   const _inputLines = [];
   
   _reader.on('line', line => {
       _inputLines.push(line);
   });
   
   process.stdin.on('end', solve);
   
   function solve() {
       const n = Number(_inputLines[0]);
       var arr = _inputLines[1].trim(" ").split(" ").map(num => Number(num));
       const k = Number(_inputLines[2])  
       
       const map = {}
       arr.forEach(value => {
        if(!map[value]) {
            map[value] = 1;
        } else {
            map[value] = map[value] + 1
        }
       });
   
       let first, second;
       
       for(let i = 0; i<n; i++) {
           const value = arr[i]
           const b = k - value
           // сколько раз обратная пара встречается в массиве
           const countB = map[b]
           
          if(isB) {
            // первое и второе число разные, или в списке есть две пары этого числа
            if(value !== b || value === b && countB>1 ) {
                first = value
                second = b
                break
            }
          }
       }
   

   if(typeof first !== 'undefined') {
    process.stdout.write(`${[first, second].join(' ')}`);
    return
   }
   process.stdout.write(`None`);
   
   }