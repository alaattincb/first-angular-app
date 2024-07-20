export class Model {
    user;
    items;

    constructor(){
        this.user = "Alaattin";
        this.items = [
            new TodoItem("Spor",true),
            new TodoItem("Kahvaltı",false),
            new TodoItem("Kitap",false),
            new TodoItem("Ders",false),
            
        ];
    }
}

    export class TodoItem {
        description;
        action;

        constructor(description: string, action: boolean){
            this.description = description;
            this.action = action;
        }
    }

