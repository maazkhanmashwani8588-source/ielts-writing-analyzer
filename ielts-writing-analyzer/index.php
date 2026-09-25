<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>IELTS Writing Analyzer | MKWeblab</title>

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

            <a href="index.php" class="active">
                <span>⌂</span>
                Dashboard
            </a>

            <a href="write.php">
                <span>✎</span>
                Write Essay
            </a>

            <a href="analyze.php">
                <span>⌕</span>
                Analyze
            </a>

            <a href="vocabulary.php">
                <span>A</span>
                Vocabulary
            </a>

            <a href="grammar.php">
                <span>✓</span>
                Grammar
            </a>

            <a href="reports.php">
                <span>▥</span>
                Reports
            </a>

            <a href="history.php">
                <span>↺</span>
                History
            </a>

            <a href="settings.php">
                <span>⚙</span>
                Settings
            </a>

        </nav>

        <div class="sidebar-footer">
            <strong>MKWeblab</strong>
            <small>Writing smarter starts here.</small>
        </div>

    </aside>


    <main class="main">

        <header class="topbar">

            <div>
                <h1>IELTS Writing Analyzer</h1>
                <p>Write, analyze and improve your IELTS essays.</p>
            </div>

            <a href="write.php" class="btn">
                + Write Essay
            </a>

        </header>


        <section class="welcome">

            <div>
                <span class="eyebrow">WELCOME TO MKWEBLAB</span>

                <h2>
                    Improve your IELTS writing
                    <br>
                    one essay at a time.
                </h2>

                <p>
                    Analyze vocabulary, repeated words, grammar,
                    sentence structures and coherence.
                </p>

                <a href="write.php" class="btn">
                    Start Writing
                </a>
            </div>

            <div class="welcome-icon">
                ✎
            </div>

        </section>


        <section class="stats-grid">

            <div class="stat-card">
                <span>Total Essays</span>
                <strong id="dashboardEssays">0</strong>
            </div>

            <div class="stat-card">
                <span>Total Words</span>
                <strong id="dashboardWords">0</strong>
            </div>

            <div class="stat-card">
                <span>Average Words</span>
                <strong id="dashboardAverage">0</strong>
            </div>

            <div class="stat-card">
                <span>Last Analysis</span>
                <strong id="dashboardLast">None</strong>
            </div>

        </section>


        <section class="dashboard-grid">

            <div class="panel">

                <div class="panel-header">
                    <div>
                        <h3>Recent Essays</h3>
                        <p>Your latest writing attempts.</p>
                    </div>

                    <a href="history.php">View All</a>
                </div>

                <div id="dashboardEssaysList" class="essay-list">

                    <div class="empty">
                        No essays analyzed yet.
                    </div>

                </div>

            </div>


            <div class="panel">

                <div class="panel-header">
                    <div>
                        <h3>Quick Analysis</h3>
                        <p>What this tool checks.</p>
                    </div>
                </div>

                <div class="feature-list">

                    <div>
                        <span class="feature-icon">A</span>
                        <div>
                            <strong>Vocabulary</strong>
                            <small>Simple and advanced words</small>
                        </div>
                    </div>

                    <div>
                        <span class="feature-icon">↻</span>
                        <div>
                            <strong>Repetition</strong>
                            <small>Find frequently repeated words</small>
                        </div>
                    </div>

                    <div>
                        <span class="feature-icon">✓</span>
                        <div>
                            <strong>Grammar</strong>
                            <small>Detect common writing errors</small>
                        </div>
                    </div>

                    <div>
                        <span class="feature-icon">▥</span>
                        <div>
                            <strong>Structure</strong>
                            <small>Analyze sentence complexity</small>
                        </div>
                    </div>

                </div>

            </div>

        </section>

    </main>

    <script src="script.js"></script>

</body>
</html>