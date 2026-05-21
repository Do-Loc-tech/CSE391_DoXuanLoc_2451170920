const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

function getGrade(avg) {
    if (avg >= 8) return "Giỏi";
    if (avg >= 6.5) return "Khá";
    if (avg >= 5) return "Trung bình";
    return "Yếu";
}

let sumMath = 0, sumPhysics = 0, sumCs = 0;

let count = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };

let best = null;
let worst = null;

console.log("| STT | Tên | TB | Xếp loại |");

students.forEach((s, i) => {
    let avg = s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3;

    let grade = getGrade(avg);

    console.log(`| ${i + 1} | ${s.name} | ${avg.toFixed(2)} | ${grade} |`);

    count[grade]++;

    sumMath += s.math;
    sumPhysics += s.physics;
    sumCs += s.cs;

    if (!best || avg > best.avg) best = { ...s, avg };
    if (!worst || avg < worst.avg) worst = { ...s, avg };
});

console.log("\n--- Thống kê ---");
console.log("Giỏi:", count["Giỏi"]);
console.log("Khá:", count["Khá"]);
console.log("Trung bình:", count["Trung bình"]);
console.log("Yếu:", count["Yếu"]);

console.log("\nBest:", best.name, best.avg.toFixed(2));
console.log("Worst:", worst.name, worst.avg.toFixed(2));

console.log("\nTB môn:");
console.log("Math:", (sumMath / students.length).toFixed(2));
console.log("Physics:", (sumPhysics / students.length).toFixed(2));
console.log("CS:", (sumCs / students.length).toFixed(2));