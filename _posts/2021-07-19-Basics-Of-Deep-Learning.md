I find deep learning as extremely fascinating field due to its enormous power of producing state of the art results. But still most people in the industry consider it as a black box full of unpredictability. Lack of interpretability of the Deep Learning algorithms has been the biggest problem and currently one of the most challenging tasks to be implemented which has actually lead to the sub branch of Artificial Intelligence(AI) called Explainable AI. In this blog I am going to try to explain basic concepts which are required to get one started in Deep Learning. 

# **What exactly is Deep Learning** - 

The very standard definition of Deep learning is artificial intelligence (AI) function that imitates the workings of the human brain in processing data and creating patterns for its use in decision making. Deep learning is actually a mere try to replicate few functions of the few neurons in the brain using the mathematical functions and the compute power of modern day computers. 

# **Biological Neuron Structure** -
Before diving in the deep learning concepts let's try to understand the source of inspiration for making the mathematical neuron based functions. 

![image](https://user-images.githubusercontent.com/46114095/126327718-214de2e6-e0ed-4c33-ab1c-223c9b4b799a.png)

There are actually **10 Billion** neurons in our brain and each of them are connected to roughly **10000 other neurons**. Each neuron receives electrochemical inputs from other neurons at the dendrites.  If the sum of these electrical inputs is sufficiently powerful to activate the neuron, it transmits an electrochemical signal along the axon, and passes this signal to the other neurons whose dendrites are attached at any of the axon terminals. These attached neurons may then fire. It is important to note that a neuron fires only if the total signal received at the cell body exceeds a certain level.  The neuron either fires or it doesn't, there aren't different grades of firing.

# **Mathematical Neuron Structure** - 
The simplest for of mathematical replication of how biological neurons work was done by McCulloch-Pitts in the year 1943.

![image](https://user-images.githubusercontent.com/46114095/126329005-e7e1a503-628b-4a1a-908d-af792d5cf4f5.png)

This is how basic neuron was created using simple mathematical function. **g** takes an input(in biological neuron input is nothing but the dendrites). It performs the addition of all the inputs and the **f** makes the decision based on the value of **g**.

Lets assume an output of an experiment where I want to go to play Basketball. Let 
* **x1** be an input if it will rain or not
* **x2** be an input of wheather a weather outside is pleasant or not.
* **x3** be an input wheather there is too much traffic or not.
* **x4** be an input wheather the 



# **Reference** - 
https://cs.stanford.edu/people/eroberts/courses/soco/projects/neural-networks/Biology/index.html
https://towardsdatascience.com/mcculloch-pitts-model-5fdf65ac5dd1
