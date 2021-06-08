# Deep Dive in Vision Transformers - 
<img width="913" alt="VisionTransformer" src="https://user-images.githubusercontent.com/46114095/121113343-85e00000-c82f-11eb-800f-654a4f667c56.png">

Transformers in the latest research area in NLP has become a defacto for the models to perform best. Its application though in Computer Vision is yet not used widely. Till now few efforts were taken to replace certain parts of CNN network using self attention but basic  building structure of the CNN architecture remained intact. However the Vision Transformers are now set to revolutionize this vision field. The Vision Transformer paper explains that this reliance on CNN is no more needed and transformers when applied on patches of images can outperform traditional CNN architectures. When trained on substantially large data and fin tuned on smaller data or transferred onto mide or small sized datasets like CIFAR-100, Imagenet gives excellent results as compared to traditional CNN state of the art architectures with fewer computational resources need to train. This blog will be referring [Vision Transformer](https://arxiv.org/pdf/2010.11929v2.pdf) paper.


