/* INSTRUKCIJOS:
Papildykite projektą:
- Šiame projekte atliktas tik pradinis stiliavimas, tačiau galima padaryti ir daugiau dalykų. Pagalvokite ar galima kaip nors atnaujinti dizainą, jo nesudarkant. Pavyzdžiui, gal gali įvesties laukeliai reaguoti į pelės užvedimą, ar patvarkyti gal kokius tarpus, gal įnešti kokių spalvų įvairiose vietose, dar gal ką nors padaryti su įvesties laukeliais, mygtukų stiliai, ir pan.
- Iki galo padaryti validacijas su įvesties laukeliais (dabar yra atlikta tik su vienu).
- Pridėti daugiau įvesties laukelių ir/ar skaičiavimų iš duotos informacijos.
- Pridėti informacinių tekstų, kurie paaiškintų ką kuris laukelis ar skaičiavimas reiškia ir pan.
*/

document.getElementById("calculate").addEventListener("click", function () {
    const employeeCount = document.getElementById("employee-count").valueAsNumber;
    const hoursPerDay = document.getElementById("hours-per-day").valueAsNumber;
    const loavesPerEmployee = document.getElementById("loaves-per-employee").valueAsNumber;
    const orderCount = document.getElementById("order-count").valueAsNumber;

    const totalLoaves = Math.floor(employeeCount * loavesPerEmployee * hoursPerDay);
    const targetReached = totalLoaves >= orderCount;
    const missing = orderCount - totalLoaves;

    const results = document.getElementById("results");
    results.innerHTML = `<p><strong>Kepykla per dieną spės pagaminti:</strong> ${totalLoaves} kepalų</p>`;
    results.innerHTML += `<p><strong>Reikia pagaminti:</strong> ${orderCount} kepalų</p>`;
    results.innerHTML += `<p><strong>Ar spės pagaminti?</strong> ${targetReached ? "Taip." : `Ne. Trūks ${missing} kepalų.`}</p>`;
});

document.getElementById("reset").addEventListener("click", function () {
    document.querySelectorAll("input").forEach(function (element) {
        element.value = element.defaultValue;
        element.dispatchEvent(new Event("input"));
    });

    document.getElementById("results").innerHTML = "<p>Kol kas nieko nėra.</p>";
});

function validateInput(element) {
    const value = element.valueAsNumber;
    if (isNaN(value)) {
        return false;
    }

    const min = parseInt(element.min);
    const max = parseInt(element.max);
    return !((!isNaN(min) && value < min) || (!isNaN(max) && value > max));
}

document.querySelectorAll("input").forEach(function (element) {
    element.addEventListener("input", function (event) {
        if (!validateInput(event.target)) {
            event.target.classList.add("error");
            event.target.nextElementSibling.classList.add("show");
        }
        else {
            event.target.classList.remove("error");
            event.target.nextElementSibling.classList.remove("show");
        }

        const allValid = Array.from(document.querySelectorAll("input")).every(element => validateInput(element));
        document.getElementById("calculate").disabled = !allValid;
    });

    element.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("calculate").click();
        }
    });
});
