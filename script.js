let array = [];
let barsContainer = document.getElementById("bars");
let speedRange = document.getElementById("speedRange");
let speedValue = document.getElementById("speedValue");
let delay = 100;  // Delay between sorting steps (in milliseconds)

// Function to generate a new array of random heights
function generateArray() {
  const numBars = 50;
  array = [];
  barsContainer.innerHTML = '';

  for (let i = 0; i < numBars; i++) {
    array.push(Math.floor(Math.random() * 300) + 10); // Random height between 10 and 300
  }
  renderBars();
}

// Render bars based on the array
function renderBars() {
  barsContainer.innerHTML = '';
  array.forEach((height) => {
    let bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    barsContainer.appendChild(bar);
  });
}

// Update speed value display
speedRange.addEventListener('input', function() {
  delay = 110 - speedRange.value; // Adjust the delay based on the slider value
  speedValue.textContent = `Speed: ${speedRange.value}`;
});

// Function to start the selected sorting algorithm
function startSorting() {
  const algorithm = document.getElementById('algorithmSelect').value;
  switch (algorithm) {
    case 'bubbleSort':
      bubbleSort();
      break;
    case 'mergeSort':
      mergeSort([...array]);
      break;
    case 'quickSort':
      quickSort(array, 0, array.length - 1);
      break;
  }
}

// Bubble Sort Algorithm
async function bubbleSort() {
  let bars = document.querySelectorAll('.bar');
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        // Swap elements in the array
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderBars();
        await sleep(delay);
      }
    }
  }
}

// Merge Sort Algorithm (Helper Functions)
async function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(await mergeSort(left), await mergeSort(right));
}

async function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
}

// Quick Sort Algorithm (Helper Functions)
async function quickSort(arr, low, high) {
  if (low < high) {
    let pivot = await partition(arr, low, high);
    await quickSort(arr, low, pivot - 1);
    await quickSort(arr, pivot + 1, high);
  }
}

async function partition(arr, low, high) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap
      renderBars();
      await sleep(delay);
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];  // Swap pivot
  renderBars();
  await sleep(delay);
  return i + 1;
}

// Sleep function to delay the animations
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Initialize the array
generateArray();
