

function selectTheme() {
    const darkSelector = document.getElementById("dark-v10")
    const lightSelctor = document.getElementById("light-v10")
    console.log("hello")
    if (darkSelector.click()) {
        console.log("dark selected")
    } else if (lightSelctor.click()) {
        console.log("light selected ")
    }
}