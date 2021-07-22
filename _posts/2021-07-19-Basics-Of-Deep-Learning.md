I find deep learning as extremely fascinating field due to its enormous power of producing state of the art results. But still most people in the industry consider it as a black box full of unpredictability. Lack of interpretability of the Deep Learning algorithms has been the biggest problem and currently one of the most challenging tasks to be implemented which has actually lead to the sub branch of Artificial Intelligence(AI) called Explainable AI. In this blog I am going to try to explain basic concepts which are required to get one started in Deep Learning. 

# **What exactly is Deep Learning** - 

The very standard definition of Deep learning is artificial intelligence (AI) function that imitates the workings of the human brain in processing data and creating patterns for its use in decision making. Deep learning is actually a mere try to replicate few functions of the few neurons in the brain using the mathematical functions and the compute power of modern day computers. 

# **Biological Neuron Structure** -
Before diving in the deep learning concepts let's try to understand the source of inspiration for making the mathematical neuron based functions. 

![image](https://user-images.githubusercontent.com/46114095/126590706-6792754b-aa5e-408f-a23c-392ef135ee13.png)

There are actually **10 Billion** neurons in our brain and each of them are connected to roughly **10000 other neurons**. Each neuron receives electrochemical inputs from other neurons at the dendrites.  If the sum of these electrical inputs is sufficiently powerful to activate the neuron, it transmits an electrochemical signal along the axon, and passes this signal to the other neurons whose dendrites are attached at any of the axon terminals. These attached neurons may then fire. It is important to note that a neuron fires only if the total signal received at the cell body exceeds a certain level.  The neuron either fires or it doesn't, there aren't different grades of firing.


# **Analogy** - 
I really like to think of deep learning with a analogy of a toddler learning new alphabets. Think of how would you teach a toddler about alphabets? Probably playcards or some sticknots with alphabets written on them?. Lets say you will show a sticky note with the alphabet written on it and speak out what alphabet that was to a toddler only once and ask him/her what was that letter? First time he/she may not be able to give the correct answer. But think of showing him the same alphabet thousands of times with its pronounciation, and then ask him/her the next time what letter was that? The probability of a toddler giving a correct answer will be fairly high. This is exactly what is done in the deep learning. We use mathematical neural network and pass certain inputs through it say 10 or 100 or 1000000 times. Neural network adjusts the weights in the network and the next time when you pass the input just to verify if network weights are learnt properly or not, network will most probably give correct answer. So this is how the deep neural networks learn the new information just like what a toddler learns alphabtes.



# **Perceptron** - 
The simplest form of mathematical replication of how biological neurons is called perceptron, this is like a basic building block which will be used in almost all the deep learning neural networks.

![image](https://user-images.githubusercontent.com/46114095/126589557-6c77b127-7800-4f13-a022-276c30b2f818.png)

The above figure shows the perceptron structure. 


# **Reference** - 
[https://cs.stanford.edu/people/eroberts/courses/soco/projects/neural-networks/Biology/index.html]
[https://towardsdatascience.com/mcculloch-pitts-model-5fdf65ac5dd1]
