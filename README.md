Custom solution for lazy loading images in javascript (Without frameworks);


<h1>Instructions for Use:</h1>
<ul>
  <li>For each image, you need to have both a 'compressed' and an 'original' src. (Compressed should be smaller (up to 30kb))</li>
  <li>At the beginning, each image should have 'compressed' for the src attribute and 'original' for the 'data-original-src' attribute, in full quality. (They will be replaced later)</li>
  <li>The image should have 'data-lazy="true"' if you want it to have lazy loading functionality</li>
</ul>
<p style="margin="30px 0"">--------------------------------------------------</p>
<b>This code implements functionality to display a loader over an image if the user has a slow internet connection (after 0.3s, if the image hasn't loaded). </br> You can customize the loader to your preference and also edit a variable value to determine when the user's internet is slow</b>

<h2>That's it! Enjoy the excellent performance of your website!</h2>
