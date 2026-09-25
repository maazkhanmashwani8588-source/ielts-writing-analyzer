<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Essay History | MKWeblab</title>

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

<a href="reports.php"><span>▥</span> Reports</a>

<a href="history.php" class="active">
<span>↺</span> History
</a>

<a href="settings.php"><span>⚙</span> Settings</a>

</nav>

</aside>


<main class="main">

<header class="topbar">

<div>

<h1>Essay History</h1>

<p>
View your previous writing attempts.
</p>

</div>

<a href="write.php" class="btn">
+ New Essay
</a>

</header>


<section class="panel">

<div class="panel-header">

<div>
<h3>Your Essays</h3>
<p>Previously analyzed essays.</p>
</div>

<button class="btn danger-btn" id="clearHistory">
Clear History
</button>

</div>


<div id="historyList">

<div class="empty">
No essays saved yet.
</div>

</div>

</section>

</main>

<script src="script.js"></script>

</body>
</html>