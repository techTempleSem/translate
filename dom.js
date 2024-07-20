function trans(){
    let value = document.getElementById("input").value;
    console.log(main(value))
    document.getElementById("answer").innerHTML = main(value)
}

document.getElementById('convert').addEventListener('click', function() {
    trans();
});