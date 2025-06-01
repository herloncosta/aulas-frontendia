document.addEventListener("DOMContentLoaded", () => {
  const keys = document.querySelectorAll(".key");
  const audioFiles = {};

  const noteToFile = {
    C4: "C4.mp3",
    Db4: "Db4.mp3", // C#4
    D4: "D4.mp3",
    Eb4: "Eb4.mp3", // D#4
    E4: "E4.mp3",
    F4: "F4.mp3",
    Gb4: "Gb4.mp3", // F#4
    G4: "G4.mp3",
    Ab4: "Ab4.mp3", // G#4
    A4: "A4.mp3",
    Bb4: "Bb4.mp3", // A#4
    B4: "B4.mp3",
  };

  for (const note in noteToFile) {
    const audio = new Audio();
    audio.src = `assets/sounds/${noteToFile[note]}`;
    audioFiles[note] = audio;
  }

  for (const key of keys) {
    key.addEventListener("click", () => playNote(key));
  }

  function playNote(key) {
    const note = key.getAttribute("data-note");
    if (note && audioFiles[note]) {
      const audio = audioFiles[note];
      audio.currentTime = 0;
      audio
        .play()
        .catch((error) => console.error("Erro ao tocar o som:", error));

      key.classList.add("active");
      setTimeout(() => {
        key.classList.remove("active");
      }, 150);
    } else {
      console.warn(
        `Arquivo de áudio para a nota ${note} não encontrado ou não mapeado.`
      );
    }
  }

  document.addEventListener("keydown", (event) => {
    const note = getNoteFromKey(event.key);
    if (note) {
      const keyElement = document.querySelector(`.key[data-note="${note}"]`);
      if (keyElement) {
        playNote(keyElement);
      }
    }
  });

  function getNoteFromKey(key) {
    switch (key.toLowerCase()) {
      case "a":
        return "C4";
      case "w":
        return "Db4";
      case "s":
        return "D4";
      case "e":
        return "Eb4";
      case "d":
        return "E4";
      case "f":
        return "F4";
      case "t":
        return "Gb4";
      case "g":
        return "G4";
      case "y":
        return "Ab4";
      case "h":
        return "A4";
      case "u":
        return "Bb4";
      case "j":
        return "B4";
      default:
        return null;
    }
  }
});
