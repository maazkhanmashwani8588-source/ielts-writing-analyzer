const STORAGE_KEY = "mkweblab_ielts_essays";
const SETTINGS_KEY = "mkweblab_ielts_settings";

const stopWords = new Set([
    "a", "an", "the", "and", "or", "but", "so", "because",
    "of", "to", "in", "on", "at", "for", "from", "with",
    "by", "as", "is", "are", "was", "were", "be", "been",
    "being", "this", "that", "these", "those", "it", "its",
    "they", "them", "their", "there", "here", "he", "she",
    "his", "her", "we", "our", "you", "your", "i", "me",
    "my", "myself", "who", "which", "what", "when", "where",
    "why", "how", "can", "could", "will", "would", "should",
    "may", "might", "must", "do", "does", "did", "have",
    "has", "had", "not", "than", "then", "also", "very",
    "too", "only", "more", "most", "some", "many", "much",
    "such", "each", "every", "both", "all", "any", "other",
    "another", "into", "over", "after", "before", "during",
    "while", "if", "although", "however", "therefore"
]);

const simpleWords = {
    good: ["beneficial", "positive", "advantageous"],
    bad: ["harmful", "negative", "detrimental"],
    important: ["significant", "essential", "crucial"],
    big: ["large", "substantial", "considerable"],
    small: ["minor", "limited", "modest"],
    problem: ["issue", "challenge", "difficulty"],
    help: ["assist", "support", "facilitate"],
    show: ["demonstrate", "illustrate", "indicate"],
    think: ["believe", "argue", "consider"],
    get: ["obtain", "receive", "acquire"],
    give: ["provide", "offer", "deliver"],
    make: ["create", "produce", "generate"],
    use: ["utilize", "employ", "apply"],
    people: ["individuals", "citizens", "members of society"],
    thing: ["aspect", "factor", "element"],
    important: ["significant", "essential", "crucial"],
    many: ["numerous", "a considerable number of"],
    enough: ["sufficient", "adequate"],
    old: ["elderly", "aged"],
    young: ["younger", "youthful"],
    easy: ["simple", "straightforward"],
    hard: ["difficult", "challenging"],
    fast: ["rapid", "swift"],
    slow: ["gradual", "sluggish"],
    change: ["alter", "transform", "modify"],
    improve: ["enhance", "strengthen", "develop"],
    need: ["require", "necessitate"],
    want: ["desire", "seek"],
    keep: ["maintain", "retain"],
    start: ["begin", "commence"],
    end: ["conclude", "terminate"],
    buy: ["purchase", "acquire"],
    job: ["occupation", "profession", "employment"],
    work: ["employment", "occupation", "professional activity"],
    rich: ["wealthy", "affluent"],
    poor: ["disadvantaged", "low-income"],
    free: ["complimentary", "without cost"],
    chance: ["opportunity", "possibility"],
    idea: ["concept", "notion", "perspective"],
    reason: ["factor", "justification", "rationale"],
    result: ["outcome", "consequence", "effect"]
};

const linkingWords = [
    "however",
    "therefore",
    "moreover",
    "furthermore",
    "consequently",
    "nevertheless",
    "although",
    "because",
    "in addition",
    "for example",
    "for instance",
    "on the other hand",
    "in contrast",
    "as a result",
    "in conclusion",
    "to conclude",
    "firstly",
    "secondly",
    "finally",
    "similarly",
    "in particular",
    "for this reason"
];

const advancedWords = [
    "significant",
    "substantial",
    "considerable",
    "beneficial",
    "detrimental",
    "consequently",
    "furthermore",
    "nevertheless",
    "implementation",
    "socioeconomic",
    "infrastructure",
    "environmental",
    "technological",
    "perspective",
    "phenomenon",
    "controversial",
    "demonstrate",
    "facilitate",
    "essential",
    "considerably",
    "increasingly",
    "productivity",
    "expenditure",
    "sustainable",
    "inequality",
    "individuals",
    "contemporary",
    "subsequently"
];

function getEssays() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveEssays(essays) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(essays));
}

function getSettings() {
    return JSON.parse(
        localStorage.getItem(SETTINGS_KEY) ||
        '{"theme":"light","targetWords":250}'
    );
}

function escapeHTML(text) {
    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getWords(text) {
    return text
        .toLowerCase()
        .match(/\b[a-zA-Z]+(?:['-][a-zA-Z]+)*\b/g) || [];
}

function getSentences(text) {
    return text
        .replace(/\r/g, "")
        .split(/(?<=[.!?])\s+/)
        .map(s => s.trim())
        .filter(Boolean);
}

function getParagraphs(text) {
    return text
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean);
}

function getWordFrequency(text) {
    const words = getWords(text);
    const frequency = {};

    words.forEach(word => {
        if (!stopWords.has(word)) {
            frequency[word] = (frequency[word] || 0) + 1;
        }
    });

    return frequency;
}

/* =========================================================
   SENTENCE LOCATIONS
========================================================= */

function getSentenceLocations(text) {
    const sentences = getSentences(text);

    return sentences.map((sentence, index) => ({
        id: index + 1,
        number: index + 1,
        text: sentence,
        words: getWords(sentence)
    }));
}

/* =========================================================
   REPEATED WORD LOCATIONS
========================================================= */

function findRepeatedWordLocations(text, frequency) {
    const sentences = getSentenceLocations(text);
    const results = [];

    Object.keys(frequency)
        .filter(word => frequency[word] >= 3)
        .sort((a, b) => frequency[b] - frequency[a])
        .forEach(word => {

            const locations = sentences
                .filter(sentence =>
                    sentence.words.includes(word)
                )
                .map(sentence => ({
                    sentenceNumber: sentence.number,
                    sentence: sentence.text
                }));

            results.push({
                word,
                count: frequency[word],
                locations
            });
        });

    return results;
}

/* =========================================================
   SIMPLE WORD LOCATIONS
========================================================= */

function findSimpleWordLocations(text) {
    const sentences = getSentenceLocations(text);
    const results = [];

    sentences.forEach(sentence => {

        sentence.words.forEach(word => {

            if (simpleWords[word]) {

                results.push({
                    word,
                    sentenceNumber: sentence.number,
                    sentence: sentence.text,
                    alternatives: simpleWords[word]
                });

            }

        });

    });

    return results;
}

/* =========================================================
   ADVANCED WORD LOCATIONS
========================================================= */

function findAdvancedWordLocations(text) {
    const sentences = getSentenceLocations(text);
    const results = [];

    sentences.forEach(sentence => {

        sentence.words.forEach(word => {

            if (advancedWords.includes(word)) {

                results.push({
                    word,
                    sentenceNumber: sentence.number,
                    sentence: sentence.text
                });

            }

        });

    });

    return results;
}

/* =========================================================
   LINKING WORD LOCATIONS
========================================================= */

function findLinkingWordLocations(text) {

    const sentences = getSentenceLocations(text);
    const results = [];

    sentences.forEach(sentence => {

        linkingWords.forEach(linkingWord => {

            const regex = new RegExp(
                "\\b" + linkingWord.replace(/ /g, "\\s+") + "\\b",
                "i"
            );

            if (regex.test(sentence.text)) {

                results.push({
                    word: linkingWord,
                    sentenceNumber: sentence.number,
                    sentence: sentence.text
                });

            }

        });

    });

    return results;
}

/* =========================================================
   GRAMMAR DETECTION
========================================================= */

function detectGrammarIssues(text) {

    const sentences = getSentenceLocations(text);
    const issues = [];

    const patterns = [

        {
            regex: /\bpeople\s+is\b/gi,
            wrong: "people is",
            correction: "people are",
            explanation:
                "\"People\" is plural, so it should be followed by \"are\"."
        },

        {
            regex: /\bstudents\s+is\b/gi,
            wrong: "students is",
            correction: "students are",
            explanation:
                "\"Students\" is plural, so use \"are\" instead of \"is\"."
        },

        {
            regex: /\bchildren\s+is\b/gi,
            wrong: "children is",
            correction: "children are",
            explanation:
                "\"Children\" is plural, so use \"are\"."
        },

        {
            regex: /\bpeople\s+was\b/gi,
            wrong: "people was",
            correction: "people were",
            explanation:
                "\"People\" is plural, so use \"were\"."
        },

        {
            regex: /\bthey\s+goes\b/gi,
            wrong: "they goes",
            correction: "they go",
            explanation:
                "\"They\" takes the base form \"go\", not \"goes\"."
        },

        {
            regex: /\bhe\s+go\b/gi,
            wrong: "he go",
            correction: "he goes",
            explanation:
                "With \"he\", the present simple verb normally takes -s."
        },

        {
            regex: /\bshe\s+go\b/gi,
            wrong: "she go",
            correction: "she goes",
            explanation:
                "With \"she\", the present simple verb normally takes -s."
        },

        {
            regex: /\bi\s+is\b/gi,
            wrong: "I is",
            correction: "I am",
            explanation:
                "The correct form is \"I am\"."
        },

        {
            regex: /\bthere\s+is\s+(?:many|several|numerous)\b/gi,
            wrong: "there is + plural noun",
            correction: "there are + plural noun",
            explanation:
                "Use \"there are\" with plural nouns."
        },

        {
            regex: /\bmany\s+people\s+is\b/gi,
            wrong: "many people is",
            correction: "many people are",
            explanation:
                "\"Many people\" is plural."
        }

    ];

    sentences.forEach(sentence => {

        patterns.forEach(pattern => {

            const matches = sentence.text.match(pattern.regex);

            if (matches) {

                matches.forEach(match => {

                    issues.push({
                        sentenceNumber: sentence.number,
                        sentence: sentence.text,
                        wrong: match,
                        correction: pattern.correction,
                        explanation: pattern.explanation
                    });

                });

            }

        });

    });

    return issues;
}

/* =========================================================
   SENTENCE STRUCTURE
========================================================= */

function analyzeSentenceStructure(text) {

    const sentences = getSentenceLocations(text);

    const simple = [];
    const compound = [];
    const complex = [];

    sentences.forEach(sentence => {

        const value = sentence.text;

        const hasSubordinator =
            /\b(although|because|while|whereas|if|when|unless|since|which|who|that|even though|even if)\b/i
                .test(value);

        const hasCoordinator =
            /\b(and|but|or|so|yet|for)\b/i
                .test(value);

        if (hasSubordinator) {

            complex.push({
                sentenceNumber: sentence.number,
                sentence: value,
                reason:
                    "This sentence contains a dependent-clause marker such as because, although, while, if, when, which, who, or that."
            });

        } else if (hasCoordinator) {

            compound.push({
                sentenceNumber: sentence.number,
                sentence: value,
                reason:
                    "This sentence connects independent ideas with a coordinating conjunction."
            });

        } else {

            simple.push({
                sentenceNumber: sentence.number,
                sentence: value
            });

        }

    });

    return {
        simple,
        compound,
        complex
    };
}

/* =========================================================
   MAIN ANALYZER
========================================================= */

function analyzeText(text) {

    const words = getWords(text);
    const sentences = getSentences(text);
    const paragraphs = getParagraphs(text);
    const frequency = getWordFrequency(text);

    const repeated = findRepeatedWordLocations(
        text,
        frequency
    );

    const simpleLocations =
        findSimpleWordLocations(text);

    const advancedLocations =
        findAdvancedWordLocations(text);

    const linkingLocations =
        findLinkingWordLocations(text);

    const grammarIssues =
        detectGrammarIssues(text);

    const structure =
        analyzeSentenceStructure(text);

    const uniqueWords =
        Object.keys(frequency).length;

    const vocabularyRange =
        words.length > 0
            ? Math.round((uniqueWords / words.length) * 100)
            : 0;

    const complexity =
        sentences.length > 0
            ? Math.round(
                ((structure.complex.length +
                    structure.compound.length) /
                    sentences.length) * 100
            )
            : 0;

    return {

        wordCount: words.length,

        characterCount: text.length,

        sentenceCount: sentences.length,

        paragraphCount: paragraphs.length,

        uniqueWords,

        vocabularyRange,

        repeated,

        repeatedCount: repeated.length,

        simpleLocations,

        simpleCount: simpleLocations.length,

        advancedLocations,

        advancedCount: advancedLocations.length,

        linkingLocations,

        linkingCount: linkingLocations.length,

        grammarIssues,

        grammarCount: grammarIssues.length,

        structure,

        simpleSentences: structure.simple.length,

        compoundSentences: structure.compound.length,

        complexSentences: structure.complex.length,

        complexity

    };
}

/* =========================================================
   SAVE ESSAY
========================================================= */

function saveEssay(title, text) {

    const essays = getEssays();

    const analysis = analyzeText(text);

    const essay = {

        id: Date.now(),

        title: title || "Untitled Essay",

        text,

        analysis,

        date: new Date().toISOString()

    };

    essays.unshift(essay);

    saveEssays(essays);

    localStorage.setItem(
        "mkweblab_current_essay",
        JSON.stringify(essay)
    );

    return essay;
}

function getCurrentEssay() {

    const current =
        localStorage.getItem("mkweblab_current_essay");

    if (current) {

        try {
            return JSON.parse(current);
        } catch (error) {
            console.error(error);
        }

    }

    const essays = getEssays();

    return essays.length ? essays[0] : null;
}

/* =========================================================
   HIGHLIGHT ESSAY
========================================================= */

function highlightEssay(text, analysis) {

    let html = escapeHTML(text);

    /*
     * Grammar highlighting
     */

    analysis.grammarIssues.forEach(issue => {

        const escapedWrong =
            escapeHTML(issue.wrong);

        const regex =
            new RegExp(
                "(" +
                escapedWrong.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
                ")",
                "gi"
            );

        html = html.replace(
            regex,
            '<mark class="essay-error" title="Grammar issue">$1</mark>'
        );

    });

    /*
     * Simple vocabulary
     */

    Object.keys(simpleWords).forEach(word => {

        const regex =
            new RegExp(
                "\\b(" + word + ")\\b",
                "gi"
            );

        html = html.replace(
            regex,
            '<mark class="essay-simple" title="Simple vocabulary">$1</mark>'
        );

    });

    return html.replace(/\n/g, "<br>");
}

/* =========================================================
   REPEATED WORD CARD
========================================================= */

function createRepeatedWordCard(item) {

    const sentencesHTML =
        item.locations.map(location => `
            <div class="issue-sentence">
                <span class="sentence-number">
                    Sentence ${location.sentenceNumber}
                </span>

                <p>
                    ${highlightSpecificWord(
                        location.sentence,
                        item.word,
                        "repeated-highlight"
                    )}
                </p>
            </div>
        `).join("");

    return `
        <div class="detail-card repeated-card">

            <div class="detail-card-header">

                <div>
                    <span class="issue-label yellow">
                        Repeated Word
                    </span>

                    <h4>${escapeHTML(item.word)}</h4>
                </div>

                <strong>
                    ${item.count} times
                </strong>

            </div>

            <p class="issue-description">
                You used this word ${item.count} times.
                Consider using different words where appropriate.
            </p>

            <div class="location-list">
                ${sentencesHTML}
            </div>

        </div>
    `;
}

/* =========================================================
   HIGHLIGHT SPECIFIC WORD
========================================================= */

function highlightSpecificWord(
    sentence,
    word,
    className
) {

    const escapedSentence =
        escapeHTML(sentence);

    const regex =
        new RegExp(
            "\\b(" +
            word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            ")\\b",
            "gi"
        );

    return escapedSentence.replace(
        regex,
        `<mark class="${className}">$1</mark>`
    );
}

/* =========================================================
   SIMPLE VOCABULARY CARD
========================================================= */

function createSimpleWordCard(item) {

    return `
        <div class="detail-card simple-card">

            <div class="detail-card-header">

                <div>
                    <span class="issue-label blue">
                        Simple Vocabulary
                    </span>

                    <h4>
                        ${escapeHTML(item.word)}
                    </h4>
                </div>

                <span>
                    Sentence ${item.sentenceNumber}
                </span>

            </div>

            <div class="sentence-preview">
                ${highlightSpecificWord(
                    item.sentence,
                    item.word,
                    "simple-highlight"
                )}
            </div>

            <div class="suggestion-box">

                <strong>Better alternatives:</strong>

                <div class="alternative-list">
                    ${item.alternatives.map(word => `
                        <span>${escapeHTML(word)}</span>
                    `).join("")}
                </div>

            </div>

        </div>
    `;
}

/* =========================================================
   GRAMMAR CARD
========================================================= */

function createGrammarCard(issue) {

    return `
        <div class="detail-card grammar-card">

            <div class="detail-card-header">

                <div>
                    <span class="issue-label red">
                        Grammar Issue
                    </span>

                    <h4>
                        Sentence ${issue.sentenceNumber}
                    </h4>
                </div>

            </div>

            <div class="wrong-sentence">

                <strong>Your sentence:</strong>

                <p>
                    ${highlightSpecificWord(
                        issue.sentence,
                        issue.wrong,
                        "grammar-highlight"
                    )}
                </p>

            </div>

            <div class="correction-box">

                <strong>Correction:</strong>

                <p>
                    ${escapeHTML(
                        issue.sentence.replace(
                            new RegExp(
                                issue.wrong,
                                "i"
                            ),
                            issue.correction
                        )
                    )}
                </p>

            </div>

            <div class="why-box">

                <strong>Why?</strong>

                <p>
                    ${escapeHTML(issue.explanation)}
                </p>

            </div>

        </div>
    `;
}

/* =========================================================
   COMPLEX SENTENCE CARD
========================================================= */

function createComplexSentenceCard(item) {

    return `
        <div class="detail-card complex-card">

            <span class="issue-label purple">
                Complex Structure
            </span>

            <h4>
                Sentence ${item.sentenceNumber}
            </h4>

            <p class="sentence-preview">
                ${escapeHTML(item.sentence)}
            </p>

            <div class="structure-explanation">

                <strong>Why is this complex?</strong>

                <p>
                    ${escapeHTML(item.reason)}
                </p>

            </div>

        </div>
    `;
}

/* =========================================================
   FEEDBACK
========================================================= */

function generateFeedback(analysis) {

    const feedback = [];

    if (analysis.wordCount < 250) {

        feedback.push({
            type: "warning",
            title: "Word Count",
            text:
                `Your essay contains ${analysis.wordCount} words. `
                +
                `IELTS Writing Task 2 requires at least 250 words.`
        });

    } else {

        feedback.push({
            type: "success",
            title: "Word Count",
            text:
                `Your essay has ${analysis.wordCount} words, `
                +
                `so it meets the minimum Task 2 requirement.`
        });

    }

    if (analysis.repeatedCount > 3) {

        feedback.push({
            type: "warning",
            title: "Word Repetition",
            text:
                `You have ${analysis.repeatedCount} frequently repeated `
                +
                `content words. Try using synonyms and different expressions.`
        });

    } else {

        feedback.push({
            type: "success",
            title: "Word Repetition",
            text:
                "Your essay does not show a large number of heavily repeated content words."
        });

    }

    if (analysis.simpleCount > 5) {

        feedback.push({
            type: "warning",
            title: "Simple Vocabulary",
            text:
                `We found ${analysis.simpleCount} uses of common/simple vocabulary. `
                +
                "Look at the suggested alternatives and use them only when they fit the meaning."
        });

    }

    if (analysis.complexity < 30) {

        feedback.push({
            type: "warning",
            title: "Sentence Variety",
            text:
                "Your essay contains relatively few compound or complex sentences. "
                +
                "Try combining ideas using although, because, while, which, and other structures."
        });

    } else {

        feedback.push({
            type: "success",
            title: "Sentence Variety",
            text:
                "Your essay uses a reasonable mixture of sentence structures."
        });

    }

    if (analysis.linkingCount < 3) {

        feedback.push({
            type: "warning",
            title: "Cohesion",
            text:
                "Your essay contains relatively few detected linking expressions. "
                +
                "Use cohesive devices naturally to connect ideas."
        });

    }

    if (analysis.grammarCount > 0) {

        feedback.push({
            type: "danger",
            title: "Grammar",
            text:
                `We detected ${analysis.grammarCount} possible grammar issue(s). `
                +
                "Review the exact sentences below and correct them."
        });

    } else {

        feedback.push({
            type: "success",
            title: "Grammar",
            text:
                "No obvious grammar patterns from the current rule set were detected."
        });

    }

    return feedback;
}

/* =========================================================
   ANALYSIS PAGE
========================================================= */

function loadAnalysisPage() {
    const container = document.getElementById("analysisContent");

    if (!container) return;

    const essay = getCurrentEssay();

    if (!essay) {
        container.innerHTML = `
            <div class="empty-analysis">
                <div class="empty-icon">📝</div>
                <h2>No Essay Found</h2>
                <p>Write an essay first and then analyze it.</p>
                <a href="write.php" class="btn btn-primary">Write an Essay</a>
            </div>
        `;
        return;
    }

    const analysis = essay.analysis || analyzeText(essay.text);

    const grammarCount = analysis.grammarIssues
        ? analysis.grammarIssues.length
        : 0;

    const repeatedCount = analysis.repeated
        ? analysis.repeated.length
        : 0;

    const simpleCount = analysis.simpleDetected
        ? analysis.simpleDetected.length
        : 0;

    const complexCount = analysis.complexSentences
        ? analysis.complexSentences.length
        : analysis.complexCount || 0;

    const linkingCount = analysis.linkingDetected
        ? analysis.linkingDetected.length
        : 0;

    let statusTitle = "Good Start";
    let statusText = "Your essay has a good foundation. Keep improving your vocabulary and sentence structure.";
    let statusClass = "good";

    if (grammarCount >= 4 || analysis.wordCount < 200) {
        statusTitle = "Needs Improvement";
        statusText = "There are some important areas you should improve before your IELTS test.";
        statusClass = "needs-work";
    } else if (
        grammarCount > 0 ||
        repeatedCount > 3 ||
        simpleCount > 5
    ) {
        statusTitle = "Keep Improving";
        statusText = "Your essay is developing well, but there are some areas you can improve.";
        statusClass = "improving";
    }

    container.innerHTML = `

        <!-- =========================
             ANALYSIS OVERVIEW
        ========================== -->

        <div class="analysis-overview">

            <div class="analysis-overview-header">
                <div>
                    <span class="section-kicker">IELTS WRITING ANALYSIS</span>
                    <h2>${escapeHTML(essay.title)}</h2>
                    <p>
                        Detailed feedback based on your writing.
                        Open each section to see the exact sentences and suggestions.
                    </p>
                </div>

                <div class="analysis-status ${statusClass}">
                    <span class="status-dot"></span>
                    <div>
                        <strong>${statusTitle}</strong>
                        <small>${statusText}</small>
                    </div>
                </div>
            </div>


            <!-- TOP STATS -->

            <div class="analysis-stats">

                <div class="analysis-stat">
                    <span class="stat-number">${analysis.wordCount}</span>
                    <span class="stat-label">Words</span>
                </div>

                <div class="analysis-stat">
                    <span class="stat-number">${grammarCount}</span>
                    <span class="stat-label">Grammar Issues</span>
                </div>

                <div class="analysis-stat">
                    <span class="stat-number">${repeatedCount}</span>
                    <span class="stat-label">Repeated Words</span>
                </div>

                <div class="analysis-stat">
                    <span class="stat-number">${simpleCount}</span>
                    <span class="stat-label">Simple Words</span>
                </div>

                <div class="analysis-stat">
                    <span class="stat-number">${complexCount}</span>
                    <span class="stat-label">Complex Sentences</span>
                </div>

                <div class="analysis-stat">
                    <span class="stat-number">${linkingCount}</span>
                    <span class="stat-label">Linking Words</span>
                </div>

            </div>

        </div>


        <!-- =========================
             YOUR ESSAY
        ========================== -->

        <div class="analysis-section open">

            <button class="analysis-section-toggle"
                    type="button"
                    aria-expanded="true">

                <div class="section-toggle-left">

                    <span class="section-icon essay-icon">📝</span>

                    <div>
                        <h3>Your Essay</h3>
                        <span>
                            See your essay with detected problems highlighted
                        </span>
                    </div>

                </div>

                <span class="toggle-right">
                    <span class="section-count">
                        ${analysis.wordCount} words
                    </span>
                    <span class="toggle-arrow">⌃</span>
                </span>

            </button>

            <div class="analysis-section-body">

                <div class="essay-highlight-box">
                    ${highlightEssay(
                        essay.text,
                        analysis
                    )}
                </div>

                <div class="highlight-legend">

                    <span>
                        <i class="legend-error"></i>
                        Possible grammar issue
                    </span>

                    <span>
                        <i class="legend-simple"></i>
                        Simple vocabulary
                    </span>

                    <span>
                        <i class="legend-repeated"></i>
                        Repeated vocabulary
                    </span>

                </div>

            </div>

        </div>


        <!-- =========================
             GRAMMAR
        ========================== -->

        <div class="analysis-section ${grammarCount > 0 ? "open" : ""}">

            <button class="analysis-section-toggle"
                    type="button"
                    aria-expanded="${grammarCount > 0}">

                <div class="section-toggle-left">

                    <span class="section-icon grammar-icon">⚠️</span>

                    <div>
                        <h3>Possible Grammar Issues</h3>
                        <span>
                            Exact sentences and corrections
                        </span>
                    </div>

                </div>

                <span class="toggle-right">

                    <span class="section-count ${grammarCount > 0 ? "danger-count" : "success-count"}">
                        ${grammarCount} ${grammarCount === 1 ? "issue" : "issues"}
                    </span>

                    <span class="toggle-arrow">
                        ${grammarCount > 0 ? "⌃" : "⌄"}
                    </span>

                </span>

            </button>

            <div class="analysis-section-body">

                ${
                    grammarCount > 0
                        ? `
                            <div class="detail-grid">
                                ${analysis.grammarIssues
                                    .map((issue, index) =>
                                        createGrammarCard(issue, index)
                                    )
                                    .join("")}
                            </div>
                        `
                        : `
                            <div class="success-message">
                                <strong>✓ No obvious grammar patterns detected</strong>
                                <p>
                                    Our rule-based analyzer did not find any of
                                    the grammar patterns it currently checks for.
                                </p>
                            </div>
                        `
                }

            </div>

        </div>


        <!-- =========================
             REPEATED WORDS
        ========================== -->

        <div class="analysis-section ${repeatedCount > 0 ? "open" : ""}">

            <button class="analysis-section-toggle"
                    type="button"
                    aria-expanded="${repeatedCount > 0}">

                <div class="section-toggle-left">

                    <span class="section-icon repeated-icon">🔁</span>

                    <div>
                        <h3>Repeated Words</h3>
                        <span>
                            See exactly where repeated words appear
                        </span>
                    </div>

                </div>

                <span class="toggle-right">

                    <span class="section-count">
                        ${repeatedCount} ${repeatedCount === 1 ? "word" : "words"}
                    </span>

                    <span class="toggle-arrow">
                        ${repeatedCount > 0 ? "⌃" : "⌄"}
                    </span>

                </span>

            </button>

            <div class="analysis-section-body">

                ${
                    repeatedCount > 0
                        ? `
                            <div class="detail-grid">
                                ${analysis.repeated
                                    .map(item =>
                                        createRepeatedWordCard(item)
                                    )
                                    .join("")}
                            </div>
                        `
                        : `
                            <div class="success-message">
                                <strong>✓ Good vocabulary variety</strong>
                                <p>
                                    No major repeated content words were detected.
                                </p>
                            </div>
                        `
                }

            </div>

        </div>


        <!-- =========================
             SIMPLE VOCABULARY
        ========================== -->

        <div class="analysis-section ${simpleCount > 0 ? "" : ""}">

            <button class="analysis-section-toggle"
                    type="button"
                    aria-expanded="false">

                <div class="section-toggle-left">

                    <span class="section-icon vocabulary-icon">🔵</span>

                    <div>
                        <h3>Simple Vocabulary</h3>
                        <span>
                            Words that could be replaced with stronger vocabulary
                        </span>
                    </div>

                </div>

                <span class="toggle-right">

                    <span class="section-count">
                        ${simpleCount} ${simpleCount === 1 ? "word" : "words"}
                    </span>

                    <span class="toggle-arrow">⌄</span>

                </span>

            </button>

            <div class="analysis-section-body">

                ${
                    simpleCount > 0
                        ? `
                            <div class="detail-grid">
                                ${analysis.simpleDetected
                                    .map(item =>
                                        createSimpleWordCard(item)
                                    )
                                    .join("")}
                            </div>
                        `
                        : `
                            <div class="success-message">
                                <strong>✓ No major simple vocabulary patterns detected</strong>
                                <p>
                                    Your vocabulary appears reasonably varied based
                                    on the analyzer's current word list.
                                </p>
                            </div>
                        `
                }

            </div>

        </div>


        <!-- =========================
             SENTENCE STRUCTURES
        ========================== -->

        <div class="analysis-section">

            <button class="analysis-section-toggle"
                    type="button"
                    aria-expanded="false">

                <div class="section-toggle-left">

                    <span class="section-icon structure-icon">🟣</span>

                    <div>
                        <h3>Sentence Structures</h3>
                        <span>
                            Simple, compound and complex sentence analysis
                        </span>
                    </div>

                </div>

                <span class="toggle-right">

                    <span class="section-count">
                        ${analysis.sentenceCount} sentences
                    </span>

                    <span class="toggle-arrow">⌄</span>

                </span>

            </button>

            <div class="analysis-section-body">

                <div class="structure-overview">

                    <div class="structure-box simple-structure">
                        <strong>${analysis.simpleCount || 0}</strong>
                        <span>Simple</span>
                    </div>

                    <div class="structure-box compound-structure">
                        <strong>${analysis.compoundCount || 0}</strong>
                        <span>Compound</span>
                    </div>

                    <div class="structure-box complex-structure">
                        <strong>${analysis.complexCount || 0}</strong>
                        <span>Complex</span>
                    </div>

                </div>

                <div id="sentenceStructures">
                    ${
                        analysis.sentenceStructures
                            ? analysis.sentenceStructures
                                .map((sentence, index) =>
                                    createComplexSentenceCard(
                                        sentence,
                                        index
                                    )
                                )
                                .join("")
                            : `
                                <div class="info-message">
                                    Sentence structure details are based on
                                    the analyzer's rule-based detection.
                                </div>
                            `
                    }
                </div>

            </div>

        </div>


        <!-- =========================
             LINKING WORDS
        ========================== -->

        <div class="analysis-section">

            <button class="analysis-section-toggle"
                    type="button"
                    aria-expanded="false">

                <div class="section-toggle-left">

                    <span class="section-icon linking-icon">🔗</span>

                    <div>
                        <h3>Linking Words</h3>
                        <span>
                            Check your use of cohesive devices
                        </span>
                    </div>

                </div>

                <span class="toggle-right">

                    <span class="section-count">
                        ${linkingCount} found
                    </span>

                    <span class="toggle-arrow">⌄</span>

                </span>

            </button>

            <div class="analysis-section-body">

                ${
                    linkingCount > 0
                        ? `
                            <div class="linking-results">

                                ${analysis.linkingDetected
                                    .map(item => {

                                        if (typeof item === "string") {
                                            return `
                                                <div class="linking-item">
                                                    <strong>
                                                        ${escapeHTML(item)}
                                                    </strong>
                                                </div>
                                            `;
                                        }

                                        return `
                                            <div class="linking-item">

                                                <strong>
                                                    ${escapeHTML(
                                                        item.word || ""
                                                    )}
                                                </strong>

                                                ${
                                                    item.sentence
                                                        ? `
                                                            <p>
                                                                ${escapeHTML(
                                                                    item.sentence
                                                                )}
                                                            </p>
                                                        `
                                                        : ""
                                                }

                                            </div>
                                        `;

                                    })
                                    .join("")}

                            </div>
                        `
                        : `
                            <div class="info-message">
                                No common linking words were detected.
                                Try using connectors such as
                                <strong>however, therefore, moreover</strong>
                                or <strong>for example</strong> when appropriate.
                            </div>
                        `
                }

            </div>

        </div>


        <!-- =========================
             PERSONALIZED FEEDBACK
        ========================== -->

        <div class="analysis-section open">

            <button class="analysis-section-toggle"
                    type="button"
                    aria-expanded="true">

                <div class="section-toggle-left">

                    <span class="section-icon feedback-icon-main">💡</span>

                    <div>
                        <h3>Personalized Feedback</h3>
                        <span>
                            What you should focus on next
                        </span>
                    </div>

                </div>

                <span class="toggle-right">
                    <span class="toggle-arrow">⌃</span>
                </span>

            </button>

            <div class="analysis-section-body">

                <div class="feedback-list">
                    ${generateFeedback(analysis)}
                </div>

            </div>

        </div>

    `;

    setupAnalysisToggles();
}

function setupAnalysisToggles() {

    const buttons = document.querySelectorAll(
        ".analysis-section-toggle"
    );

    buttons.forEach(button => {

        button.addEventListener("click", function () {

            const section = this.closest(".analysis-section");

            if (!section) return;

            const isOpen = section.classList.contains("open");

            section.classList.toggle("open");

            this.setAttribute(
                "aria-expanded",
                !isOpen
            );

            const arrow = this.querySelector(".toggle-arrow");

            if (arrow) {
                arrow.textContent = !isOpen ? "⌃" : "⌄";
            }

        });

    });

}
/* =========================================================
   WRITE PAGE
========================================================= */

function setupWritePage() {

    const textArea =
        document.getElementById("essayText");

    const titleInput =
        document.getElementById("essayTitle");

    if (!textArea) return;

    function updateStats() {

        const text = textArea.value;

        const words =
            getWords(text).length;

        const characters =
            text.length;

        const sentences =
            getSentences(text).length;

        const wordElement =
            document.getElementById("liveWords");

        const characterElement =
            document.getElementById("liveCharacters");

        const sentenceElement =
            document.getElementById("liveSentences");

        if (wordElement)
            wordElement.textContent = words;

        if (characterElement)
            characterElement.textContent = characters;

        if (sentenceElement)
            sentenceElement.textContent = sentences;

    }

    textArea.addEventListener(
        "input",
        updateStats
    );

    updateStats();

    const analyzeButton =
        document.getElementById("analyzeEssay");

    if (analyzeButton) {

        analyzeButton.addEventListener(
            "click",
            function () {

                const text =
                    textArea.value.trim();

                const title =
                    titleInput
                        ? titleInput.value.trim()
                        : "";

                if (!text) {

                    alert(
                        "Please write your essay before analyzing it."
                    );

                    return;
                }

                saveEssay(
                    title,
                    text
                );

                window.location.href =
                    "analyze.php";

            }
        );

    }

}

/* =========================================================
   VOCABULARY PAGE
========================================================= */

function loadVocabularyPage() {

    const repeatedContainer =
        document.getElementById("repeatedWords");

    if (!repeatedContainer) return;

    const essay =
        getCurrentEssay();

    if (!essay) return;

    const analysis =
        analyzeText(essay.text);

    const uniqueElement =
        document.getElementById("vocabUnique");

    const repeatedElement =
        document.getElementById("vocabRepeated");

    const advancedElement =
        document.getElementById("vocabAdvanced");

    const rangeElement =
        document.getElementById("vocabRange");

    if (uniqueElement)
        uniqueElement.textContent =
            analysis.uniqueWords;

    if (repeatedElement)
        repeatedElement.textContent =
            analysis.repeated.length;

    if (advancedElement)
        advancedElement.textContent =
            analysis.advancedCount;

    if (rangeElement)
        rangeElement.textContent =
            analysis.vocabularyRange + "%";

    repeatedContainer.innerHTML =
        analysis.repeated.length
            ? analysis.repeated
                .map(createRepeatedWordCard)
                .join("")
            : `
                <div class="success-message">
                    No heavily repeated words detected.
                </div>
            `;

    const levelContainer =
        document.getElementById("vocabularyLevels");

    if (levelContainer) {

        levelContainer.innerHTML = `

            <div class="vocab-level-box">

                <strong>
                    ${analysis.simpleCount}
                </strong>

                <span>
                    Simple vocabulary
                </span>

            </div>

            <div class="vocab-level-box">

                <strong>
                    ${analysis.advancedCount}
                </strong>

                <span>
                    Advanced vocabulary
                </span>

            </div>

        `;

    }

    const suggestionContainer =
        document.getElementById(
            "vocabularySuggestions"
        );

    if (suggestionContainer) {

        suggestionContainer.innerHTML =
            analysis.simpleLocations.length
                ? analysis.simpleLocations
                    .map(createSimpleWordCard)
                    .join("")
                : `
                    <div class="success-message">
                        No simple vocabulary suggestions available.
                    </div>
                `;

    }

}

/* =========================================================
   GRAMMAR PAGE
========================================================= */

function loadGrammarPage() {

    const container =
        document.getElementById("grammarIssues");

    if (!container) return;

    const essay =
        getCurrentEssay();

    if (!essay) return;

    const analysis =
        analyzeText(essay.text);

    const errorElement =
        document.getElementById("grammarErrors");

    const complexElement =
        document.getElementById("grammarComplex");

    const compoundElement =
        document.getElementById("grammarCompound");

    const simpleElement =
        document.getElementById("grammarSimple");

    if (errorElement)
        errorElement.textContent =
            analysis.grammarCount;

    if (complexElement)
        complexElement.textContent =
            analysis.complexSentences;

    if (compoundElement)
        compoundElement.textContent =
            analysis.compoundSentences;

    if (simpleElement)
        simpleElement.textContent =
            analysis.simpleSentences;

    container.innerHTML =
        analysis.grammarIssues.length
            ? analysis.grammarIssues
                .map(createGrammarCard)
                .join("")
            : `
                <div class="success-message">
                    No obvious grammar problems detected.
                </div>
            `;

    const structureContainer =
        document.getElementById(
            "sentenceStructures"
        );

    if (structureContainer) {

        structureContainer.innerHTML = `

            <div class="structure-group">

                <h4>
                    Complex Sentences
                </h4>

                ${
                    analysis.structure.complex.length
                        ? analysis.structure.complex
                            .map(createComplexSentenceCard)
                            .join("")
                        : "<p>No complex sentences detected.</p>"
                }

            </div>

            <div class="structure-group">

                <h4>
                    Compound Sentences
                </h4>

                ${
                    analysis.structure.compound.length
                        ? analysis.structure.compound.map(item => `
                            <div class="detail-card">
                                <span class="issue-label blue">
                                    Sentence ${item.sentenceNumber}
                                </span>
                                <p>
                                    ${escapeHTML(item.sentence)}
                                </p>
                            </div>
                        `).join("")
                        : "<p>No compound sentences detected.</p>"
                }

            </div>

        `;

    }

}

/* =========================================================
   DASHBOARD
========================================================= */

function loadDashboard() {

    const essays =
        getEssays();

    const essayElement =
        document.getElementById(
            "dashboardEssays"
        );

    const wordsElement =
        document.getElementById(
            "dashboardWords"
        );

    const averageElement =
        document.getElementById(
            "dashboardAverage"
        );

    const lastElement =
        document.getElementById(
            "dashboardLast"
        );

    if (essayElement)
        essayElement.textContent =
            essays.length;

    const totalWords =
        essays.reduce(
            (total, essay) =>
                total +
                getWords(essay.text || "").length,
            0
        );

    if (wordsElement)
        wordsElement.textContent =
            totalWords;

    if (averageElement) {

        const average =
            essays.length
                ? Math.round(
                    totalWords / essays.length
                )
                : 0;

        averageElement.textContent =
            average;

    }

    if (lastElement) {

        lastElement.textContent =
            essays.length
                ? new Date(
                    essays[0].date
                ).toLocaleDateString()
                : "-";

    }

    const list =
        document.getElementById(
            "dashboardEssaysList"
        );

    if (!list) return;

    list.innerHTML =
        essays.length
            ? essays.slice(0, 5).map(essay => `
                <div class="recent-essay">

                    <div>

                        <strong>
                            ${escapeHTML(essay.title)}
                        </strong>

                        <span>
                            ${getWords(essay.text).length} words
                        </span>

                    </div>

                    <a href="analyze.php"
                       onclick='openEssay(${essay.id})'>
                        Analyze
                    </a>

                </div>
            `).join("")
            : `
                <div class="empty-state">
                    No essays yet.
                </div>
            `;

}

/* =========================================================
   OPEN ESSAY
========================================================= */

function openEssay(id) {

    const essays =
        getEssays();

    const essay =
        essays.find(item =>
            Number(item.id) === Number(id)
        );

    if (!essay) return;

    localStorage.setItem(
        "mkweblab_current_essay",
        JSON.stringify(essay)
    );

}

/* =========================================================
   HISTORY
========================================================= */

function loadHistory() {

    const container =
        document.getElementById(
            "historyList"
        );

    if (!container) return;

    const essays =
        getEssays();

    container.innerHTML =
        essays.length
            ? essays.map(essay => `
                <div class="history-item">

                    <div>

                        <h4>
                            ${escapeHTML(essay.title)}
                        </h4>

                        <p>
                            ${getWords(essay.text).length} words
                            ·
                            ${new Date(
                                essay.date
                            ).toLocaleDateString()}
                        </p>

                    </div>

                    <div class="history-actions">

                        <button
                            onclick="openEssay(${essay.id}); window.location.href='analyze.php';">
                            View
                        </button>

                        <button
                            onclick="deleteEssay(${essay.id})">
                            Delete
                        </button>

                    </div>

                </div>
            `).join("")
            : `
                <div class="empty-state">
                    No essay history yet.
                </div>
            `;

}

function deleteEssay(id) {

    if (!confirm(
        "Delete this essay?"
    )) return;

    const essays =
        getEssays().filter(
            essay =>
                Number(essay.id) !== Number(id)
        );

    saveEssays(essays);

    const current =
        getCurrentEssay();

    if (
        current &&
        Number(current.id) === Number(id)
    ) {

        localStorage.removeItem(
            "mkweblab_current_essay"
        );

    }

    loadHistory();

}

/* =========================================================
   REPORTS
========================================================= */

function loadReports() {

    const essays =
        getEssays();

    const essayElement =
        document.getElementById(
            "reportEssays"
        );

    const wordsElement =
        document.getElementById(
            "reportWords"
        );

    const averageElement =
        document.getElementById(
            "reportAverage"
        );

    const complexityElement =
        document.getElementById(
            "reportComplexity"
        );

    const totalWords =
        essays.reduce(
            (total, essay) =>
                total +
                getWords(essay.text || "").length,
            0
        );

    const average =
        essays.length
            ? Math.round(
                totalWords / essays.length
            )
            : 0;

    if (essayElement)
        essayElement.textContent =
            essays.length;

    if (wordsElement)
        wordsElement.textContent =
            totalWords;

    if (averageElement)
        averageElement.textContent =
            average;

    if (complexityElement) {

        const values =
            essays.map(essay => {

                const analysis =
                    analyzeText(
                        essay.text || ""
                    );

                return analysis.complexity;

            });

        const avg =
            values.length
                ? Math.round(
                    values.reduce(
                        (a, b) => a + b,
                        0
                    ) / values.length
                )
                : 0;

        complexityElement.textContent =
            avg + "%";

    }

    generateReportFeedback();

}

function generateReportFeedback() {

    const container =
        document.getElementById(
            "reportFeedback"
        );

    if (!container) return;

    const essay =
        getCurrentEssay();

    if (!essay) {

        container.innerHTML = `
            <div class="info-message">
                Write an essay to receive feedback.
            </div>
        `;

        return;
    }

    const analysis =
        analyzeText(essay.text);

    const feedback =
        generateFeedback(analysis);

    container.innerHTML =
        feedback.map(item => `
            <div class="feedback-card ${item.type}">

                <div>

                    <strong>
                        ${escapeHTML(item.title)}
                    </strong>

                    <p>
                        ${escapeHTML(item.text)}
                    </p>

                </div>

            </div>
        `).join("");

}

/* =========================================================
   SETTINGS
========================================================= */

function applyTheme() {

    const settings =
        getSettings();

    if (settings.theme === "dark") {

        document.body.classList.add(
            "dark"
        );

    } else {

        document.body.classList.remove(
            "dark"
        );

    }

}

function setupSettings() {

    const themeSelect =
        document.getElementById(
            "themeSelect"
        );

    if (!themeSelect) return;

    const settings =
        getSettings();

    themeSelect.value =
        settings.theme || "light";

    themeSelect.addEventListener(
        "change",
        function () {

            settings.theme =
                themeSelect.value;

            localStorage.setItem(
                SETTINGS_KEY,
                JSON.stringify(settings)
            );

            applyTheme();

        }
    );

    const exportButton =
        document.getElementById(
            "exportData"
        );

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            function () {

                const data =
                    JSON.stringify(
                        getEssays(),
                        null,
                        2
                    );

                const blob =
                    new Blob(
                        [data],
                        {
                            type:
                                "application/json"
                        }
                    );

                const url =
                    URL.createObjectURL(blob);

                const a =
                    document.createElement(
                        "a"
                    );

                a.href = url;

                a.download =
                    "ielts-writing-data.json";

                a.click();

                URL.revokeObjectURL(url);

            }
        );

    }

    const deleteButton =
        document.getElementById(
            "deleteData"
        );

    if (deleteButton) {

        deleteButton.addEventListener(
            "click",
            function () {

                if (!confirm(
                    "Delete all essay data?"
                )) return;

                localStorage.removeItem(
                    STORAGE_KEY
                );

                localStorage.removeItem(
                    "mkweblab_current_essay"
                );

                alert(
                    "All essay data has been deleted."
                );

                location.reload();

            }
        );

    }

}

function setupHistoryClear() {

    const button =
        document.getElementById(
            "clearHistory"
        );

    if (!button) return;

    button.addEventListener(
        "click",
        function () {

            if (!confirm(
                "Clear all essay history?"
            )) return;

            localStorage.removeItem(
                STORAGE_KEY
            );

            localStorage.removeItem(
                "mkweblab_current_essay"
            );

            loadHistory();

        }
    );

}

/* =========================================================
   START
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        applyTheme();

        setupWritePage();

        loadAnalysisPage();

        loadVocabularyPage();

        loadGrammarPage();

        loadDashboard();

        loadHistory();

        loadReports();

        setupSettings();

        setupHistoryClear();

    }
);