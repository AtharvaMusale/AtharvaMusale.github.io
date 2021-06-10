# **Introduction** -

Transformers in the latest natural language processing research has become a defacto for the models to give the best results. Its applications in computer vision are still not widely known. Some efforts were taken to replace certain parts of the CNN network using self-attention, but the basic building structure of the CNN architecture remained intact. However, the Vision Transformers are now set to revolutionize the computer vision field. The Vision Transformer paper explains that the reliance on CNNs is no longer needed and transformers can outperform traditional CNN architectures when applied on patches of images. When trained on substantially large data and fine-tuned on smaller data or transferred onto mid or small-sized datasets like CIFAR-100, Imagenet, transformers give excellent results as compared to traditional CNNs state of the art architectures with fewer computational resources needed. This blog will be referring to [Vision Transformers](https://arxiv.org/pdf/2010.11929v2.pdf) paper. 
 
Inspired by the transformers in NLP, standard transformers were directly applied to images. To do so images are first converted into small patches and linear embeddings of these patches are fed to the transformer encoders. Image patches are treated the same way as the tokens are treated in NLP applications. When trained on mid-sized datasets like Imagenet, transformers gave modest accuracy just below the ResNets of comparable size. But transformers lacked a few of the inductive biases inherent to CNNs, such as translation equivariance and locality, and therefore do not generalize well when trained on insufficient amounts of data. However, when transformers are trained on large data it outperforms most of the SOTA algorithms.


# **Vision Transformer Architecture Overview** - 

<img width="913" alt="VisionTransformer" src="https://user-images.githubusercontent.com/46114095/121113343-85e00000-c82f-11eb-800f-654a4f667c56.png">
The above image can be summarized in following steps - 
- Splitting the image in fixed sized patches.

- Linearly Embedding each of the image patches.

- Adding the positional embedding to the linear embeddings of image patches.

- Adding the extra learnable "classification token" to the sequence.

- Feeding the resulting sequence to the transformer encoder.



# **Mathematical Explanation** - 

Transformers in NLP receive the 1D sequence of token embeddings. To handle the 2D images, the images of x ∈ R^(H×W×C) are reshaped into a sequence of flattened 2D image patches xp ∈ R^(N×((P^2)*C)), where (H, W) is the resolution of the original image, C is the number of channels, (P, P) is the resolution of each image patch. N is the number of patches.

Similar to [BERT](https://jalammar.github.io/illustrated-bert/) a learnable embedding token is added before the sequence of embedded patches whose output will be used to represent the image. Adding a 2D aware positional embedding (11,12,13,14,21,22,23,24,31,....,44) didn't improve the performance so paper uses the 1D positional embedding for the image patches (for eg. 1,2,3,...,16)

A typical structure of transformer encoder has alternating layers of self-attention blocks and MLP blocks and a layer norm is applied before each of these two blocks and a residual connection after each block.

<img width="831" alt="Screenshot 2021-06-09 at 6 36 05 PM" src="https://user-images.githubusercontent.com/46114095/121359927-98eaf100-c951-11eb-9ed9-500d1a1b528b.png">

<img width="933" alt="Screenshot 2021-06-09 at 10 38 48 AM" src="https://user-images.githubusercontent.com/46114095/121296849-f447bf80-c90e-11eb-814c-44a63c564b5e.png">

Try to use the diagram of the Transformer Encoder block for a better understanding of the equations shown above
- In Eq(1), **xclass** represents the learnable embedding prepended just like in the case of BERT model. All other **xp_i** s represent the patches of the image where i indicates the 1D positional embedding. **E** is patch embedding projection so if we consider a patch size as 1 then it can be simply thought of as a flattened representation of the whole 2D image. **Epos** is the embedding with the shape of (N+1)*D where **N** is the number of patches and **D** is the flattened map dimensions of the patch(N for a number of patches and one for the prepended xclass).

- In Eq(2), **Zl'** is an output which is obtained by adding the output of the last block (Zl-1) with the Multiheaded Self Attended layer normalized output of the previous block (MSA(LN(Zl-1))) where **l=1,2,..., L**. So **Zl' will start from taking the Z0 and go till ZL-1**. 

- In Eq(3), **Zl** is an output which is obtained by the addition of output of the MSA block (Zl') and the layer normalized MLP output of the output of the MSA block output (MLP(LN(Zl')))

- In Eq(4), **y** is the layer normalized output of the Zl_0 where Zl_0 = xclass (Prepended BERT-like embedding).

# **Additional Mathematical Details** -

**SGD vs Adam for ResNets**-

In the typical experiments ResNets are normally trained with SGD as an optimizer but the experiments shown below shows that on average, Adam performs better in general on all datasets when the model is trained on the JFT dataset.
![image](https://user-images.githubusercontent.com/46114095/121460567-c32cc500-c9ca-11eb-8479-5e7da2ed2360.png)

**Transformer Shape**-

![image](https://user-images.githubusercontent.com/46114095/121460919-709fd880-c9cb-11eb-81b0-e5a28fdb9357.png)
The above figure shows the experiments with the transformers done and it was found that changing the depths shows maximum improvement and changing the width had the least improvement. Decreasing the patch size and improving the effective sequence length show surprising improvements without adding any parameters. Overall the conclusion from this figure was depth variation should be preferred over the width of the network. Scaling all the dimensions will be the best robust improvement for the model

**Head type and Class Token-**

In order to make the vision transformer as close as one can to the BERT model, a class token z0 = xclass is taken which is taken as an image representation. the output from this token is passed from a small MLP network with tanh activation to get the final class predictions. There was another attempt made by using GlobalAveragePooling but both almost performed similarly. But both the class token method and GlobalAverage pooling required different learning rates. Finally, the class token method was chosen.
![image](https://user-images.githubusercontent.com/46114095/121461696-fa03da80-c9cc-11eb-8882-54957de876b8.png)

**Positional Embedding**-

For positional embedding, several experiments were done - 
- Not giving any positional embedding
- 1D positional embedding: considering all the inputs as a sequence of patches (1,2,3,4,...N) where N is a total number of patches.
- 2D positional embeddings: Considering the inputs as a grid in two-dimensional patches. in this two sets of embeddings are learned one for the X-embeddings and one for Y-embeddings each with the size of D/2. then X and y embeddings are concatenated to get the final positional embedding. (for eg. assume we have 9 patches of the image so final concatenated embeddings will be 11,12,13,21,22,23,31,32,33 etc).
- Relative positional embedding: For every pair of patches (one as a query and the other as a key/value in attention mechanism) we have an offset pq-pk where each offset is associated with embeddings, One more attention is carried out where the original query is used but the key is taken as a relative positional embedding. Logits from the relative attention are used as a bias term and add it to the logits of the main attention, before applying softmax.
![image](https://user-images.githubusercontent.com/46114095/121463554-e7d76b80-c9cf-11eb-9180-4ee844d6f8d1.png)
We can see that there is a significant difference between no positional embeddings and positional embeddings but there is not a significant difference between what kind of positional embedding is used. Since transformers work on patch level inputs and not on pixel-level inputs positional embeddings are no of much importance so 1D positional embedding is used. 

**Axial Attention**-

Axial attention is also a simple yet effective method to apply on large inputs sizes that are arranged as multidimensional tensors. Generally axial attention is performed multiple attention operations each along a single axis. Instead of applying on the 1D tensor, each attention mixes information along a particular axis and keeps  the information along other axis independent.
![image](https://user-images.githubusercontent.com/46114095/121464455-84e6d400-c9d1-11eb-9004-4a09c0467deb.png)
As we can see that in terms of computes AxialResNet50 works well and consumes less compute resources. But the inference time is extremely slow. So this method is not used for ViT.

**Attention Distance**-

![image](https://user-images.githubusercontent.com/46114095/121464785-29691600-c9d2-11eb-81d1-418021e84cd8.png)
To understand how attention in ViT works refer the above figure. Attention span in the ViT can be thought of just like CNNs receptive field. Average attention distance is highly variable in lower heads like some attention heads are attending too much field in an image and some of the attention heads are attending very small areas in an image near query location. As the depth increases the attention distance increases for all heads.
** Attention Maps**-
To get the attention maps, attention rollouts are used. Averaging the attention weights of ViT-L/16 across all the heads and then recursively multiplied the weights matrices of all layers. this mixes all the attention across tokens through all layers.




# **Advantage of Transformers** - 

**Inductive Bias**- 

Vision transformers have much less inductive bias than CNNs. This must be because traditional CNNs look at the local features one by one and somehow tries to generalize it. This leads to translational equivariance is baked into each layer throughout the whole model. but in the case of Vision Transformers, only MLP are translationally equivariant while the self-attention is global. Two-dimensional neighborhood is not used. Positional embeddings at the initialization time carry no information about the 2D positions of the patches and all the spatial relations have to be learned from scratch.

**Hybrid Architecture**-

An alternative to raw image a patch, input sequence can be formed from feature maps using CNNs. In this hybrid model patch embedding projection **E** (Eq.1) is applied to the patches extracted from CNN maps. If the patch size is kept as 1x1 then it can simply be a flattened projection.

# **Fine Tuning and Higher resolution** - 

Typically transformers are pre trained on a large dataset and fine tuned to downstream tasks. So in this normally a pretrained prediction head is removed and a zero intialized feed forward layers of size D*K are attached in place of pretrained prediction head. D is the output shape of the previous transformer Where k is the number of output classes. It is observed that it is better to fine tune at higher resolution than pretraining. When the images of higher resolution are fed and the patch size is kept same, it will result in large receptive sequence length. Transformer can process any sequence lengths however the pre-trained positional embedding will make no sense now. So to deal with this 2D interpolation(For each pixel approximate the nearest value) is used of the positional embeddings according to their location in the original image. Resolution adjustment and patch extraction are the only two points where the inductive bias about the images are manually injected into Vision Transformers.

# **Experiments Done**-

**Datasets**- 

For testing the model scalability model was trained on ILSVRC-2012 ,ImageNet-21k and JFT and then tested on CIFAR-10/100, Oxford-IIIT Pets, Oxford Flowers-102
<img width="937" alt="Screenshot 2021-06-09 at 4 30 18 PM" src="https://user-images.githubusercontent.com/46114095/121343234-16a60100-c940-11eb-954d-df1a754a7f99.png">
ViT-base and ViT-large are based on the BERT model architectures only. The larger ViT huge model is added ahead.

**Training & Fine-tuning**-

For the baseline CNNs Resnets are used but BatchNormalization are replaced by [GroupNomalization](https://towardsdatascience.com/what-is-group-normalization-45fe27307be7).For training optimizer used was Adam with a β1 = 0.9, β2 = 0.999. a batch size of 4096 and apply a high weight decay of 0.1.
For fine-tuning we use SGD with momentum,batch size 512. **Metrics** used for the downstream datsets is nothing but accuracy. Few shot accuracies are obtained by usign regularized least squared regression problem that maps subset of training images to {-1,1}^k target variables.

# **Results**-

<img width="923" alt="Screenshot 2021-06-09 at 4 58 05 PM" src="https://user-images.githubusercontent.com/46114095/121346685-098b1100-c944-11eb-89aa-8f534c9805b9.png">
A common observation can be made that vision tranformer is outperforming the Resnet based baselines on all datasets and also taking less computational resources to pre-train.

Another experiment was done based on the type of datasets available. The model was trained on three types of datasets Natural( Pets, CIFAR, etc.), Specialized(medical and satellite imagery) and Structured(tasks that require geometric understanding like localization). The results look like 
<img width="919" alt="Screenshot 2021-06-09 at 5 09 07 PM" src="https://user-images.githubusercontent.com/46114095/121347988-6fc46380-c945-11eb-9cf5-cc6ac4244b8a.png">
As one can observe the ViT-H outperforms every other model on all tasks. 

# **Conclusion**- 

The main advantage of using transformers in image recognition tasks is that it doesnt include any image specific inductive bias since self attnetion heads work on global features, only MLPs and initial positional embeddings introduce a small bias in the transformers. Transformers are also computationally efficient and uses less computational resources. Still lots of other challenges remain like implementing vision transformers to image segmentation or detection.

# **Additional Links** - 

- [Vision Transfomers](https://arxiv.org/pdf/2010.11929v2.pdf)
- [Attention is all you need](https://arxiv.org/pdf/1706.03762.pdf)
- [BERT Illustration](https://jalammar.github.io/illustrated-bert/)
- [Illustrated Transformers](https://jalammar.github.io/illustrated-transformer/)




