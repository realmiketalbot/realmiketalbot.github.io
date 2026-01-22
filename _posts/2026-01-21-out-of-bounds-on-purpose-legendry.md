---
title: 'Out of Bounds, On Purpose'
subtitle: 'Replicating `matplotlib`’s extended colorbars in R with `legendry`'
date: 2026-01-21
permalink: /posts/2026-01-21-out-of-bounds-on-purpose-legendry/
author_profile: false
tags:
  - data-visualization
  - science-communication
---

I've been working on some larger, longer blog posts for... well, for too long. Maybe I bit off more than I could chew, but I hope to push one of them out before too long. 

Stay tuned for those, but in the meantime I've decided to start putting out some more bite-sized posts, and what I was working on today felt like it could be quite useful to others. So, let's jump in!

<h2>Visualizing out-of-bounds (OOB) data using R</h2>
Let's say you want to plot some data, and let's say that data has a relatively "long-tailed" distribution. This need not even necessarily be non-normally distributed data, but often this is also the case. There are many ways to visualize this kind of data and, obviously, the best ways will often depend upon the context. But instead of talking circles around this, let me provide an example.

Let's look at some streamflow data. Without getting into details (because they are irrelevant to the substance of this post), I've extracted the largest observed streamflow values between 1981 and 2020 for 494 streams and rivers across the contiguous US.[^1] Here's what the distribution of these values looks like:

![OOB Histogram](../../images/oob_histogram.png)

<small>Histogram of largest streamflow values between 1981 and 2020 at 494 USGS gages [original content].</small>

We can see that these data roughly resemble some kind of heavily right-skewed distribution.[^2] Now, let's say we're interested in mapping these data. We can do this quite easily using R:

<pre style="font-size: 0.6em;">
library(tidyverse)
library(terra)
library(tidyterra)
library(colorspace)

us_states <- vect(rnaturalearth::ne_states(country = "United States of America", returnclass = "sf")) %>%
    project("EPSG:5070") %>%
    dplyr::select(postal) %>%
    dplyr::rename("state" = "postal") %>% 
    dplyr::filter(!(state %in% c("AK", "HI")))

ggplot() +
    geom_spatvector(data = us_states,
        alpha = 1, 
        linewidth = 0.5, 
        fill = "white") +
    geom_spatvector(data = data, 
        aes(color = largest_observation),
        linewidth = 0.01,
        size = 1) +
    scale_color_continuous_sequential(
        name = "Peak Q (m^3/s)", 
        palette = "Viridis", 
        rev = TRUE,
        limits = c(0, NA)
    ) +
    theme_void() +
    theme(
        legend.key.height = grid::unit(0.4, "in"),
        legend.key.width  = grid::unit(0.2,  "in")
    )
</pre>

![OOB Map Complete](../../images/oob_map_complete.png)

What might immediately jump out to you from this map is that our skewed distribution leads to a large number of values showing up in yellow (the bottom of our color scale), and progressively fewer showing up in green, blue, or purple. What this effectively does is cluster the majority of values in a narrow band of our color scale, which makes it difficult to differentiate among the stations clustered at the low end.

A common goal is to use the color scale efficiently so that the bulk of observations spans more of the available range, which improves visual discrimination among most stations. In practice, real datasets rarely fill a color scale evenly, so this is a common issue.

I should note here that there are many different ways we could deal with this issue, including transforming the distribution of the data or using a more complex color mapping, and in some situations these are fine. However, I often avoid these strategies because they can reduce interpretability—especially on maps, where I prefer legends in the original units and a linear scale so equal numeric differences remain visually comparable. For this example, let’s prioritize distinguishing among the bulk of the data rather than among the largest values—in other words, we mainly need to know that “large values are large.” Looking back at our histogram, the bulk of our values appear to lie between about 0 and 1000 m^3/s. 

An obvious solution here is to cap the color scale so the bulk of values use more of the available range, improving visual discrimination where most observations live. In `ggplot2`, you can do this by setting an upper `limits` value. The catch is that, by default, values outside the `limits` become `NA` for the scale and are drawn with `na.value` (often grey), which could be mistaken for missing data. Instead of dropping those values from the mapping, you can _squish_ them: use `oob = scales::oob_squish` (or its alias `scales::squish`) so anything above the upper limit is mapped to the maximum color, and anything below the lower limit is mapped to the minimum color.

<pre style="font-size: 0.6em;">
ggplot() +
    geom_spatvector(data = us_states,
        alpha = 1, 
        linewidth = 0.5, 
        fill = "white") +
    geom_spatvector(data = data, 
        aes(color = largest_observation),
        linewidth = 0.01,
        size = 1) +
    scale_color_continuous_sequential(
        name = "Peak Q (m^3/s)", 
        palette = "Viridis", 
        rev = TRUE,
        limits = c(0, 1000),
        oob = scales::oob_squish
    ) +
    theme_void() +
    theme(
        legend.key.height = grid::unit(0.4, "in"),
        legend.key.width  = grid::unit(0.2,  "in")
    )
</pre>

![OOB Map Clipped](../../images/oob_map_clipped.png)

But this creates a new problem: once you squish out-of-range values into the `limits`, the legend no longer communicates that those colors include values beyond the endpoints. Without an explicit indicator, a reader can reasonably interpret the darkest color as “≈ 1,000” rather than “≥ 1,000,” collapsing the extremes into an indistinguishable category. 

There’s a neat thing that Python’s `matplotlib` can do when you cap a color scale (i.e., you set limits but still want to signal out-of-range values). In `plt.colorbar`, you can use “extended” colorbars (triangular end caps) to indicate out-of-range values at one or both ends. That would solve our problem elegantly: we keep better contrast for the bulk of the data while still communicating that some stations exceed the plotted maximum. But, sadly, this is not a native feature of `ggplot2` :-(

Yes, we could switch to Python. But here's the hard truth: I simply do not like `matplotlib`. I do not like it in the rain. I would not, could not, on a train. I will not use it here or there. I do not like it anywhere! 

I know I could make equivalent plots using `matplotlib`, but I simply prefer the syntax of `ggplot2`, and it will likely continue to remain my default for visualizations. So, I wanted to find a way to do this using R. Luckily, it's quite easy. Enter the <a href="https://teunbrand.github.io/legendry/" target="_blank">`legendry`</a> package: `guide_colbar()` can add end caps automatically when (and only when) the data exceed your scale limits.[^3] Here I'm using `show = NA` to automagically add end caps only when necessary:

<pre style="font-size: 0.6em;">
library(legendry)

ggplot() +
    geom_spatvector(data = us_states,
        alpha = 1, 
        linewidth = 0.5, 
        fill = "white") +
    geom_spatvector(data = data, 
        aes(color = largest_observation),
        linewidth = 0.01,
        size = 1) +
    scale_color_continuous_sequential(
        name = "Peak Q (m^3/s)", 
        palette = "Viridis", 
        rev = TRUE,
        limits = c(0, 1000),
        oob = scales::oob_squish,
        guide  = legendry::guide_colbar(
          shape = "triangle",
          show  = NA,
          oob   = "squish",
          theme = theme(
            legend.key.height = grid::unit(2, "in"),
            legend.key.width  = grid::unit(0.2,  "in")
            )
          )
    ) +
    theme_void()
</pre>

![OOB Map Clipped with End Caps](../../images/oob_map_clipped_with_endcaps.png)

Voila—out of bounds, on purpose. Now your map can focus on the bulk of the data yet stay honest about the extremes.

Big thanks to the developer of `legendry`. You made my day.

[^1]: Here's a <a href="https://gist.github.com/realmiketalbot/0bd0af38c5b0f74c0d1fe16f895fe80d" target="_blank">reprex</a> you can play with since I haven't provided you with my data.
[^2]: As I'm using this data to illustrate a visualization method, I'm intentionally not normalizing streamflow by watershed area, which would of course reduce the skewness of the distribution considerably.
[^3]: Note that while `oob = scales::oob_squish` controls how out-of-range data are mapped to colors, `guide_colbar(oob = "squish", show = NA)` controls how the legend signals (and colors) the out-of-range end caps. You'll typically want to use both.
