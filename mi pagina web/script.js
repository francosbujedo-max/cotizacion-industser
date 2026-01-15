// Fecha editable (por defecto hoy)
const fechaInput = document.getElementById("fecha");
const hoy = new Date().toISOString().split("T")[0];
fechaInput.value = hoy;

function agregarItem() {
    const contenedor = document.getElementById("items");

    const fila = document.createElement("div");
    fila.className = "fila";
    fila.innerHTML = `
        <input type="number" placeholder="1">
        <input placeholder="Producto">
        <input placeholder="Descripción">
        <input type="number" placeholder="0" oninput="calcular()">
    `;

    contenedor.appendChild(fila);
}

function calcular() {
    let subtotal = 0;
    document.querySelectorAll("#items input[type='number']:last-child").forEach(i => {
        subtotal += Number(i.value) || 0;
    });

    let iva = subtotal * 0.21;
    let total = subtotal + iva;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("iva").innerText = iva.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const ocultar = document.querySelectorAll(".no-pdf");
    ocultar.forEach(e => e.style.display = "none");

    html2canvas(document.getElementById("contenido-pdf"), {
        scale: 4.5,
        windowWidth: 1600
    }).then(canvas => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;

        pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Cotizacion_INDUSTSER.pdf");

        ocultar.forEach(e => e.style.display = "block");
    });
}
