const { ThermalPrinter, PrinterTypes, CharacterSet, BreakLine } = require('node-thermal-printer');
const m_printer = require('printer')

const express = require('express');
const app = express();
const cors = require('cors');
var T2W = require('numbers2words');

var translator = new T2W("ES_ES");
const default_printer = m_printer.getDefaultPrinterName();

let printer = new ThermalPrinter({
    type: PrinterTypes.EPSON,                                  // Printer type: 'star' or 'epson'
    interface: `printer:${default_printer}`,      // Printer interface
    characterSet: CharacterSet.PC852_LATIN2,                  // Printer character set
    removeSpecialCharacters: false,                           // Removes special characters - default: false
    lineCharacter: "=",                                       // Set character for lines - default: "-"
    breakLine: BreakLine.WORD,
    driver: require('printer'),                          // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
    options: {                                                 // Additional options
        timeout: 5000                                           // Connection timeout (ms) [applicable only for network printers] - default: 3000
    }
});

function printLines() {
    let paperWidth = printer.getWidth();
    let lines = "";
    for (let i = 1; i <= paperWidth; i++) {
        lines += '-';
    }
    return lines;
}

const corsOptions = {
    origin: '*',
    methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', async (req, res) => {
    console.log('imprimiendo requiest');
    console.log(req);
    let body = req.body;
    if (typeof (body) === "string") {
        body = JSON.parse(body);
    }

    printer.println(" ")
    printer.println(" ")
    printer.alignCenter();
    printer.bold(true)
    printer.println("TOTAL MEDIC");
    printer.bold(false)
    printer.println("ANTISUYO 1385 - LA VICTORIA - CHICLAYO")
    printer.println("R.U.C. 20605502823");
    printer.println(printLines());
    printer.println(printLines()); //----------------------------------
    printer.println(`TICKET DE ATENCIÓN`);
    printer.println(printLines()); //----------------------------------
    printer.setTextNormal();
    printer.alignLeft();
    printer.println(`FECHA EMISION: ${body.created_at}`);

    printer.println(`DNI:            ${body.dni}`);
    printer.println(`NOMBRES:        ${body.person}`);
    printer.println(`ESPECIALIDAD:   ${body.specialty}`);
    printer.println(`MÉDICO:         ${body.doctor}`);
    printer.println(`HORA AGENDADA:  ${body.hour_of_service}`);

    printer.println(printLines()); //----------------------------------

    printer.println(`SON: S/ ${body.price}`);
    printer.println(`SON: ${formatNumber(body.price)}`);
    printer.alignLeft();
    printer.cut();
    await printer.execute();
    printer.clear();
    res.send('<h1>UNO SAN</h1>')

});

const formatNumber = (stringNumber) => {
    console.log(typeof(stringNumber));
    const numberParts = stringNumber.split('.');
    const greaterPart = translator.toWords(parseInt(numberParts[0]));
    const lowerPart = `con ${numberParts[1]}/100`;
    return `${greaterPart} SOLES ${lowerPart}`.toUpperCase(); 
}

app.post('/drugs/', async (req, res) => {
    try {
        console.log('imprimiendo medicamentos');
        console.log(req.body);
        let body = req.body;
        if (typeof (body) === "string") {
            body = JSON.parse(body);
        }
        printer.println(" ")
        printer.println(" ")
        printer.alignCenter();
        printer.bold(true)
        printer.println("TOTAL MEDIC");
        printer.bold(false)
        printer.println("ANTISUYO 1385 - LA VICTORIA - CHICLAYO")
        printer.println("R.U.C. 20605502823");
        printer.println(printLines());
        printer.println(printLines()); //----------------------------------
        printer.println(`TICKET DE VENTA`);
        printer.println(printLines()); //----------------------------------
        printer.setTextNormal();
        printer.alignLeft();
        printer.println(`FECHA EMISION: ${body.created_at}`);
        printer.println(`DNI:            ${body.customer.dni}`);
        printer.println(`NOMBRES:        ${body.customer.full_name}`);
        printer.setTextNormal();
        printer.println(printLines()); //----------------------------------
        printer.table(["Cant", 'Nombre', 'Precio'])

        body.details.forEach(function (el) {
            printer.table([el.quantity, el.product_name, el.total])
        })
        printer.println(printLines()); //----------------------------------
        printer.println(`TOTAL    : S/ ${body.total}`);
        printer.println(`SON: ${formatNumber(body.total)}`);
        printer.alignLeft();
        printer.cut();

        await printer.execute();
        printer.clear();
        res.json({ jeje: 'jeje' })
    } catch (error) {
        console.log(error);
    }
})


app.listen(3030, () => {
    console.log(`⚡️[bootup]: Server is running at port: 3030`);
});
