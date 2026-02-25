<script setup lang="ts">
import type {
  PointSeries,
  FunctionSeries,
  TheRange,
} from '@/types/d3';
import type {Heading} from '@/types/nav';

import PostLayout from '@/components/PostLayout.vue';
import MathDisplay from '@/components/MathDisplay.vue';
import MathInline from '@/components/MathInline.vue';
import D3Graph from '@/components/D3Graph.vue';

import {ref} from 'vue';

const headings:Heading[]=[
  {title:'Introduction',id:'introduction'},
  {title:'Problem',id:'problem'},
  {title:'What criteria should we choose',id:'criteria'},
  {title:'How to compute the best-fitting line',id:'compute'},
  {title:'Infinitely many solutions',id:'infinitely-many-solutions'},
  {title:'Why square and not take the power of 4?',id:'why-square'},
  {title:'Linear regression and Linear Algebra',id:'linear-algebra'},
];

const func=ref<FunctionSeries>({
  func:(x:number)=>10*x,
  samples:2,
  domain:[100,500],
});

const points=ref<PointSeries>({
  data:[
    {x:100,y:1000},
    {x:200,y:2000},
    {x:300,y:3000},
    {x:400,y:4000},
    {x:500,y:5000},
  ],
  color:'#1f77b4',
});

const domain=ref<TheRange>([100,500,50]);
const range=ref<TheRange>([1000,5000,1000]);
</script>

<template>
  <PostLayout :headings="headings">
    <h1>Linear Regression</h1>
    <section id="introduction">
      <h2>Introduction</h2>
      <p>
        In many scientific problems, we are given a collection of data points that states the relationship between
        two variables.
      </p>
      <p>
        For instance, suppose you are given the following dataset that relates the size and the price of a house.
      </p>
      <table>
        <tr>
          <td>Size</td>
          <td>100</td>
          <td>200</td>
          <td>300</td>
        </tr>
        <tr>
          <td>Price</td>
          <td>$1000</td>
          <td>$2000</td>
          <td>$3000</td>
        </tr>
      </table>
      <p>
        This describes a linear relationship: the price of a house is proportional to its size. We can graph this relationship.
      </p>
      <D3Graph
        :points="points"
        :domain="domain"
        :range="range"
      />
      <p>
        What if we have a house of a size not listed on the data. For instance, what would be the price of a house of size 150?
        We want to estimate its price in a way that it is coherent our data. We see our data is linear, so we expect the price to
        increase as we the size increases.
      </p>
      <p>
        What we need is a model that describes our data and provides good estimations for data unknown to us, like the price
        of a house of size 150 or 320, after all, we can't collect info for every possible size of house. That is the topic
        we will be exploring in this article - <strong>Linear Regression</strong>
      </p>
      <p>
        Since our relationship is linear, the best model is certainly a line that passes through all the points.
      </p>
      <D3Graph
        :points="points"
        :domain="domain"
        :range="range"
      />
      <p>
        Although the data for the price of a house of size 150 is not on the table, we can estimate it to be $1500.
      </p>
    </section>
    <section id="problem">
      <h2>Problem</h2>
      <p>
        Usually data doesn't show up proportional as our previous example. The data usually looks "messy".
      </p>
      <D3Graph
        :points="points"
        :domain="domain"
        :range="range"
      />
      <p>
        There is no line capable of passing through all the points.
        Does that mean we are not able to predict values not analyzed?
      </p>
      <p>
        Let's view our problem more carefully. If you were to give a fair price to a house of size 150, what would it be?
      </p>
      <p>
        If you happen to guess a value between $1000 and $1600, you are right. Why? We expect the value to increases as we go from left to right (the size increases), since the price of a house of size 100 is $1000, we expect the price of a house of size 150 to be higher. Similarly for a house of size 200, we expect the price to be lower than $1600.
      </p>
      <p>
        That makes us think that although the estimation is not straightforward as the previous example when the points were collinear and the relationship was linear, there is some rule ruling our data, we just don't know it precisely.
      </p>
      <p>
        One super important thing to state: What we are doing are estimations, it is possible for a house of size 150 to have a
        lower price than a house of size 100, what we are trying to do is trying to find a pattern for our data and with that
        estimate prices of any house. It can happen, but the points on the graph point out that the prices tend to increase as the 
        house gets bigger.
      </p>
      <p>
        We can apply this logic to all sizes between 100 and 200 and conclude that any line that follow our conclusion is good, or is it?
      </p>
      <p>
        Consider the following two lines.
      </p>
      <div data-split>
        <D3Graph
          :points="points"
          :domain="domain"
          :range="range"
        />
        <D3Graph
          :points="points"
          :domain="domain"
          :range="range"
        />
      </div>
      <p>
        The line from the first graph is much better than the line of the second graph. Although both attend what we state
        reviously about the prices between 100 and 200, for values large than that, the line from the second graph doesn't follow
        the implicit increasing rule. We need to look globally.
      </p>
      <p>
        The second graph take into account only the values between 100 and 200, whereas the first graph does that and also take into
        account the remaining points.
      </p>
      <p>
        We can conclude there are certain lines that are certainly better than others and thus far we are judging them intuitively
      </p>
      <p>
        Let's compare two more lines
      </p>
      <div data-split>
        <D3Graph
          :points="points"
          :domain="domain"
          :range="range"
        />
        <D3Graph
          :points="points"
          :domain="domain"
          :range="range"
        />
      </div>
      <p>
        Which line is the best and why?
      </p>
      <p>
        It's hard to tell. That leads us to define what criteria we should use to compare lines and find
        the best one.
      </p>
    </section>
    <section id="criteria">
      <h2>What criteria should we choose?</h2>
      <p>
        Imagine you are playing a bow and arrow game. It's a two-player game, you both need to hit the target in the center.
        Both of you shoot, but miss the center, how can you decide which one won? Well, the one closest to the center won, right?
        Mathematically speaking, the one with the smallest distance from the center, won.
      </p>
      <p>
        We can apply this logic to our model. The best line is the one that minimizes a distance. For each data point, we can
        subtract its value from the value predicted by the line. Sum them all up, and the one that gives the smallest value is
        considered the best.
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
    </section>
    <section id="compute">
      <h2>How to compute the best-fitting line?</h2>
      <p>
        Now that we understand the general characteristic of a best-fitting line, we are going to learn how to compute them.
      </p>
      <p>
        We want to minimize the following expression:
      </p>
      <MathDisplay f="\text{SSE}=\sum_{i=1}^n(y_i-(ax_i+b))^2"/>
      <p>
        So our problems narrows down to optimization. The expression is a nice differentiable function.
        We can take the partial derivatives with respect to each parameter and equating them to zero.
      </p>
      <MathDisplay f="\frac{\partial\text{SSE}}{\partial a}=-2\sum_{i=1}^n{x_i(y_i-ax_i-b)}" />
      <MathDisplay f="\frac{\partial\text{SSE}}{\partial b}=-2\sum_{i=1}^n{x_i(y_i-ax_i-b)}" />
      <p>
        Now we have a linear system with exactly one solution. Solving it gives us the slope and the y-intercept of
        the best-fitting line.
      </p>
      <p>
        Let's set the partial derivative with respect to b to zero and solve for b.
      </p>
      <MathDisplay f="
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
      <MathDisplay f="
\begin{align*}
-2\sum{x_i(y_i-ax_i-b)}&=0\\
\sum{x_iy_i}-a\sum{x_i^2}-b\sum{x_i}&=0\\
\end{align*}
      "/>
      <p>
        Substitute <MathInline f="b"/> into the quation
      </p>
      <p>
        Remember also that
      </p>
      <MathDisplay f="
\sum{x_i}=n\bar{x}
      "/>
      <MathDisplay f="
\begin{align*}
\sum{x_iy_i}-a\sum{x_i^2}-b\sum{x_i}&=0\\
\end{align*}
      "/>
    </section>
    <section id="infinitely-many-solutions">
      <h2>Infinitely many solutions</h2>
      <p>
        It can happen that we have infinitely many lines in OLS. This occurs when the points have all the same x-values.
      </p>
    </section>
    <section id="why-square">
      <h2>Why square and not take the power of 4?</h2>
    </section>
    <section id="linear-algebra">
      <h2>Linear Regression is deeply connected to Least Squares</h2>
      <p>
        ...
      </p>
    </section>
  </PostLayout>
</template>
