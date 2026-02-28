<script setup lang="ts">
const {
  tags,
  normalPoints,
  messyPoints,
  a,
  b,
}=useLinearRegressionPost();

definePageMeta({
  layout:'article',
  slug:'linear-regression',
  tags,
});
</script>

<template>
  <ArticleSection title="Introduction" id="introduction">
    <p>
      Consider the following dataset collected in a research. It relates the size and the price of a house.
    </p>
    <ArticleMathDatasetTable :dataset="normalPoints"/>
    <p>
      This happens to describe a linear relationship: the price of a house is proportional to its size.
      We can graph this relationship.
    </p>
     <ArticleMathTheDesmos
      data-graph
      :pointSeries="[normalPoints]"
      draggable
      :domain="[100,500]"
      :range="[1000,5000]"
    />
    <p>
      Now it raises a question. What if we have a house of a size not listed on the data. For instance, what would be the
      price of a house of size 600? We want to estimate its price in a way that it is coherent with our data.
    </p>
    <p>
      Although this data point doesn't show up on the collected data, we can still estimate its price by looking
      at the tendency of the graph.
    </p>
    <p>
      The relationship is perfectly linear, so we expect the prices to rise as the size increases. For every 100m<sup>2</sup>
      the price increaess by $1000. Therefore, we can estimate the price of a house of size 600m<sup>2</sup> to be $6000
    </p>
    <ArticleMathTheDesmos
      data-graph
      :pointSeries="[normalPoints.concat({x:600,y:6000})]"
      :domain="[100,600]"
      :range="[1000,6000]"
    />
    <p>
      It seems to be a pretty reasonable price.
    </p>
    <p>
      That is the core idea of <strong>Linear Regression</strong>. We don't have all the points, but we can still
      predict its value by looking at a pattern of the current data we have.
    </p>
    <p>
      In general, we need a model that describes any data point that hasn't been collected.
      In our particular case, since our relationship is perfectly linear, our model is a linear function that
      maps a size onto a price. Therefore, we need a line that passes through all the points.
    </p>
    <ArticleMathTheDesmos
      data-graph
      :pointSeries="[normalPoints]"
      :domain="[100,500]"
      :range="[1000,5000]"
    />
  </ArticleSection>
  <hr>
  <ArticleSection title="Problem" id="problem">
    <p>
      In real-life cases, the data usually doesn't show up as predictable as the previous example.
      The data usually looks "messy"; it doesn't show any apparent pattern and appears to be random.
    </p>
    <p>
      Let's take the same context as the previous example but be a little bit more realistic.
    </p>
    <ArticleMathDatasetTable data-table :dataset="messyPoints"/>
    <ArticleMathTheDesmos
      data-graph
      :pointSeries="[normalPoints]"
      :domain="[100,500]"
      :range="[1000,5000]"
    />
    <p>
      The relationship between size and price is not linear. It is impossible to find a line which is
      able to go through all the points. Try it!
    </p>
    <ArticleMathTheDesmos
      data-graph
      :functions="[
        {
          func:x=>a*x+b,
          domain:[100,500],
          samples:100,
        }
      ]"
      :pointSeries="[normalPoints]"
      :domain="[100,500]"
      :range="[1000,5000]"
    />
    <div class="input">
      <ArticleMathVariableInput
        label="a"
        v-model="a"
        :min="0"
        :max="100"
      />
      <ArticleMathVariableInput
        label="b"
        v-model="b"
        :min="0"
        :max="1000"
      />
    </div>
    <p>
      How can we tackle this nonlinearity problem?
      Let's view our problem more carefully.
    </p>
    <p>
      If you were to give a fair price to a house of size 150, what would it be?
    </p>
    <p>
      If you happen to guess a value between $1000 and $1500, you are right. Why? We expect the value to increases
      as the size increase.
    </p>
    <p>
      Since the price of a house of size 100 is $1000, we expect the price of a house of size 150 to be higher.
    </p>
    <p>
      Since the price of a house of size 200 is $1500, we expect the price to be lower than $1500.
    </p>
    <p>
      Although the estimation is not straightforward as the previous example when the points were collinear and
      the relationship was linear, it makes us think that there is some rule ruling our data,
      we just don't know it precisely.
    </p>
    <ArticleWarningBox>
      <p>
        One super important thing to state: What we are doing are estimations.
      </p>
      <p>
        It is possible for a house of size 150 to have a lower price than a house of size 100. What we are trying to
        do is finding a pattern for our data and with that estimate prices of any house.
      </p>
    </ArticleWarningBox>
    <p>
      We are able to estimate values using our intuition by looking at the general tendency of the data.
    </p>
    <p>
      Now rises another problem. Consider two models for the same data.
    </p>
    <div data-split>
      <ArticleMathTheDesmos
        data-graph
        :pointSeries="[normalPoints]"
        :draggable="false"
        :domain="[100,500]"
        :range="[1000,5000]"
      />
      <ArticleMathTheDesmos
        data-graph
        :pointSeries="[normalPoints]"
        :draggable="false"
        :domain="[100,500]"
        :range="[1000,5000]"
      />
    </div>
    <p>
      Which model better describes the data and why?
    </p>
    <p>
      It's hard to tell. Thus far we were able to assess the quality of a model using our intuition, and when asked to
      compare models, the models were very different. However, we know that intuition and images can be misleading.
    </p>
    <p>
      When two models are very similar, it becomes hard to distinguish which one is superior.
      That leads us to define a criterion to help us compare models and define what is the best line.
    </p>
  </ArticleSection>
  <hr>
  <ArticleSection title="What criterion should we choose?" id="criteria">
    <p>
      For very similar lines, how can we be sure a model is superior to the other? To help us define a systematic way, consider
      the following analogy.
    </p>
    <p>
      Imagine you are playing a bow-and-arrow game. It's a two-player game. You and your opponent need to hit the
      center of a target.
    </p>
    <p>
      Both of you take a shot, but miss the center. How can you determine the winner? Naturally, we define the winner as
      the player whose arrow lands closest to the center. In other words, the player whose arrow has the smallest distance
      from the center is the winner.
    </p>
    <p>
      We can apply this same logic to our problem of determining which lines is better. The best line is the one that
      minimizes some measurement. What could be this measurement we are trying to minimize?
    </p>
    <p>
      Naturally, for each data point, we can subtract its value from the value predicted by the line. Then we sum up
      the differences, and the model which gives the smallest value is the best.
    </p>
    <p>
      The problem with this approach is that the error sum might be negative and there are infinitely many value.
    </p> 
    <p>
      You might be thinking, then the best one should be the one with error zero. That does make sense, but that allows
      infinitely many lines and even nonsense lines like those
    </p>
    <p>
      There are two ways to fix this. We could square the difference or we could take the absolute value of the difference.
    </p>
    <p>
      Both are acceptable and may give different lines. The square penalizes big errors, whereas the absolute value variant
      weights everything the same. We will stick with the square because it the most popoular, usually the first people learn
      and also very easy to compute --- it is called Ordinary Least Squares. The absolute variant is called Least Absolute
      Deviation.
    </p>
  </ArticleSection>
  <hr>
  <ArticleSection title="How to compute the best-fitting line?" id="compute">
    <p>
      Now that we understand the general characteristic of a best-fitting line, we are going to learn how to compute them.
    </p>
    <p>
      We want to minimize the following expression:
    </p>
    <ArticleMathDisplay formula="\text{SSE}=\sum_{i=1}^n(y_i-(ax_i+b))^2"/>
    <p>
      So our problems narrows down to optimization. The expression is a nice differentiable function.
      We can take the partial derivatives with respect to each parameter and equating them to zero.
    </p>
    <ArticleMathDisplay formula="\frac{\partial\text{SSE}}{\partial a}=-2\sum_{i=1}^n{x_i(y_i-ax_i-b)}" />
    <ArticleMathDisplay formula="\frac{\partial\text{SSE}}{\partial b}=-2\sum_{i=1}^n{x_i(y_i-ax_i-b)}" />
    <p>
      Now we have a linear system with exactly one solution. Solving it gives us the slope and the y-intercept of
      the best-fitting line.
    </p>
    <p>
      Let's set the partial derivative with respect to b to zero and solve for b.
    </p>
    <ArticleMathDisplay formula="
  \begin{align*}
  -2\sum(y_i-ax_i-b)&=0\\
  \sum{y_i}-\sum{ax_i}-\sum{b}&=0\\
  \sum{y_i}-a\sum{x_i}-nb&=0\\
  b&=\frac{\sum{y_i}-a\sum{x_i}}{n}\\
  &=\bar{y}-a\bar{x}
  \end{align*}
    "/>
    <p>
      Let's set the other partial derivative to zero and simplify.
    </p>
    <ArticleMathDisplay formula="
  \begin{align*}
  -2\sum{x_i(y_i-ax_i-b)}&=0\\
  \sum{x_iy_i}-a\sum{x_i^2}-b\sum{x_i}&=0\\
  \end{align*}
    "/>
    <p>
      Substitute <ArticleMathInline formula="b"/> into the quation
    </p>
    <p>
      Remember also that
    </p>
    <ArticleMathDisplay formula="
  \sum{x_i}=n\bar{x}
    "/>
    <ArticleMathDisplay formula="
  \begin{align*}
  \sum{x_iy_i}-a\sum{x_i^2}-b\sum{x_i}&=0\\
  \end{align*}
    "/>
  </ArticleSection>
  <hr>
  <ArticleSection title="Infinitely many solutions" id="infinitely-many-solutions">
    <p>
      It can happen that we have infinitely many lines in OLS. This occurs when the points have all the same x-values.
    </p>
  </ArticleSection>
  <hr>
  <ArticleSection title="Why square and not take the power of 4?" id="why-square">
  </ArticleSection>
  <hr>
  <ArticleSection title="Linear Regression is deeply connected to Least Squares" id="linear-algebra">
    <p>
      ...
    </p>
  </ArticleSection>
</template>
