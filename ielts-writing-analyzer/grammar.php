<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Grammar Analysis | MKWeblab</title>

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

<a href="grammar.php" class="active">
<span>✓</span> Grammar
</a>

<a href="reports.php"><span>▥</span> Reports</a>

<a href="history.php"><span>↺</span> History</a>

<a href="settings.php"><span>⚙</span> Settings</a>

</nav>

</aside>


<main class="main">

<header class="topbar">

<div>

<h1>Grammar Analysis</h1>

<p>
Check common grammatical problems in your essay.
</p>

</div>

</header>


<section class="stats-grid">

<div class="stat-card">
<span>Possible Errors</span>
<strong id="grammarErrors">0</strong>
</div>

<div class="stat-card">
<span>Complex Sentences</span>
<strong id="grammarComplex">0</strong>
</div>

<div class="stat-card">
<span>Compound Sentences</span>
<strong id="grammarCompound">0</strong>
</div>

<div class="stat-card">
<span>Simple Sentences</span>
<strong id="grammarSimple">0</strong>
</div>

</section>


<section class="panel">

<div class="panel-header">

<div>
<h3>Detected Issues</h3>
<p>Basic grammar patterns found in your writing.</p>
</div>

</div>

<div id="grammarIssues">

<div class="empty">
No essay analyzed yet.
</div>

</div>

</section>


<section class="dashboard-grid">

<div class="panel">

<h3>Sentence Structures</h3>

<div id="sentenceStructures"></div>

</div>


<div class="panel">

<h3>Grammar Tips</h3>

<ul class="tips-list">

<li>Check subject-verb agreement.</li>

<li>Use articles correctly.</li>

<li>Check singular and plural nouns.</li>

<li>Avoid unnecessarily long sentences.</li>

<li>Use punctuation carefully.</li>

<li>Check verb tense consistency.</li>

</ul>

</div>

</section>

</main>

<script src="script.js"></script>

</body>
</html>