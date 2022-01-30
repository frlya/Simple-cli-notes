import yargs from "yargs";
import chalk from "chalk";
import { hideBin } from 'yargs/helpers';
import DataAccessObject from "./utils.js";

const dao = new DataAccessObject("storedNotes.txt");

const title = {
    describe: "Note title",
    demandOption: true,
    type: "string"
}

const body =  {
    describe: "Note body",
    demandOption: true,
    type: "string"
}

yargs(hideBin(process.argv))
.command( "add", "Add a new note", { title, body },
    ({title, body}) => dao.addNote(title, body)  
)
.command( "remove", "Removes a specified note", { title },
    ({title}) => dao.deleteNote(title)
)
.command( "read", "Display a specified note", { title },
    ({title}) => dao.displayNote(title)
)
.command( "list", "Display all notes", {},
    () => dao.displayAll()
)
.parse();