# Sorting Algorithm Visualizer 📊

An interactive **Sorting Algorithm Visualizer** built with **HTML**, **CSS**, and **JavaScript**. This tool allows users to visually explore how different sorting algorithms work by animating the sorting process of an array of random values. The project is designed for educational purposes to help understand the mechanics behind various sorting algorithms.



**➡️ [Live Demo](https://github.com/GauravSharma018/Sorting-Algorithm-Visualizer/)**

---
## ✨ Features

* **Comprehensive Algorithm Suite**: Visualize and compare a wide range of sorting algorithms.
* **Interactive Controls**: Full control over the visualization environment, including array size and animation speed.
* **Playback Management**: Start, Pause, and Resume the visualization to analyze the algorithm's state at any point.
* **Informative UI**: Live numerical feedback for controls and a display of the current array values.
* **Modern & Responsive Design**: A clean, intuitive, and responsive interface that works great on both desktop and mobile devices.

---
## 🧠 Sorting Algorithms Explained

This visualizer includes nine different sorting algorithms, each with a unique approach to ordering data.

### * **Bubble Sort**:
A simple algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The larger elements "bubble" to the end of the list. Stable Algorithm.
* Time Complexity: O(n^2) - Due to the nested loops, performance degrades quickly as the input size grows.
* Space Complexity: O(1) - It sorts the array in-place, requiring no extra memory.
* When to Use: Primarily for educational purposes. It is rarely used in real-world applications due to its poor performance.

### * **Selection Sort**:
Repeatedly finds the minimum element from the unsorted part of the array and puts it at the beginning. It maintains a sorted and an unsorted subarray. Unstable Algorithm.
* Time Complexity: O(n^2) - The number of comparisons remains the same regardless of the initial order of elements.
* Space Complexity: O(1) - An in-place sorting algorithm.
* When to Use: Useful when memory is limited and the cost of swapping elements is high, as it makes the minimum possible number of swaps.

### * **Insertion Sort**: 
Builds the final sorted array one item at a time. It iterates through the input elements and "inserts" each element into its correct position in the sorted part of the array, much like sorting a hand of playing cards. Stable Algorithm.
* Time Complexity: O(n^2) - In the worst case, each element needs to be shifted. It performs very well (O(n)) on nearly sorted data.
* Space Complexity: O(1) - An in-place sorting algorithm.
* When to Use: Excellent for small datasets. Many hybrid algorithms, like Timsort, use it to sort small partitions.

### * **Merge Sort**: 
A "divide and conquer" algorithm. It divides the array into two halves, recursively sorts them, and then merges the two sorted halves back into one sorted array. Stable Algorithm.
* Time Complexity: O(nlogn) - Its performance is consistent across all cases (worst, average, and best) due to its balanced division strategy.
* Space Complexity: O(n) - Requires extra arrays to store the divided halves during the merging process.
* When to Use: A great choice when you need a stable sort with guaranteed O(nlogn) performance. Its main drawback is the extra space requirement.

### * **Quick Sort**: 
Also a "divide and conquer" algorithm. It picks an element as a pivot and partitions the array around the pivot, placing smaller elements to its left and larger ones to its right. The subarrays are then sorted recursively. Unstable Algorithm.
* Time Complexity: O(nlogn) on average. Its worst-case performance is O(n^2), though this is rare with good pivot selection.
* Space Complexity: O(logn) - The space is used for the recursion stack.
* When to Use: The most common general-purpose sorting algorithm. It's typically faster than Merge Sort in practice due to better cache performance and being in-place.

### * **Heap Sort**: 
This comparison-based algorithm uses a binary heap data structure. It first converts the array into a max-heap and then repeatedly extracts the maximum element from the heap and places it at the end of the sorted portion of the array. Unstable Algorithm.
* Time Complexity: O(nlogn) - Consistent performance due to the properties of the heap structure.
* Space Complexity: O(1) - It is an in-place sorting algorithm.
* When to Use: When you need a sort with guaranteed O(nlogn) performance but require O(1) space. Ideal for memory-constrained applications where the worst case must be avoided.

### * **Count Sort**: 
A non-comparison sorting algorithm that is efficient for a limited range of integer inputs. It works by counting the number of occurrences of each distinct element in the input array. Stable Algorithm.
* Time Complexity: O(n+k) - Where n is the number of elements and k is the range of input values. This is extremely fast (linear time).
* Space Complexity: O(k) - Requires a "count" array of size k to store element frequencies.
* When to Use: For sorting integers when the range of numbers (k) is not significantly larger than the number of elements (n).

### * **Radix Sort**: 
A non-comparison integer sorting algorithm that sorts data with integer keys by grouping keys by the individual digits which share the same significant position and value. Stable Algorithm.
* Time Complexity: O(d⋅(n+k)) - Where d is the number of digits in the largest number. It can be faster than comparison-based sorts for large datasets of integers.
* Space Complexity: O(n+k) - Requires extra space for grouping elements based on their digits.
* When to Use: For sorting large lists of integers (or strings). It can be faster than comparison-based sorts in these specific cases.

### * **Bucket Sort**: 
This algorithm works by distributing the elements of an array into a number of "buckets." Each bucket is then sorted individually, either using a different sorting algorithm or by recursively applying the bucket sort algorithm. Stable Algorithm.
* Time Complexity: O(n+k) - On average, assuming the input data is uniformly distributed across the buckets. The worst-case is O(n^2).
* Space Complexity: O(n+k) - Requires extra space for the buckets.
* When to Use: Most effective when the input data is uniformly distributed over a range (e.g., floating-point numbers between 0.0 and 1.0).

---
## 🚀 Tech Stack

This project is built with fundamental web technologies, requiring no external frameworks.

* **Frontend**: HTML5, CSS3, JavaScript (ES6+)
* **Icons**: Font Awesome
* **Fonts**: Google Fonts

---
## 🛠️ How to Use

1.  **Generate an Array**: Click the **"Generate New Array"** button to start with a new random set of bars.
2.  **Adjust Settings**: Use the **"Size"** and **"Speed"** sliders to configure the visualizer to your preference.
3.  **Select an Algorithm**: Choose a sorting algorithm from the dropdown menu.
4.  **Start Sorting**: Click the **"Start"** button to begin the visualization.
5.  **Control Playback**: The button will change to **"Pause"** and **"Resume"**, allowing you to control the animation as it runs.

---
## 💻 Installation

To run this project on your local machine, follow these simple steps.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/GauravSharma018/sorting-visualizer
    ```

2.  **Navigate to the project directory**:
    ```bash
    cd sorting-visualizer
    ```

3.  **Open the HTML file**:
    Simply open the `index.html` file in your web browser. No special servers or build steps are required.

---
## 📄 License

This project is open-source and available under the **MIT License**. See the `LICENSE` file for more details.
