<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Settings | MKWeblab</title>

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

<a href="history.php"><span>↺</span> History</a>

<a href="settings.php" class="active">
<span>⚙</span> Settings
</a>

</nav>

</aside>


<main class="main">

<header class="topbar">

<div>

<h1>Settings</h1>

<p>
Customize your IELTS Writing Analyzer.
</p>

</div>

</header>


<section class="settings-grid">

<div class="panel">

<h3>Appearance</h3>

<div class="setting-row">

<div>

<strong>Theme</strong>

<small>
Choose your preferred interface theme.
</small>

</div>


<select id="themeSelect">

<option value="light">
Light Mode
</option>

<option value="dark">
Dark Mode
</option>

</select>

</div>

</div>


<div class="panel">

<h3>Essay Settings</h3>

<div class="setting-row">

<div>

<strong>Target Word Count</strong>

<small>
Recommended minimum for IELTS Task 2.
</small>

</div>


<input
type="number"
id="targetWords"
value="250"
min="1"
>

</div>

</div>


<div class="panel">

<h3>Data</h3>

<p class="setting-description">

Your essays are currently stored locally in your browser
using LocalStorage.

</p>


<button class="btn" id="exportData">
Export Essays
</button>

<button class="btn danger-btn" id="deleteData">
Delete All Data
</button>

</div>

</section>

</main>

<script src="script.js"></script>

</body>
</html>