<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Vocabulary Analysis | MKWeblab</title>

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

<a href="vocabulary.php" class="active">
<span>A</span> Vocabulary
</a>

<a href="grammar.php"><span>✓</span> Grammar</a>

<a href="reports.php"><span>▥</span> Reports</a>

<a href="history.php"><span>↺</span> History</a>

<a href="settings.php"><span>⚙</span> Settings</a>

</nav>

</aside>


<main class="main">

<header class="topbar">

<div>

<h1>Vocabulary Analysis</h1>

<p>
Understand your vocabulary range and word repetition.
</p>

</div>

</header>


<section class="stats-grid">

<div class="stat-card">
<span>Unique Words</span>
<strong id="vocabUnique">0</strong>
</div>

<div class="stat-card">
<span>Repeated Words</span>
<strong id="vocabRepeated">0</strong>
</div>

<div class="stat-card">
<span>Advanced Words</span>
<strong id="vocabAdvanced">0</strong>
</div>

<div class="stat-card">
<span>Vocabulary Range</span>
<strong id="vocabRange">0%</strong>
</div>

</section>


<section class="dashboard-grid">

<div class="panel">

<div class="panel-header">

<div>
<h3>Repeated Words</h3>
<p>Words appearing frequently in your essay.</p>
</div>

</div>

<div id="repeatedWords"></div>

</div>


<div class="panel">

<div class="panel-header">

<div>
<h3>Vocabulary Level</h3>
<p>Common vocabulary detected.</p>
</div>

</div>

<div id="vocabularyLevels"></div>

</div>

</section>


<section class="panel">

<div class="panel-header">

<div>
<h3>Vocabulary Suggestions</h3>
<p>Try using more precise alternatives.</p>
</div>

</div>

<div id="vocabularySuggestions"></div>

</section>

</main>

<script src="script.js"></script>

</body>
</html>