function switchScreens () {
    const button = document.getElementById("start-button")
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block"
    document.querySelector("body").style.background = "rgb(238,174,202) radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)";
}

