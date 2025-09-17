class QuizApp {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.userAnswers = new Array(questions.length).fill(null);
        this.initializeApp();
    }

    initializeApp() {
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.questionCounter = document.getElementById('question-counter');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.submitBtn = document.getElementById('submit-btn');
        this.resultDiv = document.getElementById('result');

        this.setupEventListeners();
        this.showQuestion(this.currentQuestion);
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.navigateToQuestion(this.currentQuestion - 1);
        });

        this.nextBtn.addEventListener('click', () => {
            this.navigateToQuestion(this.currentQuestion + 1);
        });

        this.submitBtn.addEventListener('click', () => {
            this.calculateScore();
        });
    }

    showQuestion(index) {
        if (index < 0 || index >= questions.length) return;

        this.currentQuestion = index;
        const question = questions[index];

        // Cập nhật số câu hỏi
        this.questionCounter.textContent = `Câu ${index + 1}/${questions.length}`;

        // Hiển thị câu hỏi
        this.questionText.textContent = question.question;

        // Hiển thị các lựa chọn
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, optionIndex) => {
            const button = document.createElement('button');
            button.className = 'option-btn';
            if (this.userAnswers[index] === optionIndex) {
                button.classList.add('selected');
            }
            button.textContent = option;
            button.addEventListener('click', () => {
                this.selectAnswer(optionIndex);
            });
            this.optionsContainer.appendChild(button);
        });

        // Cập nhật trạng thái nút điều hướng
        this.prevBtn.disabled = index === 0;
        this.nextBtn.disabled = index === questions.length - 1;
    }

    selectAnswer(optionIndex) {
        // Xóa selected class từ tất cả các option
        const options = this.optionsContainer.querySelectorAll('.option-btn');
        options.forEach(opt => opt.classList.remove('selected'));

        // Thêm selected class vào option được chọn
        options[optionIndex].classList.add('selected');

        // Lưu câu trả lời của người dùng
        this.userAnswers[this.currentQuestion] = optionIndex;
    }

    navigateToQuestion(index) {
        if (index >= 0 && index < questions.length) {
            this.showQuestion(index);
        }
    }

    calculateScore() {
        this.score = 0;
        questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.answer) {
                this.score++;
            }
        });

        const percentage = ((this.score / questions.length) * 100).toFixed(1);
        
        this.resultDiv.innerHTML = `
            <h3>Kết quả bài làm</h3>
            <p>Số câu đúng: <strong>${this.score}/${questions.length}</strong></p>
            <p>Tỉ lệ đúng: <strong>${percentage}%</strong></p>
            <p>Điểm số: <strong>${this.score}</strong></p>
        `;

        // Hiển thị đáp án đúng cho từng câu
        let reviewHtml = '<div style="margin-top: 20px;"><h4>Xem lại đáp án:</h4>';
        questions.forEach((question, index) => {
            const userAnswer = this.userAnswers[index];
            const isCorrect = userAnswer === question.answer;
            
            reviewHtml += `
                <div style="margin: 10px 0; padding: 10px; border-left: 4px solid ${isCorrect ? '#27ae60' : '#e74c3c'};">
                    <p><strong>Câu ${index + 1}:</strong> ${question.question}</p>
                    <p>Đáp án của bạn: ${userAnswer !== null ? question.options[userAnswer] : 'Chưa trả lời'}</p>
                    <p>Đáp án đúng: ${question.options[question.answer]}</p>
                    <p style="color: ${isCorrect ? '#27ae60' : '#e74c3c'};">
                        ${isCorrect ? '✅ Đúng' : '❌ Sai'}
                    </p>
                </div>
            `;
        });
        reviewHtml += '</div>';
        
        this.resultDiv.innerHTML += reviewHtml;
    }
}

// Khởi tạo ứng dụng khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});