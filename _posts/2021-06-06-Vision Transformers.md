# **Introduction** -
Transformers in the latest natural language processing research has become a defacto for the models to perform best. Its application though, in Computer Vision is yet not used widely. Till now few efforts were taken to replace certain parts of CNN network using self attention but basic building structure of the CNN architecture remained intact. However the Vision Transformers are now set to revolutionize this vision field. The Vision Transformer paper explains that this reliance on CNN is no more needed and transformers when applied on patches of images can outperform traditional CNN architectures. When trained on substantially large data and fine tuned on smaller data or transferred onto mide or small sized datasets like CIFAR-100, Imagenet gives excellent results as compared to traditional CNN state of the art architectures with fewer computational resources needed to train. This blog will be referring [Vision Transformer](https://arxiv.org/pdf/2010.11929v2.pdf) paper. Inspired from the NLP transformers standard transformers were directly applied to images. To do so images are converted in small patches and linear embeddings of these patches are fed to the transformers. Patches are treated the same way as the tokens are treated in NLP applications. When trained on mid sized datasets like Imagenet transformers gave modest accuracy just below the RESNETs of comparable size. But transformers lacked few of the inductive biases inherent to CNNs, such as translation equivariance and locality, and therefore do not generalize well when trained on insufficient amounts of data. However when transformers are trained on large data it outperforms most of the SOTA algorithms.


# **Vision Transformer Architecture Overview** - 

<img width="913" alt="VisionTransformer" src="https://user-images.githubusercontent.com/46114095/121113343-85e00000-c82f-11eb-800f-654a4f667c56.png">
The above image can be summarized in following steps - 
- Splitting the image in fixed sized patches.

- Linearly Embedding each of the patches.

- Adding the positional embedding.

- Feeding the resulting sequence o vector to the transformer encoder.

- Adding the extra learnable "classification token" to the sequence.


# **Mathematical Explaination** - 
NLP transformers recieves the 1D sequence of token embeddings. To handle the 2D images, the images of  x ∈ R^(H×W×C) are reshaped into a sequence of a flattened 2D patches xp ∈ R^(N×((P^2)*C)), where (H,W) is the resolution of the image, C is the number of channels, (P,P) is the resolution of each image patch. N is the number of patches.

Similar to BERT a learnable embedding token is added before the sequence of embedded patches whose output will be used to represent the image. Adding a 2D aware positional embedding(11,12,13,14,21,22,23,24,31,....,44) didnt imrpove the performance so author tried to use the 1D positional embedding only for the images(for eg. 1,2,3,...,16)

A typical structure of transformer encoder has alternating layers of self attention and MLP blocks and a layernorm is applied before each of these two blocks and a residual connection after each block.
<img width="933" alt="Screenshot 2021-06-09 at 10 38 48 AM" src="https://user-images.githubusercontent.com/46114095/121296849-f447bf80-c90e-11eb-814c-44a63c564b5e.png">

- In Eq(1), **xclass** represents the learnable embedding prepended just like in the case of BERT model. All other **xp_i** s represent the patches of the image where i indicates the 1D positional embedding. **E** is patch embedding projection so if we consider a patch size as 1 then it can be simply thought as flattened representation of the whole 2D image. **Epos** is the embedding with the shape of (N+1)*D where **N** is the number of pathces and **D** is the flattened map dimention of the patch(N for number of patches and one for the prepended xclass).
- **Zl'** is output of Multiheaded Self-Attention is an addition of linear normalization output of the input and the input itself. 
- **Zl** is the output of the MLP is an addition of linear normalization of Multiheaded self-attention and Multiheaded self-attention output itself. 
- **y** is the linear normalized output of **Zl_0**.


<img width="831" alt="Screenshot 2021-06-09 at 6 36 05 PM" src="https://user-images.githubusercontent.com/46114095/121359927-98eaf100-c951-11eb-9ed9-500d1a1b528b.png">


# **Advantage of Transformers** - 
**Inductive Bias.** Vision transformers has much less inductive bias than the CNNs. This must be because traditional CNNs looks at the local features one by one and somehow tries to generalize it. This leads to translational equivariance is baked into each layer throughout the whole model. but in case of Vision Transformers only MLP are translationally equivariant while the self-attention is global. Two dimentional neighbourhood is not used. Positional embeddings at the initialization time carry no information about the 2D positions of the patches and all the spatial relations have to be laerned from scratch.

**Hybrid Arhcitecture.** In alternative to raw image a patch, input sequence can be formed from feature maps usign CNNs. In this hybrid model patch embedding projection **E** (Eq.1) is applie dto the patches extracted from CNN maps. If the patch size is kept as 1x1 then it can simply be a flattened projection.

# **Fine Tuning and Higher resolution** - 
Typically transformers are pre trained on a large dataset and fine tuned to downstream tasks. So in this normally a pretrained prediction head is removed and a zero intialized feed forward layers of size D*K are attached in place of pretrained prediction head. D is the output shape of the previous transformer Where k is the number of output classes. It is observed that it is better to fine tune at higher resolution than pretraining. When the images of higher resolution are fed and the patch size is kept same, it will result in large receptive sequence length. Transformer can process any sequence lengths however the pre-trained positional embedding will make no sense now. So to deal with this 2D interpolation(For each pixel approximate the nearest value) is used of the positional embeddings according to their location in the original image. Resolution adjustment and patch extraction are the only two points where the inductive bias about the images are manually injected into Vision Transformers.

# **Experiments Done**-
**Datasets.** For testing the model scalability model was trained on ILSVRC-2012 ,ImageNet-21k and JFT and then tested on CIFAR-10/100, Oxford-IIIT Pets, Oxford Flowers-102
<img width="937" alt="Screenshot 2021-06-09 at 4 30 18 PM" src="https://user-images.githubusercontent.com/46114095/121343234-16a60100-c940-11eb-954d-df1a754a7f99.png">
ViT-base and ViT-large are based on the BERT model architectures only. The larger ViT huge model is added ahead.

**Training & Fine-tuning.**  For the baseline CNNs Resnets are used but BatchNormalization are replaced by [GroupNomalization](https://towardsdatascience.com/what-is-group-normalization-45fe27307be7).For training optimizer used was Adam with a β1 = 0.9, β2 = 0.999. a batch size of 4096 and apply a high weight decay of 0.1.
For fine-tuning we use SGD with momentum,batch size 512. **Metrics** used for the downstream datsets is nothing but accuracy. Few shot accuracies are obtained by usign regularized least squared regression problem that maps subset of training images to {-1,1}^k target variables.

# **Results** -
<img width="923" alt="Screenshot 2021-06-09 at 4 58 05 PM" src="https://user-images.githubusercontent.com/46114095/121346685-098b1100-c944-11eb-89aa-8f534c9805b9.png">
A common observation can be made that vision tranformer is outperforming the Resnet based baselines on all datasets and also taking less computational resources to pre-train.

Another experiment was done based on the type of datasets available. The model was trained on three types of datasets Natural( Pets, CIFAR, etc.), Specialized(medical and satellite imagery) and Structured(tasks that require geometric understanding like localization). The results look like 
<img width="919" alt="Screenshot 2021-06-09 at 5 09 07 PM" src="https://user-images.githubusercontent.com/46114095/121347988-6fc46380-c945-11eb-9cf5-cc6ac4244b8a.png">
As one can observe the ViT-H outperforms every other model on all tasks. 

# **Conclusion**- 
The main advantage of using transformers in image recognition tasks is that it doesnt include any image specific inductive bias since self attnetion heads work on global features, only MLPs and initial positional embeddings introduce a small bias in the transformers. Transformers are also computationally efficient and uses less computational resources. Still lots of other challenges remain like implementing vision transformers to image segmentation or detection.

