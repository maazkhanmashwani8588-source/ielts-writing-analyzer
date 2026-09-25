<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Reports | MKWeblab</title>

<link rel="stylesheet" href="style.css">

</head>

<body>

<aside class="sidebar">

<div class="brand">

<div class="brand-icon">M</div>

<div>
<h2>MKWeblab</h2>
<span>IELTS Analyzer</span>
</div>

</div>


<nav>

<a href="index.php"><span>⌂</span> Dashboard</a>

<a href="write.php"><span>✎</span> Write Essay</a>

<a href="analyze.php"><span>⌕</span> Analyze</a>

<a href="vocabulary.php"><span>A</span> Vocabulary</a>

<a href="grammar.php"><span>✓</span> Grammar</a>

<a href="reports.php" class="active">
<span>▥</span> Reports
</a>

<a href="history.php"><span>↺</span> History</a>

<a href="settings.php"><span>⚙</span> Settings</a>

</nav>

</aside>


<main class="main">

<header class="topbar">

<div>

<h1>Writing Reports</h1>

<p>
See your overall writing performance.
</p>

</div>

</header>


<section class="stats-grid">

<div class="stat-card">
<span>Total Essays</span>
<strong id="reportEssays">0</strong>
</div>

<div class="stat-card">
<span>Total Words</span>
<strong id="reportWords">0</strong>
</div>

<div class="stat-card">
<span>Average Words</span>
<strong id="reportAverage">0</strong>
</div>

<div class="stat-card">
<span>Average Complexity</span>
<strong id="reportComplexity">0%</strong>
</div>

</section>


<section class="dashboard-grid">

<div class="panel">

<h3>Sentence Structure</h3>

<div class="chart-container" id="structureChart"></div>

</div>


<div class="panel">

<h3>Vocabulary Performance</h3>

<div class="chart-container" id="vocabularyChart"></div>

</div>

</section>


<section class="panel">

<div class="panel-header">

<div>
<h3>Improvement Feedback</h3>
<p>Suggestions based on your essays.</p>
</div>

</div>

<div id="reportFeedback"></div>

</section>

</main>

<script src="script.js"></script>

</body>
</html>