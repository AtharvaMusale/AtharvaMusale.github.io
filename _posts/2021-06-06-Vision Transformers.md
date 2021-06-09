
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
- NLP transformers recieves the 1D sequence of token embeddings. To handle the 2D images, the images of  x ∈ R^(H×W×C) are reshaped into a sequence of a flattened 2D patches xp ∈ R^(N×((P^2)*C)), where (H,W) is the resolution of the image, C is the number of channels, (P,P) is the resolution of each image patch. N is the number of patches.
- Similar to BERT a learnable embedding token is added before the sequence of embedded patches whose output will be used to represent the image. Adding a 2D aware positional embedding(11,12,13,14,21,22,23,24,31,....,44) didnt imrpove the performance so author tried to use the 1D positionla embedding only for the images(for eg. 1,2,3,...,16)
- A typical structure of transformer encoder has alternating layers of self attention and MLP blocks and a layernorm is applied before each of these two blocks and a residual connection after each block.
