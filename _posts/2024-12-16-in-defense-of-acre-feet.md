---
title: 'In Defense of the Acre-Foot'
subtitle: 'A meditation on the proper use of units for communicating science'
date: 2024-12-16
permalink: /posts/2024-12-16-in-defense-of-acre-feet/
tags:
  - science-communication
---

Let me start by asking a simple question: is it easier for you to visualize, in your mind's eye, a million gallons of water or an Olympic swimming pool? Or for you cynics out there: is it easier to visualize a million milliliters of water or one cubic meter? 

I believe there's an obvious answer to either question, and in this post I'd like to use the acre-foot as a case-study to explore (a) why this is, (b) what it means for the communication breakdowns between the communities using US Customary and Standard International units, and (c) what we can learn from the acre-foot to help us code-switch our science communication. Hear me out.

<h2>The case against the acre-foot</h2>
I've seen many criticisms of the <a href="https://en.wikipedia.org/wiki/Acre-foot" target="_blank">acre-foot</a> (or _ac-ft_) from the international scientific community, including one focused on the fact that it combines an area and a depth unit (which I believe is the literal definition of volume, but anyway...). Here's the thing: on the surface, of course they're right. Neither acres nor feet make any sense in our modern scientific age, really: the <a href="https://en.wikipedia.org/wiki/Acre" target="_blank">acre</a> originated as the approximate unit of land that a yoke of oxen could plow in a day and, as we all know from the name, the <a href="https://en.wikipedia.org/wiki/Foot_(unit)#Historical_origin" target="_blank">foot</a> has varied, ancient, <a href="https://en.wikipedia.org/wiki/Anthropometry" target="_blank">anthropometric</a> origins... but this isn't a history lesson, and if you're reading this I trust you can hold your own against me in a "who reads more Wikipedia" contest. The point is that we've diligently and meticulously <a href="https://gallica.bnf.fr/ark:/12148/bpt6k3098j.image.f1082.langFR" target="_blank">defined</a> and <a href="https://opg.optica.org/ao/abstract.cfm?uri=ao-2-5-455" target="_blank">redefined</a> and <a href="https://www.npl.co.uk/si-units/metre" target="_blank">redefined</a> standard international (SI) units like the meter and the gram, and we should use them for science. I agree. I grew up in the US, so as hard as it is for me to intuitively grasp how much I weigh in kilograms, or how hot (or cold?) I'll be at 20 degrees Celsius, or what a cubic meter per second is when I spent my entire professional career working with cubic feet per second, I still agree that these are the units we should use for science and I use them in my research and in my publications.

Briefly: it is worth mentioning that there are some exceptions we need to consider here, largely for pragmatic reasons. Perhaps the most obvious among these is the use of units like acre-feet and cfs in regulatory language like the <a href="https://en.wikipedia.org/wiki/Colorado_River_Compact">Colorado River Compact</a>. Historical and institutional momentum play a large role here, and in all likelihood this is just something that we'll have to continue deal with. Moving on. 

For sake of completeness, I'll remind you that an acre is defined as 43,560 square feet (which, by the way, makes an acre-foot 43,560 cubic feet) and that this is about the size of an American football field (without the end zones) and somewhere near one half of a professional football (soccer) pitch. A US survey foot is roughly 0.3048 meters, so an acre-foot is roughly equivalent to 1233.48 cubic meters. This is not close to a nice round number, to be sure, and I can understand the frustration that someone who is familiar with cubic meters might have at being forced to do the mental unit-conversion-math during a presentation at a scientific conference (ok, yes, I may be subtweeting an AGU24 talk or two, but no shade).

You may have already noticed, but we're actually circling around my central point here, which is this: _different units of measure are contextually intuitive_ - i.e., they are intuitive based on where you grew up (the US vs <a href="https://sites.isucomm.iastate.edu/timothyl/imperial-in-a-metric-world/" target="_blank">nearly anywhere else</a>) or, more generally, they are intuitive based on your life experiences. If you've never seen an Olympic swimming pool or an American football field, then neither the pool nor the football field analogy are going to be effective examples to use to bring things into perspective, regardless of the units against which we're trying to compare. On top of this, the _magnitude_ of the values we use also matters, and this is intrinsically tied to the units we choose. We'll explore this more in a bit. 

<h2>The case for the acre-foot</h2>
Admittedly, the acre-foot is a unique unit. I've been racking my brain and perusing the <a href="https://en.wikipedia.org/wiki/List_of_unusual_units_of_measurement">list of unusual units of measurement</a> to think of another unit that combines two different units of measure for the same dimension[^1] - length in this case - and I've only come up with two: the <a href="https://en.wikipedia.org/wiki/Board_foot">board foot</a> and the hectare-meter - the latter of which I have seen in the scientific literature as, I believe, merely an SI version of the acre-foot. So, carpentry aside, it appears that this may be unique to the field of hydrology where, perhaps, we simply have a need for such a unit - e.g., to convey how much water there is when it floods in a way that people understand. This is really the fundamental utility of such a unit: someone without scientific training can visualize what you mean (with a modicum of explanation, if necessary) when you talk about an acre-foot of water.

Here is also where the criticism breaks down a bit, because (as I pointed out above) an acre can be somewhat[^2] neatly defined in square feet, so multiplying an acre by a foot simply yields cubic feet. If we discount the spurious origins of the foot and consider that it, too, has been modernly <a href="https://oceanservice.noaa.gov/geodesy/international-foot.html">redefined and standardized</a> (the international survey foot is exactly 0.3048 meters), then the ease of exact unit conversion to SI units means we shouldn't worry too much about error propagation (ignoring, for practical purposes, things like <a href="https://docs.python.org/3/tutorial/floatingpoint.html" target="_blank">floating point precision error</a>). 

My point is this: while there are strong and sound arguments for using the metric system, and unit conversions have historically been the root cause of both minor oopsies and <a href="https://www.nist.gov/pml/owm/metrication-errors-and-mishaps" target="_blank">major catastrophies</a> alike, in many cases it actually isn't a huge issue if we use something like US customary units in practice. Any engineer worth their salt should be capable of performing these conversions as necessary, triple-checking their math, and (these days) effectively using software to avoid needing to do either of these things in the first place. Like the cubic foot, the acre-foot is commonly used in the US engineering industry, and since <a href="https://www.npr.org/sections/thetwo-way/2017/12/28/574044232/how-pirates-of-the-caribbean-hijacked-americas-metric-system" target="_blank">pirates prevented metrification in the US</a>, we're unlikely to see that change any time soon. 

<h2>The psychology of numbers</h2>
So far we've established that, on one hand, standards are good, and on the other that we live in a world where certain things are the way that they are and <a href="https://knowyourmeme.com/memes/old-man-yells-at-cloud" target="_blank">yelling at clouds</a> doesn't really get us anywhere. Let's turn our attention now to some more fundamental truths about the way that humans perceive both numbers and scales, because I think this is where things get really interesting.[^3]

If you haven't heard it in a while (or ever), do yourself a favor and go listen to the classic Radiolab episode from 2009 called <a href="https://radiolab.org/podcast/91697-numbers" target="_blank">Numbers</a>. Aside from just being an example of a perfect podcast episode (IMHO - I have no evidence to support this), it features a facscinating discussion about how humans naturally relate with numbers logarithmically. As it turns out, this is <a href="https://www.science.org/doi/abs/10.1126/science.1156540" target="_blank">especially true</a>[^4] for people who don't have math training, but I can't help but wonder if this training is still perpetually fighting against that underlying lizard brain math. Regardless, the proportional difference between two numbers is more important (i.e., more innately obvious) to people than the absolute difference between them, such that the difference between 1 and 2 _feels_ larger than the difference between 8 and 9. Extrapolate this into the realm of thousands, millions, or billions, and the absolute difference between two adjacent numbers effectively becomes meaningless to us. If you don't believe me, try looking around and estimating, to the nearest person, the number of people in attendance the next time you're at a concert venue or a sporting event. I guarantee you won't be debating between 12,304 and 12,305; rather, your answer will be something to the effect of "more than a thousand but less than a million". 

The brings us to the next issue we humans have with numbers, which is slightly different but highly related: <a href="https://towardsdatascience.com/the-small-problem-with-big-numbers-4f3dad23ce01" targets="_blank">we lack the ability to truly conceive of large numbers</a>. Try, for a moment, to imagine what _one million_ humans would look like, all in one place. It's surprisingly difficult to find photos of so many people gathered together, as even the largest crowds top out at around 200,000 by all accounts (and it gets increasingly difficult to verify such claims), but the <a href="https://s.abcnews.com/images/Politics/GTY-obama-2009-inauguration-11am-jef-170120.jpg" target="_blank">crowd at Obama's inauguration address</a> is <a href="https://en.wikipedia.org/wiki/First_inauguration_of_Barack_Obama#Crowds_and_general_ticket_holders" target="_blank">likely one of them</a>. But if I asked you how many people were in that photo and gave you three choices: (a) 100,000, (b) 500,000, or (c) 1,000,000, would you really be confident in your answer? I, for one, would not be, and this illustrates my point, which is that a large number, at a certain point, is no longer meaningful for conveying anything other than the simple fact that _it is a large number_. The same, I believe, goes for very small numbers as well. 

Even though this would lead nicely into the next section, there is one more related point of discussion that I can't skip over, and that is how _scale_ impacts the ability of humans to conceive of quantities. In short, <a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0285423" target="_blank">we can process information better</a> when it aligns with familiar, human-scale experiences. In other words, using analogies for volume like "Olympic swimming pools" actually makes sense in a demonstrable way, because a swimming pool is an object at a scale to which many of us can intimately relate. 

<h2>The ethics of choosing the right units</h2>
I read <a href="https://www.nature.com/articles/s41586-024-07299-y" target="_blank">an article in _Nature_</a> recently that contains a figure conveying changes in streamflow timing, the units of which are "months per year" (month yr<sup>-1</sup>). These units alone are not necessarily problematic, but when you see that the scale ranges from -0.02 to 0.02 month yr<sup>-1</sup>, you might be tempted to agree with me (based on the above) that this was probably not the best choice of units in this case. Setting aside the fact that a month is not even a consistent measure of time, using another analogous unit in this example would yield a nice integer value (for example, days per decade would yield a range of about -300 to 300). Now, while I think this example is more careless than unethical, things are not always so. 



This is a little tangential to the overall discussion here... 

[comment on the ethics of choosing units that inflate your results, or using suggestive language (e.g., more than, nearly)]

![Wonka Volume](../../images/wonka-volume.png)

<h2>What we can learn from psychology</h2>
Why are some units more intuitive than others? How does the "human scale" factor into this? How does our perception of numbers factor into this?

<h2>What we can learn from science communicators</h2>
My engineering consulting career taught me many things, but perhaps above all it helped me refine my ability to convey complex technical information to general audiences. While I like to think of myself as a decent science communicator, I will readily admit that I'm not an expert in this field. [comment about due diligence, I did some research, but this is a blog post after all, not a journal article]

https://www.ascb.org/science-policy-public-outreach/science-outreach/communication-toolkits/best-practices-in-effective-science-communication/

Outline for the Blog Post: "Why Units Matter: Science and Communication"
1. Introduction
Hook: A relatable example of how units shape our understanding (e.g., "What’s easier to imagine: a million gallons or an Olympic swimming pool?").
Thesis: Units matter—not just for precision in science but also for effective and ethical communication.

1. Units in Science: Precision and Standardization
Why Units Are Fundamental: Discuss the importance of consistent units in scientific research for reproducibility and international collaboration.
Example: Highlight the consequences of miscommunication, such as the infamous Mars Climate Orbiter loss due to unit conversion errors.
Transition: While scientists focus on precision, communicators need to focus on clarity.

1. Units in Communication: Making the Abstract Relatable
The Role of Intuitive Units: Why units like acre-feet are so useful for audiences (e.g., connecting a unit of volume to an area people can visualize).
Visual Example: Include or describe a graphic comparing an acre, an American football field, and a European football pitch to show the scale of an acre-foot.
Point: Intuitive units bridge the gap between scientific accuracy and public understanding.

1. The Ethics of Choosing Units
Misleading Units: How some communicators intentionally choose units like "billions of liters" to sensationalize data, creating a skewed perception.
Why It’s Unethical:
Manipulates audience emotions rather than informing them.
Erodes trust in science communication.
Call for Responsibility: Emphasize the need for communicators to prioritize clarity and honesty over impact.

1. Case Study: Acre-Feet in Action
Briefly describe a scenario (e.g., water management in the western U.S.) where acre-feet provides a meaningful way to communicate water volumes.
Compare this with an example where misleading units (e.g., "trillions of teaspoons") confused or alienated audiences.

1. Conclusion
Recap Key Points: Units matter for both scientists and communicators, but they serve different roles.
Final Takeaway: Responsible science communication requires using units that are both accurate and meaningful to the audience.
Invitation to Engage: Ask readers how they think units affect their understanding of scientific topics.

[^1]: Something like the kilowatt-hour doesn't count because kilowatts and hours are two different dimensions (power and time). Also, I'm not including the oft-used acre-inch because it's not fundamentally different from an acre-foot. 
[^2]: I say "somewhat" because the square root of an acre is not an integer - i.e., an acre is not "neatly" defined as a square with sides of _x_ length as is a hectare. 
[^3]: I couldn't find a natural place for these, but somewhere in here I had to drop links to my [two](https://xkcd.com/2319/) [favorite](https://what-if.xkcd.com/4/) XKCD comics about large numbers.
[^4]: Here's a <a href="https://www.scientificamerican.com/article/a-natural-log/" target="_blank">pop-science version</a> in case you hit a paywall.
