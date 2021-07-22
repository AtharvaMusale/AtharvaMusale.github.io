I find deep learning as extremely fascinating field due to its enormous power of producing state of the art results. But still most people in the industry consider it as a black box full of unpredictability. Lack of interpretability of the Deep Learning algorithms has been the biggest problem and currently one of the most challenging tasks to be implemented which has actually lead to the sub branch of Artificial Intelligence(AI) called Explainable AI. In this blog I am going to try to explain basic concepts which are required to get one started in Deep Learning. 

# **What exactly is Deep Learning-** 

The very standard definition of Deep learning is artificial intelligence (AI) function that imitates the workings of the human brain in processing data and creating patterns for its use in decision making. Deep learning is actually a mere try to replicate few functions of the few neurons in the brain using the mathematical functions and the compute power of modern day computers. 

# **Biological Neuron Structure-**
Before diving in the deep learning concepts let's try to understand the source of inspiration for making the mathematical neuron based functions. 

![image](https://user-images.githubusercontent.com/46114095/126590706-6792754b-aa5e-408f-a23c-392ef135ee13.png)

There are actually **10 Billion** neurons in our brain and each of them are connected to roughly **10000 other neurons**. Each neuron receives electrochemical inputs from other neurons at the dendrites.  If the sum of these electrical inputs is sufficiently powerful to activate the neuron, it transmits an electrochemical signal along the axon, and passes this signal to the other neurons whose dendrites are attached at any of the axon terminals. These attached neurons may then fire. It is important to note that a neuron fires only if the total signal received at the cell body exceeds a certain level.  The neuron either fires or it doesn't, there aren't different grades of firing.


# **Analogy-** 
I really like to think of deep learning with a analogy of a toddler learning new alphabets. Think of how would you teach a toddler about alphabets? Probably playcards or some sticknots with alphabets written on them?. Lets say you will show a sticky note with the alphabet written on it and speak out what alphabet that was to a toddler only once and ask him/her what was that letter? First time he/she may not be able to give the correct answer. But think of showing him the same alphabet thousands of times with its pronounciation, and then ask him/her the next time what letter was that? The probability of a toddler giving a correct answer will be fairly high. This is exactly what is done in the deep learning. We use mathematical neural network and pass certain inputs through it say 10 or 100 or 1000000 times. Neural network adjusts the weights in the network and the next time when you pass the input just to verify if network weights are learnt properly or not, network will most probably give correct answer. So this is how the deep neural networks learn the new information just like what a toddler learns alphabtes.



# **Perceptron-** 
The simplest form of mathematical replication of how biological neurons is called perceptron, this is like a basic building block which will be used in almost all the deep neural networks.

![image](https://user-images.githubusercontent.com/46114095/126589557-6c77b127-7800-4f13-a022-276c30b2f818.png)

The above figure shows the perceptron structure. In the above figure **Xi**s are the inputs of the perceptron, **Wi**s are the weights associated with each input, **b** is the bias constant used for shifting the actiavtion function by some value(It can be also set to 0 for simplicity but ideally it is randomly initialized). The first round block will be giving the weighted sum of the inputs as an output. The second round block will be applying any one of the kind of activation function(in case of perceptorn simple step function) on that weighted sum to get the final output. If the final output is greater than certain threshold then the output of the perceptron will be fired or else it will stay in the idle state. The significance of the weights in the weighted sum is to select how much portion of the input should be used to calculate the final output. The range of weights and bias value is in between 0 and 1. These weights are learnt when the deep neural networks are trained. These weights are adjusted to learn the new information in better manner.  

Simple equation of the perceptron can be written as-

**f(x) = (∑ wi * xi +b)** ... Weighted sum 

Since in case of perceptron only step function will be used, a threshold will be set and according to threshold value the output will be - **if f(x)>threshold then output will be 1 else it will be 0.**




# **Need Of Multi-Layer Perceptron-** 
* **Biological Inspiration -**

In case of brain neurons there are lots and lots of interlinking of the neurons in the brain. This makes the chain of networks of the neurons which are used to carry out intensive tasks. Similarly perceptron can be stacked in the form of networks to performs some complex tasks

* **Complex Mathematical Computation -**

Consider this equation f(x) = 2sin(x) + e^x - sqrt(x^4)
Such comoplex equations can be done using where each of these operations will be done with each layer of neuron. 

# **How the neural networks actually learn the weights?**
## **Training a single neuron model** - 

There are 3 steps involved in training a single neuron network.

* **Defining a loss function -** 

**L = ∑(i=1 to n) (y_i-yhat_i)^2 + regularization term**
Here L is the loss function. This equation will be optimized while training the neural network. Here y_i is the true output for a particular input. y_hat is the predicted output for a particular input by a netowrk. Regularization term will be used to avoid overfitting, we will come across this concept in the later sections of this chapter. So this equation is taking a sum of squared difference between the actual output and the predicted outputs across all the sets of inputs in a dataset and then adding the regularization term to it. This whole equation is the loss function of a single neuron. (Here the yhat_i = f(w_i^T * x_i))

* **Optimization Problem-**

**w_opt = argmin ∑(i=1 to n) (y_i - f(w_i^T * x_i))^2 + regularization term**
The goal of this optimization problem is to minimze this loss value. Lesser the loss, better would be neural network model's output will be. W_opt is the optmized value of the weights which will give the best results.

* **Solving the optimization equation-**

1. Initialization of w_i randomly.
2. Calculating a partial derivatives of loss function w.r.t each of the weights
3. x<sub>i_new</sub> = w<sub>i_old</sub> - η * [∂L/∂w<sub>i</sub>]<sub>wi</sub>





# **Reference** - 
[https://cs.stanford.edu/people/eroberts/courses/soco/projects/neural-networks/Biology/index.html]
[https://towardsdatascience.com/mcculloch-pitts-model-5fdf65ac5dd1]
