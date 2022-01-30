import fs from 'fs';
import { compose, display, colorize} from './functPrompt.js'

export default class FileStorage {

    constructor(filename) {
        this.filename = "./" + filename;
    }

    getNotes() {
        try { return JSON.parse(fs.readFileSync(this.filename, 'utf-8')); }
        catch(e) {return {};}
    }

    saveNotes(data) {
        try { fs.writeFileSync(this.filename, JSON.stringify(data)); }
        catch(e) {console.log(e);}
    }

    modifyNotes(mutator){
        const check = (res) => {
            display(res ? 
                colorize.conf("Transaction succeded") : 
                colorize.error("No item to delete!")
            );
        };
        const transaction = compose(check, mutator);
        const modifyThenSave = compose(this.saveNotes.bind(this), (notes) => (transaction(notes), notes)); 
        modifyThenSave(this.getNotes());
    } 
    
    addNote(title, body) {
        this.modifyNotes(notes => notes[title] = body);
    }

    deleteNote(title) {        
        this.modifyNotes(notes => notes[title] ? delete notes[title] : false);
    }

    displayNote(title) {
        const body = this.getNotes()[title];
        const screen = body ? 
            [colorize.title(title), colorize.body(body)] :
            [colorize.error(title + " is not found")];
        display(...screen);
    }

    displayAll() {
        const data = this.getNotes();
        for(let title of Object.keys(data)) {
            this.displayNote(title);
            display('\n');
        }
    }

}