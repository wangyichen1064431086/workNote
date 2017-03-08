## 1. itemscope itemtype itemprop
<https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/itemscope>

用于使得机器识别微数据。

Eg:

	<div itemscope itemtype ="http://schema.org/Movie">
	  <h1 itemprop="name">Avatar</h1>
	  <span>Director: <span itemprop="director">James Cameron</span> (born August 16, 1954)</span>
	  <span itemprop="genre">Science fiction</span>
	  <a href="https://youtu.be/0AY1XIkX7bY" itemprop="trailer">Trailer</a>
	</div>