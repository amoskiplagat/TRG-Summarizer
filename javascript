document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('change', function() {
        if (themeToggle.checked) {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    });

    const summarizeBtn = document.getElementById('summarize-btn');
    const emailContent = document.getElementById('email-content');
    const summaryDiv = document.getElementById('summary');

    summarizeBtn.addEventListener('click', function() {
        const emailText = emailContent.value.trim();
        const summary = generateSummary(emailText);
        summaryDiv.innerText = summary;
        summaryDiv.style.display = 'block';
    });

    function generateSummary(text) {
        // Tokenize text into sentences
        const sentences = text.split(/[.!?]/).filter(Boolean);

        // Calculate sentence scores based on word frequency
        const wordFreq = {};
        sentences.forEach(sentence => {
            const words = sentence.toLowerCase().match(/\b\w+\b/g);
            words.forEach(word => {
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            });
        });

        const maxFreq = Math.max(...Object.values(wordFreq));
        const sentenceScores = {};
        sentences.forEach(sentence => {
            const words = sentence.toLowerCase().match(/\b\w+\b/g);
            let score = 0;
            words.forEach(word => {
                score += wordFreq[word] / maxFreq;
            });
            sentenceScores[sentence] = score;
        });

        // Sort sentences by score in descending order
        const sortedSentences = Object.keys(sentenceScores).sort((a, b) => sentenceScores[b] - sentenceScores[a]);

        // Select top sentences to form the summary
        const numSentences = Math.min(3, sortedSentences.length);
        const summarySentences = sortedSentences.slice(0, numSentences);

        // Construct the summary
        const summary = summarySentences.join('. ') + '.';
        return summary;
    }
});
