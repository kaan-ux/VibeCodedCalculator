 Vibe Coding Experience Documentation

 1. Tool Selection Justification
I chose Bolt.new for this project.

 honestly, I picked it because it seemed like the easiest way to get started. I liked that it runs everything in the browser (using WebContainers), so I didn't have to mess around with setting up a local environment or installing a bunch of packages on my computer. I wanted to see if a browser-based tool could actually build a working app with data storage just as well as a normal code editor.

 2. Development Process
Building this was way faster than coding it from scratch, but I still had to watch it closely.

Starting Out: I gave it a clear prompt asking for a "modern Scientific Calculator with React and Tailwind," specifically mentioning the scientific functions and the history feature.
First Result: The first version was actually pretty good. The math worked, and the design was clean. It handled the layout well without me having to write any CSS.
Fixing It: It took about 3 or 4 tries to get everything working perfectly. The main features were there, but I had to go back and forth with the AI to fix some annoying bugs that popped up when I actually tried to use it on my phone.

 3. Challenges and Solutions
The coding part was easy, but the debugging part was where I actually had to do some work. I ran into two main problems:

Challenge 1: History Disappearing
The Problem: Even though I asked for the app to save my history, it didn't work at first. Every time I refreshed the page—on my laptop or my phone—the previous calculations would be gone.
The Fix: I told the AI, "the history clears every time I reload. Fix it so it stays saved." It realized it wasn't reading the data from localStorage correctly when the app started, and it fixed the code to load the old history properly.

Challenge 2: Broken Mobile Button
The Problem: The app looked fine on mobile, but the history button was completely dead. I was tapping it, and absolutely nothing was happening.
The Fix: I explained the issue: "The mobile history button isn't working when I click it." It turned out something else on the screen was overlapping it (a z-index issue), blocking my clicks. The AI adjusted the styling, and it started working immediately.

This felt less like programming and more like managing. 

Future Usage:
I’d use Bolt again for quick ideas or school projects because it's fast. But for something bigger or more serious, I'd use normal IDE's.

Final Thoughts:
It is fast and efficient and might be good for smaller projects but right now as where it is, vibe coding doesnt give the same trust when you code something yourself.
