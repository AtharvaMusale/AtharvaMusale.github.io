
### Still working on the post


# **Introduction**-

From the emerge of [**ImageNet**](https://image-net.org/challenges/LSVRC/) competition **Convolutional Neural Networks(CNN)** have been the most favourite model for any Computer Vision experts. With its simplicity and brilliant frameworks like Tensorflow and Pytorch, it has become very easy to create a complex CNN architecture and implement it in tasks like Image Classification, Image Segmentation, Object Detection. In this blog I will try to explain CNNs in depth. This blog is going to be a bit long as there is lot to cover. So lets dive in!!!

# **Why Convolutional Neural Networks?**-

To answer this question we have to look into the traditional methods for image recognition. Previously for image recognition, lots of mathematically derived kernels were used which could be as simple as a Edge Detecting [Sobel fileters](https://en.wikipedia.org/wiki/Sobel_operator), [Histogram of oriented gradients](https://en.wikipedia.org/wiki/Histogram_of_oriented_gradients)(HOG) or [Scale-invariant feature transform](https://en.wikipedia.org/wiki/Scale-invariant_feature_transform) (SIFT). So a typical feature extraction from images would be based on the kind of filter which was used. If Sobel filters are used then we have the edge detected feature map as output. On the top of this edge detected feature map, a softmax layer used to be trained. In this whole process only softmax layer weights were learned by the network. But the kernels used were mathematically derived static filters. Refer the figure given below-
![image](https://user-images.githubusercontent.com/46114095/121986872-fdc0a400-cdb4-11eb-900f-0a031caa9d94.png)
So as you can see when the edge detecting filter was applied on the image we got the edge detected feature map (black coloured) as an output. On this edge detected feature map a softmax layer used to be trained and one use dto get the output class in the problem of image recognition.


**Now there are few questions which lead to invention of CNNs -**

1. In the traditional method only softmax layer was learned but kernels which were used for feature extraction were not learned, they were previosuly derived by the mathematicians for each type of extraction. But the questions now was, can we somehow learn these kernels as well?
![image](https://user-images.githubusercontent.com/46114095/121987660-8be95a00-cdb6-11eb-8330-9ccad29cdf55.png)

2. If we are able to learn the kernels, can we learn multiple kernels for one image?
![image](https://user-images.githubusercontent.com/46114095/121987720-aae7ec00-cdb6-11eb-9915-de71509aa691.png) 

3. If we are able to learn multiple kernels for each image can we have multiple layers of multiple kernels so that we can even extract feature on top of already extracted features?
![image](https://user-images.githubusercontent.com/46114095/121987762-baffcb80-cdb6-11eb-9e19-15bcdc06f85d.png)

**The answer to all these questions was Convolutional Neural Netwroks.**

