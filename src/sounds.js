function toggleVolume(volumeIcon) {
    const volumeOn = document.getElementById('volume-on');
    const volumeOff = document.getElementById('volume-off');

    // Update icon
    if (volumeIcon === 'on') {
        volumeOn.classList.remove("visible");
        volumeOn.classList.add("not-visible");
        volumeOff.classList.remove("not-visible");
        volumeOff.classList.add("visible");
    } else if (volumeIcon === 'off') {
        volumeOff.classList.remove("visible");
        volumeOff.classList.add("not-visible");
        volumeOn.classList.remove("not-visible");
        volumeOn.classList.add("visible");
    }

    // Toggle sound
    const audio = document.getElementById("music");
    audio.paused ? audio.play() : audio.pause();
}