
// Расчет скользящего среднего
// Для расчета используем два указателя на первый и последний элемент "окна"
function solve() {
    const n = Number('7');
    var arr = '1 2 3 4 5 6 7'.trim(" ").split(" ").map(num => Number(num));
    const k = Number('4')
    
    let startPosition = 0;
    let endPosition = startPosition + k-1;

    let avg = 0;
    let summ = 0;
    for(let i = 0; i<k; i++) {
    	summ+=arr[i];
    }
    avg = summ/k
    
    const res = [avg]
    
    
    for(let i = 1; i<=n-k; i++) {
    	summ = (summ - arr[startPosition] + arr[endPosition+1])

        startPosition = i
        endPosition = startPosition + k - 1

        res.push(summ/k)
    }
    
    console.log(`${res.join(' ')}`);
}

solve();