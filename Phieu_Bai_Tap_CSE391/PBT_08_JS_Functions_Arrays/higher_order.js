// 1. pipe()

function pipe(...fns) {

    return function(value) {

        return fns.reduce(
            (result, fn) => fn(result),
            value
        );
    };
}

const process = pipe(
    x => x * 2,
    x => x + 10,
    x => x.toString(),
    x => "Kết quả: " + x
);

console.log(process(5));

// ==============================

// 2. memoize()

function memoize(fn) {

    const cache = {};

    return function(...args) {

        const key = JSON.stringify(args);

        if (cache[key]) {
            console.log("Lấy từ cache...");
            return cache[key];
        }

        const result = fn(...args);

        cache[key] = result;

        return result;
    };
}

const expensiveCalc = memoize((n) => {

    console.log("Đang tính...");

    let result = 0;

    for (let i = 0; i < n; i++) {
        result += i;
    }

    return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

// ==============================

// 3. debounce()

function debounce(fn, delay) {

    let timer;

    return function(...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);

// Demo
search("ip");
search("iphone");
search("iphone 16");

// ==============================

// 4. retry()

async function retry(fn, maxAttempts = 3) {

    let attempt = 0;

    while (attempt < maxAttempts) {

        try {

            return await fn();

        } catch (error) {

            attempt++;

            console.log(
                `Lần ${attempt} thất bại`
            );

            if (attempt === maxAttempts) {
                throw error;
            }
        }
    }
}

// ===== TEST RETRY =====

let count = 0;

async function unstableTask() {

    count++;

    if (count < 3) {
        throw new Error("Server Error");
    }

    return "Thành công!";
}

retry(unstableTask)
    .then(console.log)
    .catch(console.error);