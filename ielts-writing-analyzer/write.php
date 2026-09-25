<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Write Essay | IELTS Writing Analyzer</title>

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

        <a href="index.php">
            <span>⌂</span> Dashboard
        </a>

        <a href="write.php" class="active">
            <span>✎</span> Write Essay
        </a>

        <a href="analyze.php">
            <span>⌕</span> Analyze
        </a>

        <a href="vocabulary.php">
            <span>A</span> Vocabulary
        </a>

        <a href="grammar.php">
            <span>✓</span> Grammar
        </a>

        <a href="reports.php">
            <span>▥</span> Reports
        </a>

        <a href="history.php">
            <span>↺</span> History
        </a>

        <a href="settings.php">
            <span>⚙</span> Settings
        </a>

    </nav>

</aside>


<main class="main">

<header class="topbar">

    <div>
        <h1>Write Your Essay</h1>
        <p>Write your IELTS essay and analyze it when you're ready.</p>
    </div>

</header>


<section class="writing-layout">

    <div class="writing-card">

        <div class="writing-header">

            <div>

                <span class="eyebrow">IELTS WRITING</span>

                <h2>Write your Task 2 essay</h2>

            </div>

            <div class="timer" id="timer">
                00:00
            </div>

        </div>


        <div class="question-box">

            <strong>Sample IELTS Question</strong>

            <p>
                Many young people spend a lot of time using social media.
                Why is social media so popular among young people?
                How does it affect their lives?
            </p>

        </div>


        <div class="form-group">

            <label>Essay Title</label>

            <input
                type="text"
                id="essayTitle"
                placeholder="Example: Social Media and Young People"
            >

        </div>


        <div class="form-group">

            <label>Your Essay</label>

            <textarea
                id="essayText"
                placeholder="Start writing your essay here..."
            ></textarea>

        </div>


        <div class="writing-footer">

            <div class="live-stats">

                <span>
                    Words:
                    <strong id="liveWords">0</strong>
                </span>

                <span>
                    Characters:
                    <strong id="liveCharacters">0</strong>
                </span>

                <span>
                    Sentences:
                    <strong id="liveSentences">0</strong>
                </span>

            </div>


            <button class="btn" id="analyzeEssay">
                Analyze Essay
            </button>

        </div>

    </div>


    <div class="writing-tips">

        <div class="panel">

            <div class="panel-header">
                <div>
                    <h3>Writing Tips</h3>
                    <p>Keep these in mind.</p>
                </div>
            </div>

            <ul class="tips-list">

                <li>
                    Write at least 250 words for Task 2.
                </li>

                <li>
                    Give clear reasons and examples.
                </li>

                <li>
                    Avoid repeating the same vocabulary.
                </li>

                <li>
                    Use different sentence structures.
                </li>

                <li>
                    Connect your ideas clearly.
                </li>

                <li>
                    Avoid very informal language.
                </li>

            </ul>

        </div>


        <div class="panel">

            <h3>Essay Structure</h3>

            <div class="structure-item">
                <strong>1. Introduction</strong>
                <span>Introduce the topic.</span>
            </div>

            <div class="structure-item">
                <strong>2. Body Paragraph 1</strong>
                <span>First main idea + example.</span>
            </div>

            <div class="structure-item">
                <strong>3. Body Paragraph 2</strong>
                <span>Second main idea + example.</span>
            </div>

            <div class="structure-item">
                <strong>4. Conclusion</strong>
                <span>Summarize your ideas.</span>
            </div>

        </div>

    </div>

</section>

</main>

<script src="script.js"></script>

</body>
</html>