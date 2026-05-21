const images = [

    "https://placehold.co/600x400?text=1",
    "https://placehold.co/600x400?text=2",
    "https://placehold.co/600x400?text=3",
    "https://placehold.co/600x400?text=4",
    "https://placehold.co/600x400?text=5"
];

let currentIndex = 0;

const galleryImage =
    document.querySelector("#galleryImage");

const palette =
    document.querySelector("#palette");

const commandInput =
    document.querySelector("#commandInput");

const commandList =
    document.querySelector("#commandList");

galleryImage.src = images[currentIndex];

// ===== COMMANDS =====

const commands = [

    "Open Settings",
    "Toggle Dark Mode",
    "Refresh",
    "Logout"
];

function renderCommands(data) {

    commandList.innerHTML = "";

    data.forEach(command => {

        const li =
            document.createElement("li");

        li.textContent = command;

        commandList.appendChild(li);
    });
}

// ===== KEYBOARD =====

document.addEventListener("keydown", (e) => {

    // RIGHT

    if (e.key === "ArrowRight") {

        currentIndex++;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        galleryImage.src =
            images[currentIndex];
    }

    // LEFT

    if (e.key === "ArrowLeft") {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        galleryImage.src =
            images[currentIndex];
    }

    // NUMBER KEYS

    if (!isNaN(e.key)) {

        const number = Number(e.key);

        if (
            number > 0 &&
            number <= images.length
        ) {
            currentIndex = number - 1;

            galleryImage.src =
                images[currentIndex];
        }
    }

    // CTRL + K

    if (e.ctrlKey && e.key === "k") {

        e.preventDefault();

        palette.classList.remove("hidden");

        commandInput.focus();

        renderCommands(commands);
    }

    // ESC

    if (e.key === "Escape") {

        palette.classList.add("hidden");
    }
});

// ===== SEARCH COMMAND =====

commandInput.addEventListener("input", () => {

    const keyword =
        commandInput.value.toLowerCase();

    const filtered =
        commands.filter(command =>
            command.toLowerCase()
            .includes(keyword)
        );

    renderCommands(filtered);
});
