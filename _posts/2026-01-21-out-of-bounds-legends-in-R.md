---
title: 'Plotting Out of Bounds Values with R'
subtitle: 'Replicating what `matplotlib` can do natively'
date: 2026-01-21
permalink: /posts/2026-01-21-out-of-bounds-legends-in-R/
author_profile: false
tags:
  - data-visualization
  - science-communication
---

I've been working on some larger, longer blog posts for... well, for too long. Maybe I bit off more than I could chew, but I hope to push one of them out before too long. 

Stay tuned for those, but in the meantime I've decided to start putting out some more bite-sized posts, and what I was working on today felt like it could be quite useful to others. So, let's jump in!

<h2>Visualizing out-of-bounds (OOB) data using R</h2>
Let's say you want to plot some data, and let's say that data has a relatively "long-tailed" distribution. This need not even necessarily be non-normally distributed data, but often this is also the case. There are many ways to visualize this kind of data and, obviously, the best ways will often depend upon the context. But instead of talking circles around this, let me provide an example. 

Let's look at some streamflow data. Without getting into details (because they are irrelevant to the substance of this post), I've extracted the largest observed streamflow values between 1981 and 2020 for 494 streams and rivers across the continuous US. Here's what the distribution of these values looks like:

![OOB Histogram](../../images/oob_histogram.png)

<small>Histogram of largest streamflow values between 1981 and 2020 at 494 USGS gages [original content].</small>

Quick aside: as I'm using this data illustrate a visualization method, I'm intentionally not normalizing streamflow by watershed area, which would of course reduce the skewness of the distribution considerably. Moving on...

We can see that these data roughly resemble some kind of heavily right-skewed distribution. Now, let's say we're interested in mapping these data. We can do this quite easily in R:

<pre style="font-size: 0.6em;">
library(tidyverse)
library(terra)
library(tidyterra)
library(colorspace)

us_states <- vect(rnaturalearth::ne_states(country = "United States of America", returnclass = "sf")) %>%
  project("EPSG:5070") %>%
  dplyr::select(postal) %>%
  dplyr::rename("state" = "postal")

ggplot() +
    geom_spatvector(data = us_states %>% 
        dplyr::filter(!(state %in% c("AK", "HI"))),
        alpha = 1, linewidth = 0.5, fill = "white") +
    geom_spatvector(data = data, 
        aes(color = largest_observation),
        linewidth = 0.01,
        size = 1) +
    scale_color_continuous_sequential(
        name = "Peak Q (m^3/s)", 
        palette = "Viridis", 
        rev = T,
        limits = c(0, NA)
    ) +
    theme_void() +
    theme(
        legend.key.height = unit(0.4, "in"),
        legend.key.width  = unit(0.2,  "in")
    )
</pre>

![OOB Map Complete](../../images/oob_map_complete.png)

What might immediately jump out to you from this map is that our skewed distribution leads to a large number of values showing up in yellow (the bottom of our color space), and progressively fewer showing up in green, blue or purple. What this effectively does is cluster the majority of values in a narrow band of our color space, which makes it difficult to differentiate between our yellow stations.

The ideal case when we're visualizing data like this is that our data points are uniformly distributed across our color scale, which generally leads the most interpretable possible visual. Now, since our data are never so perfect as this, we often have to deal with this type thing. There are many ways we could deal with this issue, including transforming the distribution of the data or using a more complex color space, and in some situations these are fine. However, there are many situations where I would deliberately avoid using some of these strategies, as they can lead to less interpretable plots. For the sake of keeping this post "bite-sized", you'll just have to take my word on this point.

In this case, let's say we're more interested in allowing someone to distinguish between the values for the bulk of our data. Looking at our histogram, that represents values between about 0 and 1000 m^3/s. The simplest way to do this is to clip our data, which effectively (for visualization purposes) sets all values above our clipping threshold to the highest value represented in our color space. We'll use `oob = scales::squish` to make sure that our clipped values don't simply show up as grey. 

<pre style="font-size: 0.6em;">
ggplot() +
    geom_spatvector(data = us_states %>% 
        dplyr::filter(!(state %in% c("AK", "HI"))),
        alpha = 1, linewidth = 0.5, fill = "white") +
    geom_spatvector(data = data, 
        aes(color = largest_observation),
        linewidth = 0.01,
        size = 1) +
    scale_color_continuous_sequential(
        name = "Peak Q (m^3/s)", 
        palette = "Viridis", 
        rev = T,
        limits = c(0, 1000),
        oob = scales::squish
    ) +
    theme_void() +
    theme(
        legend.key.height = unit(0.4, "in"),
        legend.key.width  = unit(0.2,  "in")
    )
</pre>

![OOB Map Clipped](../../images/oob_map_clipped.png)

This is clearly much improved, even if it isn't perfect. One thing you'll notice, though, is that all of our clipped values (anything over 1,000 m^3/s) show up as dark purple, the end of of color space, offering us no way of differenting values that are around that limit and those that far exceed it (for the record, the largest value in our dataset is 4,842 m^3/s). This is misleading, and we'll want to do something about it. 

There's this neat thing that Python's `matplotlib` can do (with relative ease) when you clip your plot's data. Using the `extend` argument in `plt.colorbar`, you can add arrows to either end of your colorbar to indicate that some values are shown that exceed the range of the scale. This would solve our problem quite elegantly, allowing us to increase the interpretability of our plot while avoiding potential misinterpretation of outlier values. But, sadly, this is not a feature of `ggplot2` :-(

Yes, we could switch to Python. But here's the hard truth: I simply do not like matplotlib. I do not like it in the rain. I would not, could not, on a train. I will not use it here or there. I do not like it anywhere! 

I know I could make equivalent plots using `matplotlib`, but I simply prefer the syntax of `ggplot2`, so it's remained my default for visualizations. So, I wanted to find a way to do this in R. Luckily, it's quite easy. Enter the `legendry` package, using `show = NA` to automagically add arrows only when necessary.

<pre style="font-size: 0.6em;">
ggplot() +
    geom_spatvector(data = us_states %>% 
        dplyr::filter(!(state %in% c("AK", "HI"))),
        alpha = 1, linewidth = 0.5, fill = "white") +
    geom_spatvector(data = data, 
        aes(color = largest_observation),
        linewidth = 0.01,
        size = 1) +
    scale_color_continuous_sequential(
        name = "Peak Q (m^3/s)", 
        palette = "Viridis", 
        rev = T,
        limits = c(0, 1000),
        oob = scales::squish,
        guide  = legendry::guide_colbar(
          shape = "triangle",
          show  = NA,
          oob   = "squish",
          theme = theme(
            legend.key.height = unit(2, "in"),
            legend.key.width  = unit(0.2,  "in")
            )
          )
    ) +
    theme_void()
</pre>

![OOB Map Clipped with Arrows](../../images/oob_map_clipped_with_arrow.png)

Voila! Now you can make this type of legend using R. You're welcome. 