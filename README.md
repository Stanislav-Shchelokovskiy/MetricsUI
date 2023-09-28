## What's it.
This is a fully read-only frontend app written in react (typescript) and aimed to display engineering metrics, tent income forecast and possible other metrics. No calculations are performed or should be performed here.<br>
Each folder in the **src > components** directory represents a fully functional separate sub app.<br>
Engineering metrics combine other metric apps under one view by switching them via react's context.<br>
Start from the App.tsx file to see which app components are available and used.<br><br>

It gets all information from the following backend apps:
 - https://github.com/DevExpress/forecaster.git
 - https://github.com/DevExpress/cost_metrics.git
 - https://github.com/DevExpress/support_metrics.git
 - https://github.com/DevExpress/performance_metrics.git
<br>

To run the app locally, run **npm install** and then **npm start**.<br>
To run tests, run **npm test**.<br>
Make sure end point consts at **src > components > EndPoint.tsx** changed accordingly.
<br>

If you introduce any breaking changes, add code to LocalStatesConverter to convert local states accordingly and specify a new vesrion.
