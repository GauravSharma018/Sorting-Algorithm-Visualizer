document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const newArrayBtn = document.getElementById('newArrayBtn');
    const sizeSlider = document.getElementById('sizeSlider');
    const speedSlider = document.getElementById('speedSlider');
    const sizeValue = document.getElementById('sizeValue');
    const speedValue = document.getElementById('speedValue');
    const algoSelect = document.getElementById('algoSelect');
    const startBtn = document.getElementById('startBtn');
    const barsContainer = document.getElementById('bars-container');
    const arrayDisplay = document.getElementById('array-display');

    // State
    let array = [];
    let isSorting = false;
    let isPaused = false;
    let delay = calculateDelay(speedSlider.value);
    
    // Generate and Render Array
    function generateArray() {
        if (isSorting) return;
        array = [];
        barsContainer.innerHTML = '';
        const size = sizeSlider.value;
        for (let i = 0; i < size; i++) {
            array.push(Math.floor(Math.random() * 100) + 1);
        }
        renderBars();
        arrayDisplay.textContent = `[${array.join(', ')}]`;
    }

    function renderBars() {
        barsContainer.innerHTML = '';
        array.forEach(value => {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.style.height = `${value}%`;
            bar.style.width = `${100 / array.length}%`;
            barsContainer.appendChild(bar);
        });
    }

    // Controls and Utilities
    function calculateDelay(speed) {
        return Math.floor(500 / speed);
    }
    
    async function sleep() {
        while (isPaused) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return new Promise(resolve => setTimeout(resolve, delay));
    }

    function swap(bars, i, j) {
        [array[i], array[j]] = [array[j], array[i]];
        [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
    }
    
    function updateControlsOnStart() {
        isSorting = true;
        newArrayBtn.disabled = true;
        sizeSlider.disabled = true;
        algoSelect.disabled = true;
        startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
    }
    
    function updateControlsOnEnd() {
        isSorting = false;
        isPaused = false;
        newArrayBtn.disabled = false;
        sizeSlider.disabled = false;
        algoSelect.disabled = false;
        startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start';
    }

    // Event Listeners
    newArrayBtn.addEventListener('click', generateArray);
    sizeSlider.addEventListener('input', (e) => {
        sizeValue.textContent = e.target.value;
        generateArray();
    });
    speedSlider.addEventListener('input', (e) => {
        speedValue.textContent = e.target.value;
        delay = calculateDelay(e.target.value);
    });

    startBtn.addEventListener('click', async () => {
        if (isSorting) {
            isPaused = !isPaused;
            if (isPaused) {
                startBtn.innerHTML = '<i class="fa-solid fa-play"></i> Resume';
            } else {
                startBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Pause';
            }
            return;
        }

        updateControlsOnStart();
        const algorithm = algoSelect.value;
        
        // Reset bar colors before starting
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.style.backgroundColor = 'var(--bar-default)');

        switch (algorithm) {
            case 'bubble': await bubbleSort(); break;
            case 'selection': await selectionSort(); break;
            case 'insertion': await insertionSort(); break;
            case 'merge': await mergeSort(); break;
            case 'quick': await quickSort(); break;
            case 'heap': await heapSort(); break;
            case 'count': await countingSort(); break;
            case 'radix': await radixSort(); break;
            case 'bucket': await bucketSort(); break;
        }
        
        // Final sorted animation
        for(let bar of document.querySelectorAll('.bar')){
            bar.style.backgroundColor = 'var(--bar-sorted)';
        }
        arrayDisplay.textContent = `Sorted: [${array.join(', ')}]`;
        updateControlsOnEnd();
    });
    
    // Initial setup
    generateArray();

    // --- ALL SORTING ALGORITHMS ---
    // (These are the full, correct implementations from the previous response)

    async function bubbleSort() {
        const bars = document.querySelectorAll('.bar');
        const n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (!isSorting) return;
                bars[j].style.backgroundColor = 'var(--bar-compare)';
                bars[j + 1].style.backgroundColor = 'var(--bar-compare)';
                await sleep();
                if (array[j] > array[j + 1]) {
                    bars[j].style.backgroundColor = 'var(--bar-swap)';
                    bars[j+1].style.backgroundColor = 'var(--bar-swap)';
                    await sleep();
                    swap(bars, j, j + 1);
                }
                bars[j].style.backgroundColor = 'var(--bar-default)';
                bars[j + 1].style.backgroundColor = 'var(--bar-default)';
            }
            bars[n - 1 - i].style.backgroundColor = 'var(--bar-sorted)';
        }
        if (n>0) bars[0].style.backgroundColor = 'var(--bar-sorted)';
    }

    async function selectionSort() {
        const bars = document.querySelectorAll('.bar');
        const n = array.length;
        for (let i = 0; i < n - 1; i++) {
            let minIdx = i;
            bars[i].style.backgroundColor = 'purple';
            for (let j = i + 1; j < n; j++) {
                if (!isSorting) return;
                bars[j].style.backgroundColor = 'var(--bar-compare)';
                await sleep();
                if (array[j] < array[minIdx]) {
                    if (minIdx !== i) {
                         bars[minIdx].style.backgroundColor = 'var(--bar-default)';
                    }
                    minIdx = j;
                    bars[minIdx].style.backgroundColor = 'orange';
                } else {
                    bars[j].style.backgroundColor = 'var(--bar-default)';
                }
            }
            if (minIdx !== i) {
                swap(bars, i, minIdx);
                bars[minIdx].style.backgroundColor = 'var(--bar-default)';
            }
            await sleep();
            bars[i].style.backgroundColor = 'var(--bar-sorted)';
        }
        if(n>0) bars[n - 1].style.backgroundColor = 'var(--bar-sorted)';
    }

    async function insertionSort() {
        const bars = document.querySelectorAll('.bar');
        const n = array.length;
        bars[0].style.backgroundColor = 'var(--bar-sorted)';
        for (let i = 1; i < n; i++) {
            let key = array[i];
            let keyHeight = bars[i].style.height;
            let j = i - 1;
            bars[i].style.backgroundColor = 'var(--bar-compare)';
            await sleep();
            while (j >= 0 && array[j] > key) {
                if (!isSorting) return;
                bars[j].style.backgroundColor = 'var(--bar-compare)';
                array[j + 1] = array[j];
                bars[j + 1].style.height = bars[j].style.height;
                j = j - 1;
                await sleep();
                 for(let k = i; k > j + 1; k--){
                    bars[k].style.backgroundColor = 'var(--bar-sorted)';
                }
            }
            array[j + 1] = key;
            bars[j + 1].style.height = keyHeight;
            for(let k = 0; k<=i; k++){
                bars[k].style.backgroundColor = 'var(--bar-sorted)';
            }
        }
    }

    async function mergeSort() {
        const bars = document.querySelectorAll('.bar');
        await mergeSortRecursive(0, array.length - 1, bars);
    }
    
    async function mergeSortRecursive(l, r, bars) {
        if (l >= r) {
            if (l >= 0 && l < bars.length) bars[l].style.backgroundColor = 'var(--bar-sorted)';
            return;
        }
        const m = Math.floor(l + (r - l) / 2);
        await mergeSortRecursive(l, m, bars);
        await mergeSortRecursive(m + 1, r, bars);
        if (!isSorting) return;
        await merge(l, m, r, bars);
    }
    
    async function merge(l, m, r, bars) {
        const n1 = m - l + 1;
        const n2 = r - m;
        const L = new Array(n1);
        const R = new Array(n2);
    
        for (let i = 0; i < n1; i++) L[i] = array[l + i];
        for (let j = 0; j < n2; j++) R[j] = array[m + 1 + j];
    
        let i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (!isSorting) return;
            if(bars[l+i]) bars[l + i].style.backgroundColor = 'var(--bar-compare)';
            if(bars[m+1+j]) bars[m + 1 + j].style.backgroundColor = 'var(--bar-compare)';
            await sleep();
            
            if (L[i] <= R[j]) {
                array[k] = L[i];
                if(bars[k]) bars[k].style.height = `${L[i]}%`;
                if(bars[l+i]) bars[l + i].style.backgroundColor = 'var(--bar-default)';
                i++;
            } else {
                array[k] = R[j];
                if(bars[k]) bars[k].style.height = `${R[j]}%`;
                if(bars[m+1+j]) bars[m + 1 + j].style.backgroundColor = 'var(--bar-default)';
                j++;
            }
            if(bars[k]) bars[k].style.backgroundColor = 'var(--bar-swap)';
            k++;
        }
    
        while (i < n1) { if (!isSorting) return; array[k] = L[i]; if(bars[k]) {bars[k].style.height = `${L[i]}%`; bars[k].style.backgroundColor = 'var(--bar-swap)';} i++; k++; await sleep(); }
        while (j < n2) { if (!isSorting) return; array[k] = R[j]; if(bars[k]) {bars[k].style.height = `${R[j]}%`; bars[k].style.backgroundColor = 'var(--bar-swap)';} j++; k++; await sleep(); }
        
        for (let idx = l; idx <= r; idx++) {
            bars[idx].style.backgroundColor = 'var(--bar-sorted)';
        }
    }

    async function quickSort() {
        const bars = document.querySelectorAll('.bar');
        await quickSortRecursive(0, array.length - 1, bars);
    }

    async function quickSortRecursive(low, high, bars) {
        if (low < high) {
            if (!isSorting) return;
            let pi = await partition(low, high, bars);
            await quickSortRecursive(low, pi - 1, bars);
            await quickSortRecursive(pi + 1, high, bars);
        } else if (low >= 0 && high >= 0 && low < bars.length && high < bars.length && low === high) {
            bars[low].style.backgroundColor = 'var(--bar-sorted)';
        }
    }
    
    async function partition(low, high, bars) {
        let pivot = array[high];
        bars[high].style.backgroundColor = 'purple';
        let i = low - 1;
    
        for (let j = low; j <= high - 1; j++) {
            if (!isSorting) return;
            bars[j].style.backgroundColor = 'var(--bar-compare)';
            await sleep();
            if (array[j] < pivot) {
                i++;
                swap(bars, i, j);
                 bars[i].style.backgroundColor = 'orange';
                 await sleep();
                 bars[i].style.backgroundColor = 'var(--bar-default)';
            }
            bars[j].style.backgroundColor = 'var(--bar-default)';
        }
        swap(bars, i + 1, high);
        await sleep();
        bars[high].style.backgroundColor = 'var(--bar-default)';
        bars[i + 1].style.backgroundColor = 'var(--bar-sorted)';
        return i + 1;
    }

    async function heapSort() {
        const bars = document.querySelectorAll('.bar');
        const n = array.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            if (!isSorting) return;
            await heapify(n, i, bars);
        }
        for (let i = n - 1; i > 0; i--) {
            if (!isSorting) return;
            swap(bars, 0, i);
            bars[i].style.backgroundColor = 'var(--bar-sorted)';
            await sleep();
            await heapify(i, 0, bars);
        }
        if (n > 0) bars[0].style.backgroundColor = 'var(--bar-sorted)';
    }
    
    async function heapify(n, i, bars) {
        let largest = i; 
        let l = 2 * i + 1;
        let r = 2 * i + 2;
    
        if (l < n && array[l] > array[largest]) largest = l;
        if (r < n && array[r] > array[largest]) largest = r;
    
        if (largest !== i) {
            if (!isSorting) return;
            bars[i].style.backgroundColor = 'var(--bar-compare)';
            bars[largest].style.backgroundColor = 'var(--bar-compare)';
            await sleep();
            swap(bars, i, largest);
            bars[i].style.backgroundColor = 'var(--bar-default)';
            bars[largest].style.backgroundColor = 'var(--bar-default)';
            await heapify(n, largest, bars);
        }
    }
    
    async function countingSort() {
        const bars = document.querySelectorAll('.bar');
        const n = array.length;
        let max = Math.max(...array);
        const count = new Array(max + 1).fill(0);
        const output = new Array(n);
        for (let i = 0; i < n; i++) { if (!isSorting) return; bars[i].style.backgroundColor = 'var(--bar-compare)'; await sleep(); count[array[i]]++; bars[i].style.backgroundColor = 'var(--bar-default)'; }
        for (let i = 1; i <= max; i++) { count[i] += count[i - 1]; }
        for (let i = n - 1; i >= 0; i--) { if (!isSorting) return; bars[i].style.backgroundColor = 'var(--bar-compare)'; output[count[array[i]] - 1] = array[i]; count[array[i]]--; await sleep(); bars[i].style.backgroundColor = 'var(--bar-default)'; }
        for (let i = 0; i < n; i++) { if (!isSorting) return; array[i] = output[i]; bars[i].style.height = `${array[i]}%`; bars[i].style.backgroundColor = 'var(--bar-swap)'; await sleep(); }
    }
    
    async function radixSort() {
        const bars = document.querySelectorAll('.bar');
        let max = Math.max(...array);
        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
            if (!isSorting) return;
            await countingSortForRadix(exp, bars);
        }
    }

    async function countingSortForRadix(exp, bars) {
        const n = array.length;
        const output = new Array(n);
        const count = new Array(10).fill(0);
        for (let i = 0; i < n; i++) { count[Math.floor(array[i] / exp) % 10]++; }
        for (let i = 1; i < 10; i++) { count[i] += count[i - 1]; }
        for (let i = n - 1; i >= 0; i--) { if (!isSorting) return; const digit = Math.floor(array[i] / exp) % 10; bars[i].style.backgroundColor = 'var(--bar-compare)'; output[count[digit] - 1] = array[i]; count[digit]--; await sleep(); bars[i].style.backgroundColor = 'var(--bar-default)'; }
        for (let i = 0; i < n; i++) { if (!isSorting) return; array[i] = output[i]; bars[i].style.height = `${array[i]}%`; bars[i].style.backgroundColor = 'var(--bar-swap)'; await sleep(); }
    }

    async function bucketSort() {
        const bars = document.querySelectorAll('.bar');
        const n = array.length;
        if (n <= 0) return;
        let buckets = new Array(n);
        for (let i = 0; i < n; i++) { buckets[i] = []; }
        for (let i = 0; i < n; i++) { if (!isSorting) return; bars[i].style.backgroundColor = 'var(--bar-compare)'; await sleep(); const maxVal = 101; let bucketIndex = Math.floor((array[i] / maxVal) * n); buckets[bucketIndex].push(array[i]); bars[i].style.backgroundColor = 'var(--bar-default)'; }
        for (let i = 0; i < n; i++) { insertionSortForBucket(buckets[i]); }
        let index = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < buckets[i].length; j++) {
                if (!isSorting) return;
                array[index] = buckets[i][j];
                bars[index].style.height = `${array[index]}%`;
                bars[index].style.backgroundColor = 'var(--bar-swap)';
                index++;
                await sleep();
            }
        }
    }
    
    function insertionSortForBucket(bucket) {
        for (let i = 1; i < bucket.length; i++) { let key = bucket[i]; let j = i - 1; while (j >= 0 && bucket[j] > key) { bucket[j + 1] = bucket[j]; j = j - 1; } bucket[j + 1] = key; }
    }
});
