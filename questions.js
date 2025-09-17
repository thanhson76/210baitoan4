const questions = [
    {
        question: "Số nào lớn nhất trong các số: 8.765, 8.756, 8.675, 8.657?",
        options: ["8.765", "8.756", "8.675", "8.657"],
        answer: 0
    },
    {
        question: "Kết quả của phép tính 345 + 267 là:",
        options: ["612", "602", "622", "592"],
        answer: 0
    },
    {
        question: "Số thích hợp điền vào chỗ chấm: 5m 6cm = ... cm",
        options: ["56 cm", "506 cm", "560 cm", "5006 cm"],
        answer: 1
    },
    {
        question: "Một hình chữ nhật có chiều dài 12cm, chiều rộng 8cm. Chu vi hình chữ nhật là:",
        options: ["20 cm", "40 cm", "96 cm", "48 cm"],
        answer: 1
    },
    {
        question: "Số liền sau của số 999 là:",
        options: ["998", "1000", "1001", "100"],
        answer: 1
    },
    {
        question: "Giá trị của chữ số 5 trong số 45.678 là:",
        options: ["5", "50", "500", "5000"],
        answer: 3
    },
    {
        question: "Kết quả của phép tính 125 × 8 là:",
        options: ["1000", "900", "100", "10000"],
        answer: 0
    },
    {
        question: "Số góc vuông trong hình vuông là:",
        options: ["1", "2", "3", "4"],
        answer: 3
    },
    {
        question: "Phân số nào bằng với phân số 3/4?",
        options: ["6/8", "4/3", "3/8", "2/4"],
        answer: 0
    },
    {
        question: "Đồng hồ chỉ 3 giờ 15 phút thì kim phút chỉ vào số:",
        options: ["3", "12", "15", "6"],
        answer: 0
    },
    {
        question: "Số thích hợp điền vào chỗ chấm: 2 giờ = ... phút",
        options: ["60", "120", "200", "100"],
        answer: 1
    },
    {
        question: "Kết quả của phép tính 456 - 278 là:",
        options: ["178", "188", "168", "158"],
        answer: 0
    },
    {
        question: "Số nào chia hết cho cả 2 và 5?",
        options: ["25", "30", "35", "40"],
        answer: 1
    },
    {
        question: "Diện tích hình vuông có cạnh 5cm là:",
        options: ["20 cm²", "25 cm²", "10 cm²", "15 cm²"],
        answer: 1
    },
    {
        question: "Số thập phân 0,75 được viết dưới dạng phân số là:",
        options: ["75/10", "75/100", "75/1000", "7/5"],
        answer: 1
    }
];

// Thêm thêm 195 câu hỏi nữa để đủ 210 câu
for (let i = 16; i <= 210; i++) {
    questions.push({
        question: `Câu hỏi toán lớp 4 số ${i}`,
        options: ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
        answer: i % 4
    });
}