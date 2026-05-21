function startGame() {
    const answer = Math.floor(Math.random() * 100) + 1;

    let attempts = 0;
    let usedNumbers = [];

    while (attempts < 7) {
        let input = prompt("Đoán số (1-100):");

        let guess = Number(input);

        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Vui lòng nhập số từ 1-100");
            continue;
        }

        if (usedNumbers.includes(guess)) {
            alert("Bạn đã đoán số này rồi!");
            continue;
        }

        usedNumbers.push(guess);
        attempts++;

        if (guess === answer) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần`);
            return;
        }

        if (guess < answer) {
            alert("Cao hơn!");
        } else {
            alert("Thấp hơn!");
        }
    }

    alert(`Bạn thua! Đáp án là ${answer}`);
}