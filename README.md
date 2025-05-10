# Traveling Salesperson Problem -- Empirical Analysis

For this exercise, you'll need to take the code from the TSP Held-Karp and TSP
Local Search exercises. This can be your own implementation or somebody else's.
You will now do an empirical analysis of the implementations, comparing their
performance. Both the Held-Karp and the Local Search algorithms solve the same
problem, but they do so in completely different ways. This results in different
solutions, and in different times required to get to the solution.

Investigate the implementations' empirical time complexity, i.e. how the runtime
increases as the input size increases. *Measure* this time by running the code
instead of reasoning from the asymptotic complexity (this is the empirical
part). Create inputs of different sizes and plot how the runtime scales (input
size on the $x$ axis, time on the $y$ axis). Your largest input should have a
runtime of *at least* an hour. The input size that gets you to an hour will
probably not be the same for the Held-Karp and Local Search implementations.

In addition to the measured runtime, plot the tour lengths obtained by both
implementations on the same input distance matrices. The length of the tour that
Held-Karp found should always be less than or equal to the tour length that
Local Search found. Why is this?

Add the code to run your experiments, graphs, and an explanation of what you did
to this markdown file.

### Comparison 

I compared my own TSP Local Search implementation to CadeMaynard's TSP Held Karp implementation. To do this, I compiled both into the same file and created separate test functions that measured the amount of time each of them took to run. Then in a separate file, implemented a function to randomly create a matrix of a set size for testing. I randomly tested different sizes of matrices to get an idea of how long each function approximately took for each one. I found that the Held Karp program reached over an hour's runtime with a matrix of size 11, and the Local Search program reached over an hour's runtime with a matrix of size 6100. I ran both functions from size 1 to 11 to compare them, but ran Local Search for an hour separately since Held Karp wouldn't be able to handle that large of an input. 

After gathering the data from the console, which is stored in data.txt, I created the two line graphs to better compare how the programs each ran. To keep a better proportion, I left out the point where Local Search ran for an hour, since it took a signifcantly larger input size. 

The RuntimeComparison graph shows the extreme exponential runtime of Held Karp compared to Local Search, with runtimes converted to seconds. The beginning 8 or so inputs have very similar runtimes. At input size 9, Held Karp begins to take signifcantly longer than Local Search, which remains approximately the same throughout this test code. It does grow, as demonstrated with input of 6100, but much slower than Held Karp. 

The TourLengthComparison graph also shows an interesting correlation. Held Karp's tour length is always smaller or equal to Local Search, making it a more accurate program. This is because of the same reason it takes so much longer to determine a tour length than Local Search for larger input sizes. Held Karp is by nature a brute force function, which means it examines every possible solution to determine the correct answer. As the input size increases, the potential solutions also increase, and therefore the runtime increases. Compared to a more random approach, Local Search, it makes sense why it would not only take longer, but return more accurate results. Local Search randomly chooses where to swap points on a tour, and keeps track of the shortest it finds. My implementation only runs for the number of elements in the array. While it is possible to find the shortest tour length with this implementation, it isn't guaranteed as the program doesn't keep track of the random choices and eventually times out. However, while it lacks accuracy, it does perform faster and is able to handle larger input sizes than Held Karp. Therefore the tour length returned by Held Karp will always be the best possible solution, so the tour length from Local Search can be equal at best. 


### Resources and Plagiarism

- https://github.com/COSC3020/tsp-held-karp-CadeMaynard, I used CadeMaynard's Held Karp implementation to compare to my Local Search implementation

I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice.
