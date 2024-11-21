let audio = new Audio();
let isPlaying = false; // État de lecture
let currentSong = null;

function playSong(song) {
    // Données des chansons
    const songs = {
        song1: {
            title: "Triple K",
            src: "kkk.mp3",
            cover: "kkk.jpg",
            description: "Une masterclass pour un premier morceaux.",
            beatmaker: "ERV"
        },
        song2: {
            title: "Échos de Vie",
            src: "edv.mp3",
            cover: "edv.jpg",
            description: "Mon premier featuring.",
            beatmaker: "Mr Bangers"
        },
        song3: {
            title: "Bounce",
            src: "bounce.mp3",
            cover: "bounce.jpg",
            description: "Attention la Fève.",
            beatmaker: "ERV"
        },
        song4: {
            title: "Je m'applle Matthis",
            src: "jmm.mp3",
            cover: "jmm.jpg",
            description: "Ptit troll pour Matthis.",
            beatmaker: "ERV"
        },
        song5: {
            title: "OK",
            src: "ok.mp3",
            cover: "ok.jpg",
            description: "S/O Jean Marie Bigard.",
            beatmaker: "Valhak Beats"
        }
    };

    const songDetails = songs[song];

    // Mettre à jour les détails de la chanson
    document.getElementById('title').innerText = "Titre : " + songDetails.title;
    document.getElementById('description').innerText = "Description : " + songDetails.description;
    document.getElementById('beatmaker').innerText = "Beatmaker : " + songDetails.beatmaker;
    document.getElementById('cover').src = songDetails.cover;

    // Ajouter le lien de téléchargement
    const downloadLink = document.getElementById('download');
    downloadLink.href = songDetails.src;

    // Charger et jouer la musique
    loadSong(songDetails.src, songDetails.title, songDetails.cover);
}

function loadSong(src, title, cover) {
    // Si une chanson est déjà en cours de lecture, l'arrêter avant de charger la nouvelle
    if (audio) {
        audio.pause();
    }

    audio = new Audio(src); // Créer un nouveau lecteur audio avec le fichier de musique
    audio.load();

    // Mettre à jour le titre de la chanson en bas
    document.getElementById('now-playing-title').innerText = title;

    // Mettre à jour la pochette en bas à gauche
    document.getElementById('now-playing-cover').src = cover;

    // Afficher la durée initiale
    audio.onloadedmetadata = function() {
        document.getElementById('duration').innerText = formatTime(audio.duration);
        document.getElementById('progress-bar').value = 0;
    };

    // Mettre à jour la barre de progression pendant la lecture
    audio.ontimeupdate = function() {
        document.getElementById('progress-bar').value = (audio.currentTime / audio.duration) * 100;
        document.getElementById('current-time').innerText = formatTime(audio.currentTime);
    };

    // Démarrer la lecture si on clique sur "Play"
    togglePlayPause();
}

function togglePlayPause() {
    // Vérifier l'état de la lecture (play ou pause)
    if (isPlaying) {
        audio.pause(); // Si la musique est en lecture, on la met en pause
        document.getElementById('play-pause-btn').innerText = "▶"; // Changer l'icône du bouton
    } else {
        audio.play(); // Si la musique est en pause, on la reprend
        document.getElementById('play-pause-btn').innerText = "❚❚"; // Changer l'icône du bouton
    }

    isPlaying = !isPlaying; // Inverser l'état de lecture
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function seekAudio(event) {
    const progressBar = document.getElementById('progress-bar');
    const offsetX = event.offsetX;
    const totalWidth = progressBar.offsetWidth;
    const newTime = (offsetX / totalWidth) * audio.duration;
    audio.currentTime = newTime;
}
